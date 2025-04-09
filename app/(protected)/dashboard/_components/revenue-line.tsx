"use client"

import { ArrowUpRight, DollarSign, TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample revenue data
const revenueData = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 49000 },
    { month: "Apr", revenue: 63000 },
    { month: "May", revenue: 58000 },
    { month: "Jun", revenue: 72000 },
    { month: "Jul", revenue: 78000 },
    { month: "Aug", revenue: 84000 },
    { month: "Sep", revenue: 91000 },
    { month: "Oct", revenue: 99000 },
    { month: "Nov", revenue: 106000 },
    { month: "Dec", revenue: 125000 },
]

// Calculate percentage change from first to last month
const percentageChange = (
    ((revenueData[revenueData.length - 1].revenue - revenueData[0].revenue) / revenueData[0].revenue) *
    100
).toFixed(1)

export default function RevenueChart() {
    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-bold">Revenue Overview</CardTitle>
                        <CardDescription>Monthly revenue performance for the current year</CardDescription>
                    </div>
                    <div className="rounded-full bg-emerald-50 p-2 dark:bg-emerald-900/20">
                        <DollarSign className="h-5 w-5 text-emerald-500" />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="mt-4">
                <div className="flex items-center justify-between pb-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Total Annual Revenue</p>
                        <p className="text-2xl font-bold">$922,000</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-500 dark:bg-emerald-900/20">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span>{percentageChange}%</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                </div>

                <div className="w-full pt-2">
                    <ChartContainer
                        config={{
                            revenue: {
                                label: "Revenue",
                                color: "hsl(var(--chart-1))",
                            },
                        }}
                    >
                        <LineChart
                            data={revenueData}
                            margin={{
                                top: 5,
                                right: 0,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis
                                dataKey="month"
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value / 1000}k`}
                            />
                            <ChartTooltip content={<ChartTooltipContent formatValue={(value) => `$${value.toLocaleString()}`} />} />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="var(--color-revenue)"
                                strokeWidth={2.5}
                                dot={{
                                    r: 0,
                                }}
                                activeDot={{
                                    r: 6,
                                    strokeWidth: 0,
                                    fill: "var(--color-revenue)",
                                }}
                            />
                        </LineChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    )
}
