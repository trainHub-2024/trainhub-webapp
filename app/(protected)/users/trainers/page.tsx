"use client"
import React from 'react'
import { getTrainerProfiles } from '@/lib/actions/profile.actions';
import { useAppwrite } from '@/lib/useAppwrite';

import Filters from './_components/filters';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import UiDataLoader from '@/components/ui/data-loader';
import Row from './_components/row';


const TrainersPage = () => {

    const { data: trainers, loading, error, refetch } = useAppwrite({
        fn: getTrainerProfiles,
    });

    return (
        <article className="size-full">
            <Filters />
            <Card>
                <CardContent className='pt-2'>
                    <Table>
                        <TableHeader className='h-16'>
                            <TableRow>
                                <TableHead className="w-[150px]">Name</TableHead>
                                <TableHead className="w-[150px] text-center">Contact Number</TableHead>
                                <TableHead className="w-[60px]">Certified</TableHead>
                                <TableHead className='text-center'>Work Schedule</TableHead>
                                <TableHead className='text-right'>Last Appoinment</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <UiDataLoader
                                isLoading={loading}
                                isError={error ? true : false}
                                length={trainers?.length}
                                type='table'
                                columns={6}
                                message={{ no_items: "No trainers found!" }}
                            >
                                {
                                    trainers?.map((d) => {
                                        return <Row key={d.id} data={d as any} refetch={refetch} />
                                    })
                                }
                            </UiDataLoader>
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    {/* <UiPaginatedButtons hasNext={page < (data?.totalPages ?? 0)} hasPrev={page > 1} /> */}
                </CardFooter>
            </Card>
        </article>
    )
}

export default TrainersPage