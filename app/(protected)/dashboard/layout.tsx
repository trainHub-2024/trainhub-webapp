import { ILayoutProps } from '@/types/global';
import React from 'react'

import { Metadata } from 'next';
import { APP_NAME } from '@/lib/utils';
import AdminHeaderLayout from '@/components/layouts/AdminHeader';
import { DashboardProvider } from './context';

const TITLE = 'Dashboard';
const DESCRIPTION = 'View dashboard analytics and statistics for the system';
const LIST = [
    {
        type: "page",
        href: "",
        label: "Dashboard"
    },
]

export const metadata: Metadata = {
    title: `${TITLE} - ${APP_NAME}`,
    description: DESCRIPTION,
};

const Layout = ({ children }: ILayoutProps) => {
    return (
        <AdminHeaderLayout list={LIST} title={TITLE} description={DESCRIPTION}>
            <DashboardProvider>
                {children}
            </DashboardProvider>
        </AdminHeaderLayout>
    )
}

export default Layout