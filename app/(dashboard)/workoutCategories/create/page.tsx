'use client'
import React, {useState} from 'react';
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import {createNewCategory, createNewWorkoutCategory} from "@/lib/api";
import Card from "@/components/UI/Card";
import {useRouter} from "next/navigation";

const Page = () => {

    const router = useRouter()

    const [name, setName] = useState("");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name != "") {
            try {
                await createNewWorkoutCategory(name);
                router.replace("/workoutCategories")
            } catch (error) {
                console.error(error)
            }
        }
    };

    return (
        <div
            className="h-full overflow-y-auto pr-6 w-1/1"
        >
            <Card>
                <div className="text-4xl mb-6">New Workout Category</div>
                <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                    <Input
                        placeholder="Name"
                        className={'bg-white'}
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                    <Button type="submit">Create</Button>
                </form>
            </Card>

        </div>
    );
};

export default Page;