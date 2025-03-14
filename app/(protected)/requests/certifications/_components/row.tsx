import React, { useState } from 'react'
import { AdminRequest, UserProfile } from '@/types/appwrite.types'

import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { updateAdminRequestStatus } from '@/lib/actions/requests.actions'
import { toast } from 'sonner'

const RequestStatusDisplay = ({ status }: { status: "pending" | "denied" | "completed" }) => {
    const style = {
        pending: ["bg-primary", "border-primary text-white"].join(" "),
        denied: ["bg-red-500", "border-red-500 text-white"].join(" "),
        completed: ["bg-green-500", "border-green-500 text-white"].join(" "),
    };

    return <span className={`capitalize text-sm border px-3 py-1 rounded-full ${style[status]}`}>
        {status}
    </span>

}

const Row = ({ data, refetch }: { data: AdminRequest; refetch: (newParams: any) => Promise<void>; }) => {

    const [isLoading, setIsLoading] = useState(false)

    async function handleChangeStatus(newStatus: "denied" | "completed") {
        setIsLoading(true)
        try {
            const res = await updateAdminRequestStatus({ id: data.$id, status: newStatus, trainer_id: data.trainerProfile_id, type: data.type })

            if (res) {
                toast("Updated successfully")
                refetch({});
            }
        } catch (error: any) {
            console.error(error)
            toast.error(error);

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <TableRow>
            <TableCell className='capitalize'>{data.trainerProfile.name}</TableCell>
            <TableCell className="font-medium text-center">
                <RequestStatusDisplay status={data.status} />
            </TableCell>
            <TableCell className='text-center'>
                {data?.text}
            </TableCell>
            <TableCell className='uppercase text-center'>
                {data.type}
            </TableCell>
            <TableCell>
                {data?.certification && (
                    <div className="flex justify-center items-center">
                        <div className="size-48 border relative rounded-lg overflow-hidden">
                            <a href={data.certification ?? ""} target="_blank" rel="noopener noreferrer">
                                <Image
                                    alt="certificate"
                                    src={data.certification ?? ""}
                                    fill
                                    className="object-center object-contain"
                                />
                            </a>
                        </div>
                    </div>
                )}
            </TableCell>
            <TableCell >
                {data.status === "pending" && (
                    <div className="flex flex-row justify-end items-center gap-2">
                        <Button disabled={isLoading} type='button' onClick={() => handleChangeStatus("completed")}>
                            Accept
                        </Button>
                        <Button disabled={isLoading} type='button' onClick={() => handleChangeStatus("denied")} variant={"destructive"}>
                            Deny
                        </Button>
                    </div>
                )}
            </TableCell>
        </TableRow>
    )
}

export default Row