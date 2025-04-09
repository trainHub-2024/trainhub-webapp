import React from 'react'
import { SessionCard } from './_components/sessions-count'
import { ActiveUsersCard } from './_components/active-users'
import RevenueChart from './_components/revenue-line'
import AnalyticsFilters from './_components/filters'
import UserCountChart from './_components/user-count'
import CompletedSessionCountCard from './_components/completed-session-count'
import SessionHistoryTable from './_components/session-history-table'
import AppealRequestCard from './_components/appeal-table'

const Dashboard = () => {
    return (
        <article className="size-full">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="col-span-4 grid grid-cols-4 gap-4">
                    <div className="col-span-2">
                        <AnalyticsFilters />
                    </div>
                    <SessionCard />
                    <ActiveUsersCard count={876} />
                </div>
                <div className="col-span-4 grid grid-cols-2 gap-4">
                    <UserCountChart />
                    <CompletedSessionCountCard />
                    <RevenueChart />
                    <AppealRequestCard />
                </div>
                <div className='col-span-4'>
                    <SessionHistoryTable />
                </div>
            </div>
        </article>
    )
}

export default Dashboard

