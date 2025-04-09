"use client"
import { subDays } from "date-fns"
import { createContext, ReactNode, useContext, useState } from "react"

export type DateRangeType = {
    from: Date
    to: Date
}

type ShortcutDateType = "7Days" | "1Month" | "3Month"

type DashboardContextProps = {
    selectedDate: DateRangeType;
    setSelectedDate: (date: DateRangeType) => void;

    shortcutDate: ShortcutDateType;
    setShortcutDate: (date: ShortcutDateType) => void;
}

const DashboardContext = createContext<DashboardContextProps>({
    selectedDate: { from: subDays(new Date(), 7), to: new Date() },
    setSelectedDate: (d: DateRangeType) => { },

    shortcutDate: "7Days",
    setShortcutDate: (d: ShortcutDateType) => { }
})

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const [selectedDate, setSelectedDate] = useState<DateRangeType>({ from: subDays(new Date(), 7), to: new Date() })
    const [shortcutDate, setShortcutDate] = useState<ShortcutDateType>("7Days");

    return (
        <DashboardContext.Provider value={{ selectedDate, setSelectedDate, shortcutDate, setShortcutDate }}>
            {children}
        </DashboardContext.Provider>
    )
}

export const useDashboardContext = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("useDashboardContext must be used within a DashboardProvider");
    }
    return context;
};