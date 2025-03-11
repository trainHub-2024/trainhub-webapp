'use client'
import { getCurrentUser } from "@/lib/actions/user.actions";
import { useAppwrite } from "@/lib/useAppwrite";
import { User } from "@/types/appwrite.types";
import React, { createContext, useContext, ReactNode } from "react";


interface GlobalContextType {
    isLogged: boolean;
    user: User | null;
    loading: boolean;
    refetch: (d?: any) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const {
        data: user,
        loading,
        refetch,
    } = useAppwrite({
        fn: getCurrentUser,
    });

    const isLogged = !!user;

    return (
        <GlobalContext.Provider
            value={{
                isLogged,
                user,
                loading,
                refetch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);
    if (!context)
        throw new Error("useGlobalContext must be used within a GlobalProvider");

    return context;
};

export default GlobalProvider;