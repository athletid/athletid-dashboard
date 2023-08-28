import React, {Suspense} from 'react';
import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import {delay} from "@/lib/async";
import {getUserFromCookie} from "@/lib/auth";
import {cookies} from "next/headers";
import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";


const getData = async () => {
    await delay(2000)
    const user = await getUserFromCookie(cookies())

    const posts = await db.post.findMany({
        where: {
            authorId: user?.id,
        }
    })

    return {posts}
}

async function Page() {

    const {posts} = await getData()

    return (
        <div className="h-full">
            <div className=" h-full  items-stretch justify-center">
                <div className="flex-1 grow flex">
                    <Suspense fallback={<GreetingsSkeleton/>}>
                        {/* @ts-expect-error Server Component */}
                        <Greetings/>
                    </Suspense>
                </div>
                <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
                    <div className="w-1/3 p-3">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;