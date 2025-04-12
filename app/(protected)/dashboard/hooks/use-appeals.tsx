"use client"

import { useQuery } from '@tanstack/react-query';
import { DateRangeType } from '../context';
import { subDays } from 'date-fns';
import { getAdminRequests } from '@/lib/actions/requests.actions';


type Props = {
    dateRange?: DateRangeType
}
const useAppeals = ({ dateRange = { from: subDays(new Date(), 7), to: new Date() } }: Props) => {

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['appeals', dateRange.to.toDateString(), dateRange.from.toDateString()],
        queryFn: fetchData,
    })

    async function fetchData() {
        const res = await getAdminRequests({ dateRange });
        return res;
    }

    return { data, isError, isLoading, error };
}

export default useAppeals;