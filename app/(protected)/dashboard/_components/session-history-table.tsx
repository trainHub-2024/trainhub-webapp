"use client"

import { Calendar, CheckCircle, Clock, XCircle, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample session history data
const sessionHistoryData = [
    {
        id: "SES-1234",
        date: "2023-04-15",
        time: "09:30 AM",
        duration: 60,
        trainer: "Alex Johnson",
        trainee: "Maria Garcia",
        status: "completed",
    },
    {
        id: "SES-1235",
        date: "2023-04-15",
        time: "11:00 AM",
        duration: 45,
        trainer: "Sarah Williams",
        trainee: "James Wilson",
        status: "cancelled",
    },
    {
        id: "SES-1236",
        date: "2023-04-16",
        time: "10:15 AM",
        duration: 60,
        trainer: "Michael Brown",
        trainee: "Emma Davis",
        status: "no-show",
    },
    {
        id: "SES-1237",
        date: "2023-04-16",
        time: "02:00 PM",
        duration: 30,
        trainer: "Alex Johnson",
        trainee: "Robert Miller",
        status: "completed",
    },
    {
        id: "SES-1238",
        date: "2023-04-17",
        time: "09:00 AM",
        duration: 60,
        trainer: "Sarah Williams",
        trainee: "Jennifer Taylor",
        status: "completed",
    },
]

// Function to format date
const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
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
        case "no-show":
            return (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    No-show
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
    // Calculate statistics
    const totalSessions = sessionHistoryData.length
    const completedSessions = sessionHistoryData.filter((session) => session.status === "completed").length
    const completionRate = Math.round((completedSessions / totalSessions) * 100)

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
                    <div className="grid grid-cols-3 gap-4">
                        <div className="rounded-lg bg-slate-50 p-3">
                            <p className="text-xs text-slate-500">Total Sessions</p>
                            <p className="text-xl font-bold">{totalSessions}</p>
                        </div>
                        <div className="rounded-lg bg-emerald-50 p-3">
                            <p className="text-xs text-emerald-700">Completed</p>
                            <p className="text-xl font-bold text-emerald-700">{completedSessions}</p>
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
                                {sessionHistoryData.map((session) => (
                                    <TableRow key={session.id}>
                                        {/* <TableCell className="font-medium">{session.id}</TableCell> */}
                                        <TableCell>{formatDate(session.date)}</TableCell>
                                        <TableCell>{session.time}</TableCell>
                                        <TableCell>{session.duration} min</TableCell>
                                        <TableCell>
                                            <div className="text-xs">
                                                <div className="font-medium">{session.trainer}</div>
                                                <div className="text-muted-foreground">{session.trainee}</div>
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

                    <div className="rounded-md bg-muted p-2">
                        <p className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Last updated: April 17, 2023 at 10:30 AM
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
