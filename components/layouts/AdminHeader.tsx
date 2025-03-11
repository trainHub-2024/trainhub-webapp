"use client"
import { ILayoutProps } from '@/types/global'
import React from 'react'

import { useSidebar } from '../ui/sidebar';

type IProps = ILayoutProps & {
    title: string;
    description: string;
    list: { type: string, href: string, label: string }[];
}
const AdminHeaderLayout = ({ children, list, title, description }: IProps) => {
    const { isMobile } = useSidebar()

    return (
        <div className="h-full w-full flex flex-col">
            <div className="w-full h-20 border-b flex justify-between items-center px-10">
                <div className="grid">
                    <h1 className="lg:text-2xl text-base font-bold text-primary">{title}</h1>
                    <p className='lg:text-sm text-xs text-muted-foreground'>{description}</p>
                </div>
            </div>
            <div className="w-full flex-1 p-4">{children}</div>
        </div>
    )
}

export default AdminHeaderLayout