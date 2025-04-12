"use client"

import { Dumbbell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, ResponsiveContainer, CartesianGrid, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import useAppointments from "../hooks/use-appointments"
import { useMemo } from "react"
import { Appointment } from "@/types/appwrite.types"
import { useDashboardContext } from "../context"
import { format } from "date-fns"
import { generateDateRange, groupByDate } from "../helpers"

export function SessionCard() {
  const { selectedDate } = useDashboardContext();
  const appointments = useAppointments({ status: "all", dateRange: selectedDate });

  const { count, data: sessionData } = useMemo(() => {
    if (appointments.isLoading || !appointments.data)
      return { count: 0, data: [] }

    const start = selectedDate.from;
    const end = selectedDate.to;

    const allDates = generateDateRange(start, end); // Generate all dates in range
    const groupedData = groupByDate(appointments?.data ?? [], (d) => d.date);

    const filledData = allDates.map((date) => {
      const formattedDate = format(new Date(date), 'MM/dd');
      const existing = groupedData.find(item => item.date === formattedDate);
      return existing || { date: formattedDate, count: 0 }; // Default to 0 if not found
    });

    return {
      count: appointments.data.length,
      data: filledData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    };
  }, [appointments, selectedDate])

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <span className="text-slate-800">Total Sessions</span>
          {/* <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-normal flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            12%
          </span> */}
        </CardTitle>
        <div className="rounded-full bg-orange-50 p-2 dark:bg-orange-900/20">
          <Dumbbell className="h-5 w-5 text-orange-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-6xl font-bold text-slate-900">{count.toLocaleString()}</div>
        <p className="text-xs text-slate-500 mt-1">Active appointment sessions</p>

        <div className="mt-6 h-32">
          <ChartContainer
            config={{
              completed: {
                label: "Sessions",
                color: "hsl(142, 76%, 36%)",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sessionData}
              // margin={{
              //   top: 5,
              //   right: 5,
              //   bottom: 5,
              //   left: 5,
              // }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <ChartTooltip
                  content={<ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        // year: "numeric",
                      })
                    }}
                  />}
                />
                <Bar
                  dataKey="count"
                  radius={[4, 4, 0, 0]}
                  fill="hsl(var(--primary))"
                  barSize={20}
                  fillOpacity={0.9}
                  name="completed"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
