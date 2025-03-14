'use client'
import { ILayoutProps } from '@/types/global'
import React, { useMemo } from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { DumbbellIcon, LayoutDashboardIcon, LogOutIcon, MessageCircle, User2Icon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { NavLinks } from '../ui-projects/navlinks'
import { logout } from '@/lib/actions/user.actions'

const AdminLayout = ({ children }: ILayoutProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const routes = useMemo(() => {
        return [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: LayoutDashboardIcon,
                isActive: pathname.includes("/dashboard"),
                items: [],
            },
            {
                title: "Sports",
                url: "/sports",
                icon: DumbbellIcon,
                isActive: pathname.includes("/sports"),
                items: [],
            },
            {
                title: "Users",
                url: "/users/trainers",
                icon: User2Icon,
                isActive: pathname.includes("/users"),
                items: [
                    {
                        title: "Trainers",
                        url: "/users/trainers"
                    },
                    {
                        title: "Trainees",
                        url: "/users/trainees"
                    },
                ],
            },
            {
                title: "Requests",
                url: "/requests/certifications",
                icon: MessageCircle,
                isActive: pathname.includes("/requests"),
                items: [
                    {
                        title: "trainers",
                        url: "/requests/certifications"
                    },
                ],
            },
        ]
    }, [pathname])


    return (
        <SidebarProvider>
            <Sidebar variant="inset">
                <SidebarHeader>
                    <h2 className="flex gap-0 justify-start items-center font-bold text-4xl">
                        <span className="text-primary">Train</span><span className="">Hub</span>
                    </h2>
                </SidebarHeader>
                <SidebarContent>
                    <NavLinks items={routes} />
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip={"logout"} isActive={false} onClick={async () => {
                                await logout();
                                router.push("/")
                            }}>
                                <LogOutIcon />
                                <span>Logout</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                    {/* <NavUser user={user as any} /> */}
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <SidebarTrigger className="lg:hidden fixed top-4 right-4" />
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

export default AdminLayout