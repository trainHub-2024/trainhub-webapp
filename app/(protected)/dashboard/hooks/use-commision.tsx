"use client"

import { useQuery } from '@tanstack/react-query';

import { getCommission } from '@/lib/actions/commission.actions';

const useCommission = () => {

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['commission'],
        queryFn: fetchData,
    })

    async function fetchData() {
        const res = await getCommission();
        return res;
    }

    return { data, isError, isLoading, error };
}

export default useCommission;