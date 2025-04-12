"use client"
import { getAppointments } from '@/lib/actions/appointment.actions';
import { AppointmentStatus } from '@/types/appwrite.types';
import { useQuery } from '@tanstack/react-query';
import { DateRangeType } from '../context';
import { subDays } from 'date-fns';


type Props = {
    status?: "all" | AppointmentStatus;
    dateRange?: DateRangeType
}
const useAppointments = ({ status = "all", dateRange = { from: subDays(new Date(), 7), to: new Date() } }: Props) => {

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['appointments', status, dateRange.to.toDateString(), dateRange.from.toDateString()],
        queryFn: fetchData,
    })

    async function fetchData() {
        const res = await getAppointments({ status, dateRange });
        return res;
    }

    return { data, isError, isLoading, error };
}

export default useAppointments;