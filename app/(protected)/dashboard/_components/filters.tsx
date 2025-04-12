"use client"

import type React from "react"

import { FormEvent, useEffect, useRef, useState } from "react"
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
import useCommission from "../hooks/use-commision"
import { toast } from "sonner"
import { updateCommission } from "@/lib/actions/commission.actions"

export default function AnalyticsFilters() {
    const { selectedDate, setSelectedDate, setShortcutDate, shortcutDate } = useDashboardContext();

    const [commissionRate, setCommissionRate] = useState(10)

    const commission = useCommission();

    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current && commission.data && commission.data.length > 0) {
            setCommissionRate(commission.data[0].rate);
            initialized.current = true;
        }
    }, [commission])


    const handleCommissionChange = (value: number[]) => {
        setCommissionRate(value[0])
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!commission?.data || commission.data?.length <= 0) return null;

        try {
            toast("Updating commission please wait!");

            const res = await updateCommission({ id: commission.data[0].$id, body: { rate: commissionRate } });
            if (res) {
                toast("Successfully Updated Commission!");
                window.location.reload();
            }
        } catch (error) {
            toast.error("An error occured");
            console.log(error);
        }
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
                                        {format(selectedDate?.from, "MMM d, yyyy")} - {format(selectedDate?.to, "MMM d, yyyy")}
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
                            Last updated: {commission?.data && commission?.data.length > 0 && (
                                new Date(commission.data[0].$updatedAt).toLocaleString()
                            )}
                        </p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="w-full sm:w-64 space-y-2">
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
