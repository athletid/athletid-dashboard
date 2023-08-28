'use client'
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Category, Post} from ".prisma/client";
import {useRouter} from "next/navigation";
import {createNewSections, editPost, editSection, listSections} from "@/lib/api";
import Card from "@/components/UI/Card";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Image from 'next/image'
import TextArea from "@/components/UI/TextArea";
import axios from "axios";
import Loading from "@/app/(dashboard)/posts/loading";
import {User} from "@prisma/client";
import {SectionsWithImgFile} from "@/types/SectionsProps";

const EditPostForm: FC<{
    post: Omit<Post, "createdAt" | "updatedAt"> & {
        createdAt: string;
        updatedAt: string;
    };
}> = ({post}) => {


    const [sections, setSections] = useState<SectionsWithImgFile[]>([]);
    const [newSections, setNewSections] = useState<SectionsWithImgFile[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [authors, setAuhtors] = useState<User[]>([]);
    const [isLoad, setIsLoad] = useState(false);
    const [formState, setFormState] = useState({...post})
    const [img, setImg] = useState<File>();


    const getSections = useCallback(async () => {
        try {
            const sections = await listSections(post.id);
            return sections?.sort((a: any, b: any) => a.order - b.order);
        } catch (e) {
            console.log(e)
        }
    }, [post.id]);

    const getCategories = async () => {
        try {
            return await axios.get("/api/categories")
        } catch (e) {
            console.log(e)
        }
    }

    const getAuthors = async () => {
        try {
            return await axios.get("/api/users")
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        getSections().then((sections) => {
            setSections(sections)
        })
    }, [getSections])

    useEffect(() => {
        getCategories().then((response) => setCategories(response?.data))
    }, [])

    useEffect(() => {
        getAuthors().then((response) => setAuhtors(response?.data))
    }, [])

    useEffect(() => {
        setFormState({...post})
    }, [post])

    useEffect(() => {
        if (categories && sections) {
            setIsLoad(true)
        }
    }, [categories, sections])


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
            await editPost(formState, img)
            for (const section of sections) {
                await editSection(section);
            }
            await createNewSections(formState.id, newSections)
            router.replace("/posts")
        } catch (e) {
            console.log(e)
        } finally {
            setFormState({...formState})
        }
    }, [formState, img, newSections, router, sections])

    const handleAddSection = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const newOrder = sections.length + newSections.length + 1;

        if (newSections.length === 0 || (newSections[newSections.length - 1].subTitle.trim() !== "" && newSections[newSections.length - 1].paragraph.trim() !== "")) {
            const newSection: SectionsWithImgFile = {
                id: "",
                subTitle: "",
                paragraph: "",
                order: newOrder,
                imgFile: null
            };

            setNewSections(prevSections => [...prevSections, newSection]);
        }
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const duration = parseFloat(e.target.value);
        setFormState((prevState) => ({
            ...prevState,
            duration: !isNaN(duration) ? duration : 0,
        }));
    };


    return (
        <Card>
            <div className="text-4xl mb-6">Edit Post</div>
            {isLoad ?
                <div>
                    <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                        <Input
                            placeholder="Name"
                            className={'bg-white'}
                            value={formState.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    name: e.target.value,
                                }))
                            }
                        />
                        <Input
                            placeholder="Duration"
                            className={'bg-white'}
                            type={"number"}
                            value={formState.duration !== undefined ? formState.duration.toString() : ''}
                            onChange={handleDurationChange}
                        />
                        <select
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormState((prevState) => ({
                                ...prevState,
                                categoryId: e.target.value
                            }))}
                            value={formState.categoryId}
                            className={"p-4 text-lg rounded-small w-full !border-0"}
                        >
                            {categories?.map((category) => {
                                return (
                                    <option key={category.id} value={category.id}>{category.name}
                                    </option>
                                )
                            })}
                        </select>
                        <select
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormState((prevState) => ({
                                ...prevState,
                                authorId: e.target.value
                            }))}
                            value={formState.authorId}
                            className={"p-4 text-lg rounded-small w-full !border-0"}
                        >
                            {authors.map((author) => {
                                return (
                                    <option key={author.id} value={author.id}>{author.firstName + " " + author.lastName}
                                    </option>
                                )
                            })}
                        </select>


                        <select
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    status: e.target.value,
                                }))
                            }
                            value={formState.status}
                            className={"p-4 text-lg rounded-small w-full !border-0"}
                        >
                            <option value={"DRAFT"}>DRAFT
                            </option>
                            <option value="PUBLISHED">PUBLISHED
                            </option>
                        </select>

                        <div className={'text-xl !mt-12'}>Sections</div>

                        {sections?.map((value) => {
                            return (
                                <div key={value.id}>
                                    <Input
                                        placeholder="Subtitle"
                                        value={value.subTitle || ""}
                                        className={'mb-6'}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const index = sections.findIndex((s) => s.id === value.id);
                                            const newSections = [...sections];
                                            newSections[index] = {
                                                ...newSections[index],
                                                subTitle: e.target.value,
                                            };
                                            setSections(newSections);
                                        }}
                                    />
                                    <TextArea
                                        placeholder="Paragraph"
                                        value={value.paragraph || ""}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                            const index = sections.findIndex((s) => s.id === value.id);
                                            const newSections = [...sections];
                                            newSections[index] = {
                                                ...newSections[index],
                                                paragraph: e.target.value,
                                            };
                                            setSections(newSections);
                                        }}
                                    />
                                    {value.img && (
                                        <div className={"my-6 h-[200px] w-[400px] relative"}>
                                            <Image alt={""} sizes={"60vw"} fill src={value.img} className={"object-cover"}/>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="mb-6"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = e.target.files;
                                            if (files && files.length > 0) {
                                                const index = sections.findIndex((s) => s.id === value.id);
                                                const newSections = [...sections];
                                                newSections[index] = {
                                                    ...newSections[index],
                                                    img: value.img,
                                                    imgFile: files[0],
                                                };
                                                setSections(newSections);
                                            }
                                        }}
                                    />
                                </div>
                            );
                        })}
                        {newSections?.map((value, index) => {
                            return (
                                <div key={value.id}>
                                    <Input
                                        placeholder="Subtitle"
                                        value={value.subTitle || ""}
                                        className={'mb-6'}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const newSectionsCopy = [...newSections];
                                            newSectionsCopy[index] = {
                                                ...newSectionsCopy[index],
                                                subTitle: e.target.value,
                                            };
                                            setNewSections(newSectionsCopy);
                                        }}
                                    />
                                    <TextArea
                                        placeholder="Paragraph"
                                        value={value.paragraph || ""}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                            const newSectionsCopy = [...newSections];
                                            newSectionsCopy[index] = {
                                                ...newSectionsCopy[index],
                                                paragraph: e.target.value,
                                            };
                                            setNewSections(newSectionsCopy);
                                        }}
                                    />
                                    {value.img && (
                                        <div className={"my-6 h-[200px] w-[400px] relative"}>
                                            <Image alt={""} sizes={"60vw"} fill src={value.img} className={"object-cover"}/>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="mb-6"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = e.target.files;
                                            if (files && files.length > 0) {
                                                const index = newSections.findIndex((s) => s.id === value.id);
                                                newSections[index] = {
                                                    ...newSections[index],
                                                    img: value.img,
                                                    imgFile: files[0],
                                                };
                                                setNewSections(newSections);
                                            }
                                        }}
                                    />
                                </div>
                            );
                        })}

                        <Button className={'!rounded-small !p-4'} intent={"secondary"} onClick={handleAddSection}>Add</Button>

                        <div className={"my-6 h-[200px] w-[400px] relative"}>
                            <Image alt={""} sizes={"60vw"} fill className={'object-cover'}
                                   src={formState.img ?? '/placeholder.png'}/>
                        </div>

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

export default EditPostForm;