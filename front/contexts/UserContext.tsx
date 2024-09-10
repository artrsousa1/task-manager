'use client'

import { createContext, useState, useEffect } from "react";
import request from "@/app/utils/request";
import { settings } from "@/app/utils/settings";

export interface User {
    access?: string;
    email?: string;
    first_name?: string;
}

interface UserContextType {
    user: User;
    setUser: (user: User) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const UserContext = createContext({} as UserContextType);

export default function UserProvider({ children }:{children: React.ReactNode}){
    const [user, setUser] = useState<User>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        request.post('/auth/refresh', {} , settings)
        .then((res) => {
            const data = res.data;
            setUser(data.user);
            setLoading(false);
        }).catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }, [setUser, setLoading]);

    return (
        <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </UserContext.Provider>
    );
}