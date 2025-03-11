'use client'
import { getAdminRequests } from '@/lib/actions/requests.actions';
import { useAppwrite } from '@/lib/useAppwrite';
import React from 'react'

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

const CertificationsPage = () => {

    const { data, loading, error, refetch } = useAppwrite({
        fn: getAdminRequests,
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
                                <TableHead className="w-[60px] text-center">Status</TableHead>
                                <TableHead className="text-center">Message</TableHead>
                                <TableHead className='text-center'>Certificate</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <UiDataLoader
                                isLoading={loading}
                                isError={error ? true : false}
                                length={data?.length}
                                type='table'
                                columns={5}
                                message={{ no_items: "No requests found!" }}
                            >
                                {
                                    data?.map((d) => {
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

export default CertificationsPage