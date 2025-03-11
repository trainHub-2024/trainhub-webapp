import React from 'react'
import { UserProfile } from '@/types/appwrite.types'

import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'

const Row = ({ data }: { data: UserProfile }) => {

    return (
        <TableRow>
            <TableCell className='capitalize'>{data.name}</TableCell>
            <TableCell className="font-medium text-center">{data.contactNumber}</TableCell>
            <TableCell>

            </TableCell>
            <TableCell>

            </TableCell>
            <TableCell className="flex flex-row justify-end items-center gap-2">
                <Button>
                    View
                </Button>
                <Button variant={"destructive"}>
                    Disable
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default Row