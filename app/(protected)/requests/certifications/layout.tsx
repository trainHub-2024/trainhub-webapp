import { ILayoutProps } from '@/types/global';
import React from 'react'

import { Metadata } from 'next';
import { APP_NAME } from '@/lib/utils';
import AdminHeaderLayout from '@/components/layouts/AdminHeader';

const TITLE = 'Requests';
const DESCRIPTION = 'View and manage requests for approval of certificates and notices in the system';
const LIST = [
    {
        type: "page",
        href: "",
        label: "Requests"
    },
]

export const metadata: Metadata = {
    title: `${TITLE} - ${APP_NAME}`,
    description: DESCRIPTION,
};

const Layout = ({ children }: ILayoutProps) => {
    return (
        <AdminHeaderLayout list={LIST} title={TITLE} description={DESCRIPTION}>
            {children}
        </AdminHeaderLayout>
    )
}

export default Layout