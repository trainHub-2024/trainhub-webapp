import AdminLayout from '@/components/layouts/AdminLayout'
import React from 'react'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AdminLayout>
            {children}
        </AdminLayout>
    )
}

export default ProtectedLayout