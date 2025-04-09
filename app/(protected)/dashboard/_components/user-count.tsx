"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useDashboardContext } from "../context"
import useUsers from "../hooks/use-users"
import { useMemo } from "react"


export default function UserCountChart() {

    const { selectedDate } = useDashboardContext();

    const users = useUsers({ dateRange: selectedDate });

    const { total_count, trainees, trainers, chartData: userData } = useMemo(() => {
        if (users.isLoading || !users.data)
            return { total_count: 0, trainers: [], trainees: [] }


        return {
            total_count: users.data.length,
            trainers: users.data.filter(user => user.role === "trainer"),
            trainees: users.data.filter(user => user.role === "trainee"),
            chartData: [
                {
                    name: "Trainee",
                    count: users.data.filter(user => user.role === "trainee").length,
                },
                {
                    name: "Trainer",
                    count: users.data.filter(user => user.role === "trainer").length,
                },
            ]
        }
    }, [users])

    // Calculate trainee percentage
    const traineePercentage = Math.round((trainees.length / total_count) * 100)
    const traineeRatio = trainees.length != 0 && trainers.length != 0 ? Math.round(trainees.length / trainers.length) : 0;

    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-bold">User Distribution</CardTitle>
                        <CardDescription>Trainee and Trainer count comparison</CardDescription>
                    </div>
                    <div className="rounded-full bg-purple-50 p-2 dark:bg-purple-900/20">
                        <Users className="h-5 w-5 text-purple-500" />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Users</p>
                            <p className="text-2xl font-bold">{total_count.toLocaleString()}</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                                    <p className="text-sm font-medium">Trainees</p>
                                </div>
                                <p className="text-sm font-medium">{trainees.length.toLocaleString()}</p>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                                    <p className="text-sm font-medium">Trainers</p>
                                </div>
                                <p className="text-sm font-medium">{trainers.length.toLocaleString()}</p>
                            </div>

                            <div className="mt-2 rounded-md bg-muted p-2">
                                <p className="text-xs text-muted-foreground">
                                    {traineePercentage}% of users are trainees, with a trainee-to-trainer ratio of{" "}
                                    {traineeRatio}:1
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="h-[180px]">
                        <ChartContainer
                            config={{
                                count: {
                                    label: "Count",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={userData}
                                    layout="vertical"
                                    margin={{
                                        top: 5,
                                        right: 5,
                                        bottom: 5,
                                        left: 80,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        axisLine={false}
                                        tickLine={false}
                                        width={80}
                                        stroke="hsl(var(--muted-foreground))"
                                        fontSize={12}
                                    />
                                    <XAxis
                                        type="number"
                                        axisLine={false}
                                        tickLine={false}
                                        stroke="hsl(var(--muted-foreground))"
                                        fontSize={12}
                                        tickFormatter={(value) => value.toLocaleString()}
                                    />
                                    <ChartTooltip
                                        content={<ChartTooltipContent formatValue={(value: any) => `${value.toLocaleString()} users`} />}
                                    />
                                    <Bar dataKey="count" radius={[4, 4, 4, 4]} fill="var(--color-count)" barSize={20} fillOpacity={0.9} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
