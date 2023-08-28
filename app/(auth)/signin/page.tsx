'use client'
import React from 'react';
import AuthForm from "@/components/AuthForm";
import { useRouter } from 'next/navigation';

const Page = () => {

    const router = useRouter();

    return (
        <div>
            <AuthForm router={router}/>
        </div>
    );
};

export default Page;