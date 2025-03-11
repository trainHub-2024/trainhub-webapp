'use client'
import UiLoading from '@/components/ui/loading-page'
import { getProfileById } from '@/lib/actions/profile.actions'
import { useAppwrite } from '@/lib/useAppwrite'
import { IPageProps } from '@/types/global'
import React, { useMemo } from 'react'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { CalendarCheckIcon, DumbbellIcon, MapPinIcon, Phone, StarIcon, XCircleIcon } from 'lucide-react'
import { Appointment } from '@/types/appwrite.types'
import { formatTimeRange } from '@/lib/utils'
import Image from 'next/image'
import { PaidOverview } from '../_components/paid-overview'

const TrainerPage = ({ params }: IPageProps) => {
    const id = params.id;

    const { data: trainer, loading, error, refetch } = useAppwrite({
        fn: getProfileById,
        params: { role: "trainer", id }
    });

    const rating = useMemo(() => {
        if (!trainer?.ratings || trainer.ratings.length === 0) return 0;

        const total = trainer.ratings.reduce((sum, r) => sum + r.rating, 0);
        return total / trainer.ratings.length; // Get average
    }, [trainer]);

    const completedAppointments = useMemo(() => {
        if (!trainer?.appointments || trainer.appointments.length === 0) return [];

        return trainer?.appointments?.filter((a: Appointment) => a.status === "completed")
    }, [trainer])

    const paidAppointments = useMemo(() => {
        if (!trainer?.appointments || trainer.appointments.length === 0) return [];

        return trainer?.appointments?.filter((a: Appointment) => a.isConfirmedPayment)
    }, [trainer])

    const totalCompleted = completedAppointments.length;

    const totalPenalties = useMemo(() => {
        if (!trainer?.appointments || trainer.appointments.length === 0) return 0;

        return trainer?.appointments?.filter((a: Appointment) => a.isPenalized).length
    }, [trainer])

    if (loading) return <UiLoading />

    if (!trainer || error) return <div className="">{error}</div>


    return (
        <section className="size-full grid grid-cols-4 gap-2 px-10">
            <div className="flex flex-col justify-start items-center">
                <Avatar className='size-56'>
                    <AvatarImage src="" alt="@profile" />
                    <AvatarFallback>{trainer.name?.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="grid w-full">

                    <div className="grid gap-0">
                        <h1 className="mt-2 font-bold text-xl">{trainer.name}</h1>
                        <h2 className="">{trainer?.sports?.length > 0 ? trainer?.sports?.map((s: any) => s.name) : "No Specializations"} | {formatTimeRange(trainer.startTime, trainer.endTime)}</h2>
                        <p className="text-muted-foreground font-normal">{trainer.bio}</p>
                    </div>

                    <div className="grid gap-1 mt-4">
                        <div className="flex flex-wrap gap-1">
                            {trainer.workDays?.map((d: any) => {
                                return (
                                    <span key={d} className="text-xs px-2 py-0.5 rounded-full border uppercase">{d}</span>
                                )
                            })}
                        </div>
                    </div>

                    <div className="grid gap-1">
                        <div className="grid mt-6 grid-cols-2">
                            <div className="flex justify-start items-center gap-2">
                                <StarIcon className="size-5" />
                                <p className="">{Math.floor(rating)} <span className="font-light">ratings</span></p>
                            </div>
                            <div className="flex justify-start items-center gap-2">
                                <DumbbellIcon className="size-5" />
                                <p className=""><span className="font-light">Level</span> {Math.floor((trainer.score / 5) + 1)}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="flex justify-start items-center gap-2">
                                <CalendarCheckIcon className="size-5" />
                                <p className="">{totalCompleted} <span className="font-light">completed</span></p>
                            </div>
                            <div className="flex justify-start items-center gap-2">
                                <XCircleIcon className="size-5" />
                                <p className="">{totalPenalties} <span className="font-light">penalties</span></p>
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-2 w-full">
                            <Phone className="size-5" />
                            <p className="">{trainer.contactNumber}</p>
                        </div>
                        <div className="flex justify-start items-center gap-2 w-full">
                            <MapPinIcon className="size-5" />
                            <p className="">{trainer.location}</p>
                        </div>
                    </div>

                    <div className="grid mt-6">
                        <h3 className="text-normal font-medium">Certificate</h3>
                        <div className="size-40 overflow-hidden rounded-md border relative">
                            {trainer?.certification && (
                                <Image
                                    src={trainer?.certification}
                                    alt='certificate'
                                    fill className='object-cover object-center'
                                />
                            )}
                        </div>
                    </div>

                    <div className="grid mt-6">
                        <h3 className="text-normal font-medium">QR Code</h3>
                        <div className="size-40 overflow-hidden rounded-md border relative">
                            {trainer?.qrCodePayment && (
                                <Image
                                    src={trainer?.size}
                                    alt='qrCode'
                                    fill className='object-cover object-center'
                                />
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <div className="col-span-3">
                <h3 className="text-lg font-bold text-primary">Appointments</h3>
                <div className="w-full grid grid-cols-2 gap-2 grid-flow-row max-h-[20rem] overflow-y-auto">
                    {trainer?.appointments?.map((a: Appointment) => {
                        return (
                            <div key={a.$id} className="border rounded-xl py-2 px-6 flex flex-col">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-primary font-bold text-lg">{new Date(a.date).toLocaleString()}</h3>
                                    <span className='px-2 py-0.5 text-xs border rounded-full uppercase'>{a.status}</span>
                                </div>
                                <p className="text-sm py-4">{a?.notes ? a.notes : "Nothing to say"}</p>
                                <div className="w-full flex justify-start items-center">
                                    <h5 className='text-muted-foreground text-xs'>{a.paymentDate ? "Payment Date: " + new Date(a.paymentDate).toLocaleString() : "Not yet paid"}</h5>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="grid mt-6">
                    <h3 className="text-lg font-bold text-primary">Earnings</h3>
                    <PaidOverview earnings={paidAppointments} />
                </div>
            </div>

        </section>
    )
}

export default TrainerPage