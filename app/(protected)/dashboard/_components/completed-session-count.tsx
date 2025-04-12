"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { CheckCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useDashboardContext } from "../context"
import useAppointments from "../hooks/use-appointments"
import { useMemo } from "react"
import { generateDateRange, groupByDate } from "../helpers"
import { format } from "date-fns"

// Sample completed session data
const sessionData = [
    { name: "Monday", count: 78 },
    { name: "Tuesday", count: 92 },
    { name: "Wednesday", count: 85 },
    { name: "Thursday", count: 110 },
    { name: "Friday", count: 125 },
    { name: "Saturday", count: 168 },
    { name: "Sunday", count: 234 },
]

export default function CompletedSessionCountCard() {
    const { selectedDate } = useDashboardContext();
    const appointments = useAppointments({ status: "completed", dateRange: selectedDate });

    const { count, data: sessionData, maxSessionDate } = useMemo(() => {
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

        const maxSessionDate = filledData.reduce((max, current) => {
            return current.count > max.count ? current : max; // Compare and return the object with the highest count
        }, filledData[0]);

        return {
            count: appointments.data.length,
            data: filledData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
            maxSessionDate
        };

    }, [appointments, selectedDate])

    // Calculate daily average
    const dailyAverage = Math.round(count / sessionData.length)


    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-bold">Completed Sessions</CardTitle>
                        <CardDescription>Weekly session completion analysis</CardDescription>
                    </div>
                    <div className="rounded-full bg-emerald-50 p-2 dark:bg-emerald-900/20">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Completed</p>
                            <p className="text-2xl font-bold">{count.toLocaleString()}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                                    <p className="text-sm font-medium">Daily Average</p>
                                </div>
                                <p className="text-sm font-medium">{dailyAverage.toLocaleString()}</p>
                            </div>
                            {/* 
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-emerald-300"></div>
                                    <p className="text-sm font-medium">Weekend Sessions</p>
                                </div>
  
                            </div> */}

                            {maxSessionDate && (
                                <div className="mt-2 rounded-md bg-muted p-2">
                                    <p className="text-xs text-muted-foreground">
                                        At {maxSessionDate.date} had the highest completion of {maxSessionDate.count} completions
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="h-[180px]">
                        <ChartContainer
                            config={{
                                completed: {
                                    label: "Completed",
                                    color: "hsl(142, 76%, 36%)",
                                },
                            }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={sessionData}
                                    margin={{
                                        top: 5,
                                        right: 5,
                                        bottom: 5,
                                        left: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        stroke="hsl(var(--muted-foreground))"
                                        fontSize={12}
                                    // tickFormatter={(value) => value.substring(0, 3)}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        stroke="hsl(var(--muted-foreground))"
                                        fontSize={12}
                                    // tickFormatter={(value) => value.toLocaleString()}
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
                                        fill="hsl(142, 76%, 36%)"
                                        barSize={20}
                                        fillOpacity={0.9}
                                        name="completed"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
