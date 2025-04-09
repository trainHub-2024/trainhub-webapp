"use client"

import { FileText, CheckCircle, Clock, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample appeal/request data
const appealRequestData = [
  {
    id: "REQ-2345",
    type: "Schedule Change",
    submittedBy: "Maria G.",
    reason: "Medical appointment",
    status: "pending",
    priority: "medium",
  },
  {
    id: "REQ-2346",
    type: "Refund Request",
    submittedBy: "James W.",
    reason: "Service issues",
    status: "pending",
    priority: "high",
  },
  {
    id: "REQ-2347",
    type: "Trainer Change",
    submittedBy: "Emma D.",
    reason: "Communication",
    status: "pending",
    priority: "medium",
  },
  {
    id: "REQ-2348",
    type: "Session Extension",
    submittedBy: "Robert M.",
    reason: "Additional time",
    status: "pending",
    priority: "low",
  },
]

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "approved":
      return (
        <Badge
          variant="outline"
          className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1 whitespace-nowrap"
        >
          <CheckCircle className="h-3 w-3" />
          Approved
        </Badge>
      )
    case "denied":
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1 whitespace-nowrap"
        >
          <XCircle className="h-3 w-3" />
          Denied
        </Badge>
      )
    case "pending":
      return (
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1 whitespace-nowrap"
        >
          <Clock className="h-3 w-3" />
          Pending
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 whitespace-nowrap">
          {status}
        </Badge>
      )
  }
}

// Priority indicator component
const PriorityIndicator = ({ priority }: { priority: string }) => {
  switch (priority) {
    case "high":
      return <span className="block w-2 h-2 rounded-full bg-red-500" title="High Priority" />
    case "medium":
      return <span className="block w-2 h-2 rounded-full bg-blue-500" title="Medium Priority" />
    case "low":
      return <span className="block w-2 h-2 rounded-full bg-green-500" title="Low Priority" />
    default:
      return <span className="block w-2 h-2 rounded-full bg-slate-500" title={`${priority} Priority`} />
  }
}

// Appeal request item component
const AppealRequestItem = ({ request }: { request: (typeof appealRequestData)[0] }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <div className="flex items-center gap-2">
        <PriorityIndicator priority={request.priority} />
        <div>
          <div className="font-medium text-sm flex items-center gap-1">
            {request.id}
            <span className="text-xs text-muted-foreground">({request.type})</span>
          </div>
          <div className="text-xs text-muted-foreground">{request.submittedBy}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <StatusBadge status={request.status} />
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
          >
            <CheckCircle className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="ghost" className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50">
            <XCircle className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function AppealRequestCard() {
  // Calculate statistics
  const totalPending = appealRequestData.filter((request) => request.status === "pending").length
  const highPriority = appealRequestData.filter(
    (request) => request.priority === "high" && request.status === "pending",
  ).length

  return (
    <Card className="w-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          Appeal Requests
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{totalPending} pending</Badge>
          {highPriority > 0 && (
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{highPriority} high priority</Badge>
          )}
        </CardTitle>
        <div className="rounded-full bg-blue-50 p-1.5 dark:bg-blue-900/20">
          <FileText className="h-4 w-4 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-2">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="denied">Denied</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="mt-0">
            <div className="space-y-0 max-h-[240px] overflow-y-auto">
              {appealRequestData.map((request) => (
                <AppealRequestItem key={request.id} request={request} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="approved" className="mt-0">
            <div className="p-4 text-center text-sm text-muted-foreground">No approved requests to display</div>
          </TabsContent>
          <TabsContent value="denied" className="mt-0">
            <div className="p-4 text-center text-sm text-muted-foreground">No denied requests to display</div>
          </TabsContent>
        </Tabs>
        <div className="mt-2 text-xs text-right">
          <Button variant="link" size="sm" className="h-auto p-0">
            View all requests
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
