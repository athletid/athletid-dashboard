'use client'
import React, {FC, useCallback, useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {editCategory, editWorkoutCategory} from "@/lib/api";
import Card from "@/components/UI/Card";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Loading from "@/app/(dashboard)/categories/loading";
import {WorkoutCategory} from "@prisma/client";


const EditCategoryForm: FC<{ workoutCategory: WorkoutCategory }> = ({workoutCategory}) => {


    const [formState, setFormState] = useState<WorkoutCategory>({id: "", name: ""});
    const [isLoad, setIsLoad] = useState(false);
    const router = useRouter();

    const handleSubmit = useCallback(async (e: any) => {
        e.preventDefault()

        try {
            await editWorkoutCategory(formState)
            router.replace("/workoutCategories")
        } catch (e) {
            console.log(e)
        }
    }, [formState, router])

    useEffect(() => {
        if (workoutCategory) {
            setFormState({...workoutCategory});
            setIsLoad(true)
        }
    }, [workoutCategory]);


    return (
        <Card>
            <div className="text-4xl mb-6">Edit Workout Category</div>
            {isLoad ? <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                <Input
                    placeholder="Name"
                    className={'bg-white'}
                    defaultValue={formState.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        isLoad &&
                        setFormState((prevState) => ({
                            ...prevState,
                            name: e.target.value,
                        }))
                    }
                />
                <Button type="submit">Update</Button>
            </form> : <Loading></Loading>}
        </Card>
    );
};

export default EditCategoryForm;