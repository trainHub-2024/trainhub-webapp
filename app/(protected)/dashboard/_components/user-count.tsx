"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample user count data
const userData = [
    {
        name: "Trainee",
        count: 845,
    },
    {
        name: "Trainer",
        count: 142,
    },
]

export default function UserCountChart() {
    // Calculate total users
    const totalUsers = userData.reduce((sum, item) => sum + item.count, 0)

    // Calculate trainee percentage
    const traineePercentage = Math.round((userData[0].count / totalUsers) * 100)

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
                            <p className="text-2xl font-bold">{totalUsers.toLocaleString()}</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                                    <p className="text-sm font-medium">Trainees</p>
                                </div>
                                <p className="text-sm font-medium">{userData[0].count.toLocaleString()}</p>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                                    <p className="text-sm font-medium">Trainers</p>
                                </div>
                                <p className="text-sm font-medium">{userData[1].count.toLocaleString()}</p>
                            </div>

                            <div className="mt-2 rounded-md bg-muted p-2">
                                <p className="text-xs text-muted-foreground">
                                    {traineePercentage}% of users are trainees, with a trainee-to-trainer ratio of{" "}
                                    {Math.round(userData[0].count / userData[1].count)}:1
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
                                        content={<ChartTooltipContent formatValue={(value) => `${value.toLocaleString()} users`} />}
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
