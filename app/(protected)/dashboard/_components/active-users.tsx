"use client"

import { UserCheck, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ActiveUsersCardProps {
    count: number
    userData?: { date: string; count: number }[]
}

export function ActiveUsersCard({
    count = 876,
    userData = [
        { date: "Mon", count: 720 },
        { date: "Tue", count: 750 },
        { date: "Wed", count: 790 },
        { date: "Thu", count: 810 },
        { date: "Fri", count: 845 },
        { date: "Sat", count: 865 },
        { date: "Sun", count: 876 },
    ],
}: ActiveUsersCardProps) {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <span className="text-slate-800">Active Users</span>
                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-normal flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        8%
                    </span>
                </CardTitle>
                <UserCheck className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-slate-900">{count.toLocaleString()}</div>
                <p className="text-xs text-slate-500 mt-1">Non-banned user accounts</p>

                <div className="mt-6 h-32">
                    <ChartContainer
                        config={{
                            users: {
                                label: "Users",
                                color: "hsl(var(--chart-2))",
                            },
                        }}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={userData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tickMargin={8} fontSize={12} stroke="#94a3b8" />
                                <ChartTooltip cursor={{ fill: "hsl(var(--muted))", opacity: 0.15 }} content={<ChartTooltipContent />} />
                                <Bar dataKey="count" name="users" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    )
}
