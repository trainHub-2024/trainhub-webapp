"use client"

import { useQuery } from '@tanstack/react-query';
import { DateRangeType } from '../context';
import { subDays } from 'date-fns';
import { getUsers } from '@/lib/actions/user.actions';


type Props = {
    dateRange?: DateRangeType
}
const useUsers = ({ dateRange = { from: subDays(new Date(), 7), to: new Date() } }: Props) => {

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['users', dateRange.to.toDateString(), dateRange.from.toDateString()],
        queryFn: fetchData,
    })

    async function fetchData() {
        const res = await getUsers({ dateRange });
        return res;
    }

    return { data, isError, isLoading, error };
}

export default useUsers;