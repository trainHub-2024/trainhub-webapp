"use client"

import { FileText, CheckCircle, Clock, XCircle } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useAppeals from "../hooks/use-appeals"
import { useDashboardContext } from "../context"
import { useMemo } from "react"
import Link from "next/link"
import { AdminRequest, AdminRequestStatus } from "@/types/appwrite.types"
import { updateAdminRequestStatus } from "@/lib/actions/requests.actions"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

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
    case "completed":
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
const StatusIndicator = ({ status }: { status: AdminRequestStatus }) => {
  switch (status) {
    case "denied":
      return <span className="block w-2 h-2 rounded-full bg-red-500" title="High Priority" />
    case "pending":
      return <span className="block w-2 h-2 rounded-full bg-blue-500" title="Medium Priority" />
    case "completed":
      return <span className="block w-2 h-2 rounded-full bg-green-500" title="Low Priority" />
    default:
      return <span className="block w-2 h-2 rounded-full bg-slate-500" title={`${status} Status`} />
  }
}

// Appeal request item component
const AppealRequestItem = ({ request, handleChangeStatus }: {
  request: AdminRequest,
  handleChangeStatus?: (request: AdminRequest, newStatus: "completed" | "denied") => void
}) => {

  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <div className="flex items-center gap-2">
        <StatusIndicator status={request.status} />
        <div>
          <div className="font-medium text-sm flex items-center gap-1">
            ID #{request.$id}
            <span className="text-xs text-muted-foreground">({request.type})</span>
          </div>
          <div className="text-xs">{request?.trainerProfile?.name}</div>
          <p className="text-xs text-muted-foreground mt-1">Filed at {new Date(request.$createdAt).toDateString()}, Last Updated at {new Date(request.$updatedAt).toDateString()}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <StatusBadge status={request.status} />

        {/* TODO: checking if working */}
        {request.status === "pending" && handleChangeStatus && (
          <div className="flex gap-1">
            <Button
              onClick={() => handleChangeStatus(request, "completed")}
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            >
              <CheckCircle className="h-3.5 w-3.5" />
            </Button>
            <Button
              onClick={() => handleChangeStatus(request, "denied")}
              size="sm" variant="ghost" className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50">
              <XCircle className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AppealRequestCard() {

  const { selectedDate } = useDashboardContext();
  const appeals = useAppeals({ dateRange: selectedDate })
  const queryClient = useQueryClient();

  const { pending, completed, denied } = useMemo(() => {
    const pendingRequests = appeals.data?.filter((request) => request.status === "pending").splice(0, 6) || [];
    const deniedRequests = appeals.data?.filter((request) => request.status === "denied").splice(0, 6) || [];
    const completedRequests = appeals.data?.filter((request) => request.status === "completed").splice(0, 6) || [];

    return {
      pending: pendingRequests,
      completed: completedRequests,
      denied: deniedRequests,
    }

  }, [appeals])

  async function handleChangeStatus(request: AdminRequest, newStatus: "denied" | "completed") {
    try {
      const res = await updateAdminRequestStatus({
        id: request.$id,
        status: newStatus,
        trainer_id: request.trainerProfile_id,
        type: request.type,
      });

      if (res) {
        toast("Updated successfully");
        queryClient.invalidateQueries({ queryKey: ["appeals"] })
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error);
    }

  }

  return (
    <Card className="w-full flex flex-col">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          Appeal Requests
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{pending.length} pending</Badge>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{completed.length} approved</Badge>
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{denied.length} denied</Badge>
        </CardTitle>
        <div className="rounded-full bg-blue-50 p-1.5 dark:bg-blue-900/20">
          <FileText className="h-4 w-4 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent className="py-4 flex-1">
        <Tabs defaultValue="pending" className="w-full flex-1">
          <TabsList className="grid w-full grid-cols-3 mb-2">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="denied">Denied</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="mt-0">
            {pending.length > 0 ? <>
              <div className="space-y-0 overflow-y-auto">
                {pending.map((request) => (
                  <AppealRequestItem key={request.id} request={request} handleChangeStatus={handleChangeStatus} />
                ))}
              </div>
            </> : <>
              <div className="p-4 text-center text-sm text-muted-foreground">No pending requests to display</div>
            </>}
          </TabsContent>
          <TabsContent value="approved" className="mt-0">
            {completed.length > 0 ? <>
              <div className="space-y-0 overflow-y-auto">
                {completed.map((request) => (
                  <AppealRequestItem key={request.id} request={request} />
                ))}
              </div>
            </> : <>
              <div className="p-4 text-center text-sm text-muted-foreground">No approved requests to display</div>
            </>}
          </TabsContent>
          <TabsContent value="denied" className="mt-0">
            {denied.length > 0 ? <>
              <div className="space-y-0 overflow-y-auto">
                {denied.map((request) => (
                  <AppealRequestItem key={request.id} request={request} />
                ))}
              </div>
            </> : <>
              <div className="p-4 text-center text-sm text-muted-foreground">No denied requests to display</div>
            </>}
          </TabsContent>
        </Tabs>

      </CardContent>
      <CardFooter className="flex-row justify-end">
        <div className="mt-2 text-xs text-left">
          <Link href={"/requests/certifications"}>
            <Button variant="link" size="lg" className="h-auto p-0">
              View all appeals
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
