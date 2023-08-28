import React from 'react';
import {delay} from "@/lib/async";
import {db} from "@/lib/db";
import PostCard from "@/components/Post/PostCard";
import Link from "next/link";
import clsx from "clsx";
import CategoryCard from "@/components/Post/Category/CategoryCard";

const getData = async () => {
    await delay(2000)

    const categories = await db.category.findMany({})
    return {categories}
}

async function Page() {

    const {categories} = await getData()

    return (
        <div>
            <div className={'flex justify-between items-center mb-medium md:mb-mediumXl'}>
                <h1 className={''}>All categories</h1>
                <Link href={"/categories/create"} className={clsx('!mr-0 !mt-0', "duration-300",
                    "px-6",
                    "py-3",
                    "z-0",
                    "md:px-8",
                    "transition",
                    "md:py-4",
                    "!rounded-full",
                    "border",
                    "w-fit",
                    "!text-base", "bg-timeRed",
                    "hover:bg-timeRedHover",
                    "circle-boxShadow",
                    "!border-0",
                    "!text-white",)}>Add +</Link>
            </div>
            <div className={'space-y-4'}>
                {categories.map(category => {
                    return (
                        <CategoryCard key={category.id} category={category}/>
                    )
                })}
            </div>
        </div>
    );
};

export default Page;