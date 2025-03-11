"use client"
import React from 'react'
import { getTrainerProfiles, getUserProfiles } from '@/lib/actions/profile.actions';
import { useAppwrite } from '@/lib/useAppwrite';


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
import Filters from './_components/filters';
import { getSports } from '@/lib/actions/sports.actions';


const SportsPage = () => {

    const { data, loading, error } = useAppwrite({
        fn: getSports,
    });

    return (
        <article className="size-full">
            <Filters />
            <Card>
                <CardContent className='pt-2'>
                    <Table>
                        <TableHeader className='h-16'>
                            <TableRow>
                                <TableHead className="w-[220px]">Name</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <UiDataLoader
                                isLoading={loading}
                                isError={error ? true : false}
                                length={data?.length}
                                type='table'
                                columns={2}
                                message={{ no_items: "No sports found!" }}
                            >
                                {
                                    data?.map((d) => {
                                        return <Row key={d.id} data={d as any} />
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

export default SportsPage