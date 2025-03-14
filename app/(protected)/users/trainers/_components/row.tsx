import React, { useMemo, useState } from 'react'
import { TrainerProfile } from '@/types/appwrite.types'

import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { formatTimeRange } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { parseISO, compareDesc } from "date-fns";
import { updateProfileById } from '@/lib/actions/profile.actions'
import { toast } from 'sonner'
import Link from 'next/link'

const Row = ({ data, refetch }: { data: TrainerProfile; refetch: (newParams: Record<string, string | number>) => Promise<void> }) => {

    const [isLoading, setisLoading] = useState(false)

    const lastAppointment = useMemo(() => {
        if (!data.appointments || data.appointments.length === 0) return null;

        const sortedAppointments = [...data.appointments].sort((a, b) =>
            compareDesc(parseISO(new Date(a.date).toISOString()), parseISO(new Date(b.date).toISOString()))
        );

        return new Date(sortedAppointments[0].date); // Return the most recent appointment
    }, [data]);

    async function updateStatusTrainer(isDisabled: boolean) {
        try {
            setisLoading(true);
            const res = await updateProfileById({ id: data.$id, role: 'trainer', body: { isDisabled } });

            if (res) {
                await refetch({});
                toast("Updated Profile");
            }
        } catch (error) {
            console.error(error)
        } finally {
            setisLoading(false);
        }
    }

    return (
        <TableRow>
            <TableCell className='capitalize'>{data.name}</TableCell>
            <TableCell className="font-medium text-center">{data.contactNumber}</TableCell>
            <TableCell>
                <div className='flex justify-center items-center'>
                    {data.isCertified ? <span className="px-2 rounded-full text-green-500 border-green-500 text-xs font-medium py-0.5 border">Yes</span> : <span className="px-2 rounded-full text-red-500 border-red-500 text-xs font-medium py-0.5 border">No</span>}
                </div>
            </TableCell>
            <TableCell>
                <div className="flex flex-col gap-1 justify-center items-center">
                    <span className="text-sm font-bold text-primary">
                        {formatTimeRange(data.startTime, data.endTime)}
                    </span>
                    <div className="space-x-1">
                        {data.workDays?.map((day) => (
                            <span key={day} className="px-2 rounded-full text-muted-foreground border-mutext-muted-foreground text-xs font-medium py-0.5 border">
                                {day}
                            </span>
                        ))}
                    </div>
                </div>
            </TableCell>
            <TableCell className='text-right'>
                <span className='font-bold'>
                    {lastAppointment ? lastAppointment.toLocaleDateString() : "None"}
                </span>
            </TableCell>
            <TableCell className="flex flex-row justify-end items-center gap-2">
                <Link href={`/users/trainers/${data.$id}`}>
                    <Button disabled={isLoading}>
                        View
                    </Button>
                </Link>
                {data.isDisabled ?
                    <Button disabled={isLoading} type='button' onClick={() => updateStatusTrainer(false)} variant={"outline"}>
                        Unban
                    </Button>
                    :
                    <Button disabled={isLoading} type='button' onClick={() => updateStatusTrainer(true)} variant={"destructive"}>
                        Ban
                    </Button>
                }
            </TableCell>
        </TableRow>
    )
}

export default Row