import React from 'react';
import {delay} from "@/lib/async";
import {db} from "@/lib/db";
import WorkoutCard from "@/components/Workout/WorkoutCard";
import Link from "next/link";
import clsx from "clsx";

const getData = async () => {
    await delay(2000)

    const workouts = await db.workout.findMany({})
    return {workouts}
}

async function Page() {

    const {workouts} = await getData()

    return (
        <div>
            <div className={'flex justify-between items-center mb-medium md:mb-mediumXl'}>
                <h1 className={''}>All workouts</h1>
                <Link href={"/workouts/create"} className={clsx('!mr-0 !mt-0', "duration-300",
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
                {workouts.map(workout => {

                    const {createdAt: createdDate, updatedAt: updatedDate, ...rest} = workout;
                    const createdAt = createdDate.toISOString();
                    const updatedAt = updatedDate.toISOString();

                    return (
                        <WorkoutCard key={workout.id} workout={{...rest, createdAt, updatedAt}}/>
                    )
                })}
            </div>
        </div>
    );
};

export default Page;