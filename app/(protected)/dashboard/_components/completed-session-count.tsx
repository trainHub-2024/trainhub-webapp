"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { CheckCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

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
    // Calculate total completed sessions
    const totalSessions = sessionData.reduce((sum, item) => sum + item.count, 0)

    // Calculate week-over-week growth
    const previousWeekTotal = 780
    const growthPercentage = Math.round(((totalSessions - previousWeekTotal) / previousWeekTotal) * 100)

    // Calculate daily average
    const dailyAverage = Math.round(totalSessions / sessionData.length)

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
                            <p className="text-2xl font-bold">{totalSessions.toLocaleString()}</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                                    <p className="text-sm font-medium">Daily Average</p>
                                </div>
                                <p className="text-sm font-medium">{dailyAverage.toLocaleString()}</p>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-emerald-300"></div>
                                    <p className="text-sm font-medium">Weekend Sessions</p>
                                </div>
                                <p className="text-sm font-medium">{(sessionData[5].count + sessionData[6].count).toLocaleString()}</p>
                            </div>

                            <div className="mt-2 rounded-md bg-muted p-2">
                                <p className="text-xs text-muted-foreground">
                                    {growthPercentage > 0 ? "+" : ""}
                                    {growthPercentage}% week-over-week growth with highest completion on Sunday
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="h-[180px]">
                        <ChartContainer
                            config={{
                                completed: {
                                    label: "Completed Sessions",
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
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        stroke="hsl(var(--muted-foreground))"
                                        fontSize={12}
                                        tickFormatter={(value) => value.substring(0, 3)}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        stroke="hsl(var(--muted-foreground))"
                                        fontSize={12}
                                        tickFormatter={(value) => value.toLocaleString()}
                                    />
                                    <ChartTooltip
                                        content={<ChartTooltipContent formatValue={(value) => `${value.toLocaleString()} sessions`} />}
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
