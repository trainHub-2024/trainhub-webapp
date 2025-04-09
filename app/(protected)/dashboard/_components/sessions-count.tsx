"use client"

import { Dumbbell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import useAppointments from "../hooks/use-appointments"
import { useMemo } from "react"
import { Appointment } from "@/types/appwrite.types"
import { useDashboardContext } from "../context"
import { format } from "date-fns"

export function SessionCard() {
  const { selectedDate } = useDashboardContext();
  const appointments = useAppointments({ status: "completed", dateRange: selectedDate });

  const groupByDate = (appointments: Appointment[]) => {
    // Helper function to format date into 'YYYY-MM-DD'
    const formatDate = (date: string | Date) => {
      return new Date(date).toISOString().split('T')[0]; // Returns the date in 'YYYY-MM-DD' format
    };

    // Group the appointments by the formatted date
    const grouped: Record<string, number> = appointments.reduce((acc: any, appointment) => {
      const date = formatDate(appointment.date);
      if (acc[date]) {
        acc[date] += 1; // Increment the count for this date
      } else {
        acc[date] = 1; // Initialize count for this date
      }
      return acc;
    }, {});

    const groupedArray = Object.entries(grouped).map(([date, count]) => ({
      date: format(new Date(date), "MM/dd"),
      count,
    }));

    return groupedArray.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const { count, data: sessionData } = useMemo(() => {
    if (appointments.isLoading || !appointments.data)
      return { count: 0, data: [] }

    return { count: appointments.data.length, data: groupByDate(appointments.data) }
  }, [appointments])


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
        <Dumbbell className="h-4 w-4 text-slate-500" />
      </CardHeader>
      <CardContent>
        <div className="text-6xl font-bold text-slate-900">{count.toLocaleString()}</div>
        <p className="text-xs text-slate-500 mt-1">Active appointment sessions</p>

        <div className="mt-6 h-32">
          <ChartContainer
            config={{
              sessions: {
                label: "Sessions",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tickMargin={8} fontSize={12} stroke="#94a3b8" />
                <ChartTooltip cursor={{ fill: "hsl(var(--muted))", opacity: 0.15 }} content={<ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      // year: "numeric",
                    })
                  }}
                />} />
                <Bar dataKey="count" name="sessions" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
