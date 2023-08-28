'use client'
import React, {FC, useCallback, useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {editUser} from "@/lib/api";
import Card from "@/components/UI/Card";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Image from 'next/image'
import Loading from "@/app/(dashboard)/posts/loading";
import {User} from "@prisma/client";

const EditUserForm: FC<{
    user: Omit<User, "createdAt" | "updatedAt"> & {
        createdAt: string;
        updatedAt: string;
    };
}> = ({user}) => {

    const [isLoad, setIsLoad] = useState(false);
    const [formState, setFormState] = useState({...user})
    const [img, setImg] = useState<File>();

    useEffect(() => {
        setFormState({...user})
    }, [user])


    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImg(files[0]);
        }
    };


    const handleSubmit = useCallback(async (e: any) => {
        e.preventDefault()

        try {
            await editUser(formState, img)
            router.replace("/home")
        } catch (e) {
            console.log(e)
        } finally {
            setFormState({...formState})
        }
    }, [formState, img, router])

    useEffect(() => {
        setFormState({...user});
        setIsLoad(true);
    }, [user]);


    return (
        <Card>
            <div className="text-4xl mb-6">Edit User</div>
            {isLoad ?
                <div>
                    <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                        <Input
                            placeholder="Firstname"
                            className={'bg-white'}
                            value={formState.firstName ?? ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    firstName: e.target.value,
                                }))
                            }
                        />
                        <Input
                            placeholder="Lastname"
                            className={'bg-white'}
                            value={formState.lastName ?? ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    lastName: e.target.value,
                                }))
                            }
                        />
                        <Input
                            placeholder="Email"
                            className={'bg-white'}
                            value={formState.email ?? ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    email: e.target.value,
                                }))
                            }
                        />


                        {formState.img && (
                            <Image alt={""} sizes={"60vw"} width={200} height={200}
                                   src={formState.img}/>
                        )}

                        <Input className={'!p-1'} type={"file"} value={undefined}
                               onChange={handleFileChange}
                        />
                        <Button type="submit">Update</Button>
                    </form>
                </div> : <Loading></Loading>
            }
        </Card>
    );
};

export default EditUserForm;