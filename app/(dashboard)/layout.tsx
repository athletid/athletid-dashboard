import React, {ReactNode} from "react";
import '@/styles/global.css';
import Navbar from "@/components/Navbar/Navbar";
import {delay} from "@/lib/async";
import {getUserFromCookie} from "@/lib/auth";
import {cookies} from "next/headers";

const getData = async () => {
    await delay(4000)
    return await getUserFromCookie(cookies())
}

async function DashboardRootLayout({children}: { children: ReactNode }) {


    const user= await getData();

    if (!user){
        return <div>User not found</div>;
    }

    const { createdAt: createdDate, updatedAt: updatedDate, ...rest } = user;
    const createdAt = createdDate.toISOString();
    const updatedAt = updatedDate.toISOString();

    return (
        <html lang={"en"}>
        <head/>
        <body>
        <div className={"relative max-w-[350px] md:max-w-[1170px] mx-auto px-4 py-xl md:py-2xl h-full"}>
            <Navbar user={{...rest, createdAt, updatedAt}}/>
            {children}
        </div>
        </body>
        </html>
    );
}

export default DashboardRootLayout;
