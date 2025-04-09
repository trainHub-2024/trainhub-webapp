"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, ChevronDown, Clock, Filter, LayoutGrid, LineChart, Users } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { useDashboardContext } from "../context"

export default function AnalyticsFilters() {
    const { selectedDate, setSelectedDate, setShortcutDate, shortcutDate } = useDashboardContext();

    const [commissionRate, setCommissionRate] = useState(10)

    const handleCommissionChange = (value: number[]) => {
        setCommissionRate(value[0])
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value)
        if (!isNaN(value) && value >= 0 && value <= 100) {
            setCommissionRate(value)
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <CardTitle className="text-xl font-bold">Analytics Overview</CardTitle>
                        <CardDescription>Customize your analytics view with filters and date ranges</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1.5">
                        <Filter className="h-3.5 w-3.5" />
                        <span>Reset Filters</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex w-full justify-start items-center gap-2">
                    {/* Date Range Selector */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Date Range</h3>
                        </div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    <span>
                                        {format(selectedDate.from, "MMM d, yyyy")} - {format(selectedDate.to, "MMM d, yyyy")}
                                    </span>
                                    <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar toDate={new Date()} mode="range" selected={selectedDate} onSelect={(range: any) => range && setSelectedDate(range)} />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Shortcut Date Selector */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Shortcut Dates</h3>
                        </div>
                        <Tabs value={shortcutDate} onValueChange={(val: any) => setShortcutDate(val)} className="w-full">
                            <TabsList className="flex w-full">
                                <TabsTrigger value="7Days">Past 7 Days</TabsTrigger>
                                <TabsTrigger value="1Month">Past Month</TabsTrigger>
                                <TabsTrigger value="3Month">Past 3 Months</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
            </CardContent>

            <Separator />

            <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6">
                <div>
                    <h2 className="text-sm font-medium text-muted-foreground">Commission Rating</h2>
                    <h1 className="text-3xl font-bold">{commissionRate}%</h1>
                    <div className="rounded-md bg-muted p-2">
                        <p className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Last updated: April 17, 2023 at 10:30 AM
                        </p>
                    </div>
                </div>
                <form className="w-full sm:w-64 space-y-2">
                    <h3 className="text-sm font-medium">Adjust Commission Rate</h3>
                    <div className="flex items-center gap-2 w-full">
                        <Slider
                            value={[commissionRate]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={handleCommissionChange}
                            className="flex-1"
                        />
                        <div className="relative w-16">
                            <Input
                                type="number"
                                value={commissionRate}
                                onChange={handleInputChange}
                                min={0}
                                max={100}
                                className="pr-4"
                            />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                        </div>
                        <Button size={"sm"} type="submit">Save</Button>
                    </div>
                </form>
            </CardFooter>
        </Card>
    )
}
