import AdminLayout from '@/components/layouts/AdminLayout'
import QueryProvider from '@/components/query-provider'
import GlobalProvider from '@/providers/global-provider'
import React from 'react'


const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <GlobalProvider>
            <QueryProvider>
                <AdminLayout>
                    {children}
                </AdminLayout>
            </QueryProvider>
        </GlobalProvider>
    )
}

export default ProtectedLayout