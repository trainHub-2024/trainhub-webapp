'use client'
import React from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CreateSportModal from '@/components/modals/modal-create-sport';

const Filters = () => {

    // const router = useRouter();
    // const pathname = usePathname();
    // const searchParams = useSearchParams();

    return (
        <div className="w-full justify-end items-center flex py-2">
            <div className="flex justify-end items-center gap-2">
                <CreateSportModal />
            </div>
        </div>
    )
}

export default Filters