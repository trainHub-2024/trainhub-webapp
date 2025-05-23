"use client"

import { Calendar, CheckCircle, Clock, XCircle, AlertTriangle, ThumbsUpIcon, Loader } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDashboardContext } from "../context"
import useAppointments from "../hooks/use-appointments"
import { useMemo } from "react"
import { AppointmentStatus } from "@/types/appwrite.types"


const StatusBadge = ({ status }: { status: AppointmentStatus }) => {
    switch (status) {
        case "completed":
            return (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Completed
                </Badge>
            )
        case "cancelled":
            return (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
                    <XCircle className="h-3 w-3" />
                    Cancelled
                </Badge>
            )
        case "pending":
            return (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
                    <Loader className="h-3 w-3" />
                    Pending
                </Badge>
            )
        case "confirmed":
            return (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                    <ThumbsUpIcon className="h-3 w-3" />
                    Confirmed
                </Badge>
            )
        default:
            return (
                <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                    {status}
                </Badge>
            )
    }
}

export default function SessionHistoryTable() {

    const { selectedDate } = useDashboardContext();
    const appointments = useAppointments({ status: "all", dateRange: selectedDate });

    const { pending, confirmed, completed, cancelled, completionRate } = useMemo(() => {
        const pending = appointments.data?.filter((d) => d.status === "pending") || [];
        const confirmed = appointments.data?.filter((d) => d.status === "confirmed") || [];
        const cancelled = appointments.data?.filter((d) => d.status === "cancelled") || [];
        const completed = appointments.data?.filter((d) => d.status === "completed") || [];

        const completionRate = Math.round((completed.length / (appointments.data?.length ?? 0)) * 100) ?? 0


        return {
            pending,
            confirmed,
            completed,
            cancelled,
            completionRate
        }

    }, [appointments])

    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-bold">Session History</CardTitle>
                        <CardDescription>Recent session statuses and details</CardDescription>
                    </div>
                    <div className="rounded-full bg-slate-50 p-2 dark:bg-slate-900/20">
                        <Calendar className="h-5 w-5 text-slate-500" />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-4">
                        <div className="rounded-lg bg-slate-50 p-3">
                            <p className="text-xs text-slate-500">Total Sessions</p>
                            <p className="text-xl font-bold">{appointments.data?.length ?? 0}</p>
                        </div>
                        <div className="rounded-lg bg-amber-50 p-3">
                            <p className="text-xs text-amber-700">Pending/Confirmed</p>
                            <p className="text-xl font-bold text-amber-700">{pending.length + confirmed.length}</p>
                        </div>
                        <div className="rounded-lg bg-emerald-50 p-3">
                            <p className="text-xs text-emerald-700">Completed</p>
                            <p className="text-xl font-bold text-emerald-700">{completed.length}</p>
                        </div>
                        <div className="rounded-lg bg-red-50 p-3">
                            <p className="text-xs text-red-700">Cancelled</p>
                            <p className="text-xl font-bold text-red-700">{cancelled.length}</p>
                        </div>
                        <div className="rounded-lg bg-blue-50 p-3">
                            <p className="text-xs text-blue-700">Completion Rate</p>
                            <p className="text-xl font-bold text-blue-700">{completionRate}%</p>
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {/* <TableHead>Session ID</TableHead> */}
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Participants</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.data?.map((session) => (
                                    <TableRow key={session.$id}>
                                        {/* <TableCell className="font-medium">{session.id}</TableCell> */}
                                        <TableCell>{new Date(session.date).toDateString()}</TableCell>
                                        <TableCell>{session.timeSlot}</TableCell>
                                        <TableCell>{session.duration} hr</TableCell>
                                        <TableCell>
                                            <div className="text-xs">
                                                <div className="font-medium">Coach {session?.trainerProfile?.name}</div>
                                                <div className="text-muted-foreground">{session?.userProfile?.name}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={session.status} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* <div className="rounded-md bg-muted p-2">
                        <p className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Last updated: April 17, 2023 at 10:30 AM
                        </p>
                    </div> */}
                </div>
            </CardContent>
        </Card>
    )
}
