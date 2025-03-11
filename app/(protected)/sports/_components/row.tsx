import React from 'react'
import { Sport, UserProfile } from '@/types/appwrite.types'

import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'

const Row = ({ data }: { data: Sport }) => {
    console.log(data)
    return (
        <TableRow>
            <TableCell className='capitalize'>{data.name}</TableCell>
            <TableCell className="flex flex-row justify-end items-center gap-2">
                <Button>
                    Edit
                </Button>
                <Button variant={"destructive"}>
                    Delete
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default Row