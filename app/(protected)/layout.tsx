import AdminLayout from '@/components/layouts/AdminLayout'
import GlobalProvider from '@/providers/global-provider'
import React from 'react'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <GlobalProvider>
            <AdminLayout>
                {children}
            </AdminLayout>
        </GlobalProvider>
    )
}

export default ProtectedLayout