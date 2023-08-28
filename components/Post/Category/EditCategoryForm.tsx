'use client'
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {Category} from ".prisma/client";
import {useRouter} from "next/navigation";
import {editCategory} from "@/lib/api";
import Card from "@/components/UI/Card";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Loading from "@/app/(dashboard)/categories/loading";


const EditCategoryForm: FC<{ category: Category }> = ({category}) => {


    const [formState, setFormState] = useState<Category>({id : "", name: ""});
    const [isLoad, setIsLoad] = useState(false);
    const router = useRouter();

    const handleSubmit = useCallback(async (e: any) => {
        e.preventDefault()

        try {
            await editCategory(formState)
            router.replace("/categories")
        } catch (e) {
            console.log(e)
        }
    }, [formState, router])

    useEffect(() => {
        if (category){
            setFormState({ ...category });
            setIsLoad(true)
        }
    }, [category]);



    return (
        <Card>
            <div className="text-4xl mb-6">Edit Category</div>
            {isLoad ?             <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
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