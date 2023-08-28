'use client'
import React, {useEffect, useState} from 'react';
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import {Category, Section} from ".prisma/client";
import {createNewPost, createNewSections} from "@/lib/api";
import Card from "@/components/UI/Card";
import {useRouter} from "next/navigation";
import TextArea from "@/components/UI/TextArea";
import axios from "axios";
import Loading from "@/app/(dashboard)/posts/loading";
import {User} from "@prisma/client";
import {SectionsWithImgFile} from "@/types/SectionsProps";


const Page = () => {

    const router = useRouter()
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [duration, setDuration] = useState<number | undefined>();
    const [img, setImg] = useState<File>();
    const [isLoad, setIsLoad] = useState(false);
    const [categoryId, setCategoryId] = useState<string>();
    const [authorId, setAuthorId] = useState<string>();
    const [imgUrl, setImgUrl] = useState<string | undefined>();
    const [sectionImgUrl, setSectionImgUrl] = useState<string | undefined>()
    const [sections, setSections] = useState<SectionsWithImgFile[]>([{
        id: "",
        subTitle: "",
        paragraph: "",
        order: 1,
        imgFile: null
    }]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [authors, setAuthors] = useState<User[]>([]);

    console.log(img, sections)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImg(files[0]);
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (img) {
            try {
                const newPost = await createNewPost(name, categoryId, img, status, authorId, duration);
                const filteredSections = sections.filter((obj) => {
                    return obj.subTitle.trim() !== "";
                });

                // Sort the sections by order
                const sortedSections = filteredSections.sort((a, b) => a.order - b.order);

                await createNewSections(newPost.data.id, sortedSections);

                router.replace("/posts");
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleAddSection = () => {
        const lastSection = sections[sections.length - 1];
        const newOrder = lastSection ? lastSection.order + 1 : 1;

        if (!lastSection || (lastSection.subTitle.trim() !== "" && lastSection.paragraph.trim() !== "")) {
            const newSection: SectionsWithImgFile = {
                id: "",
                subTitle: "",
                paragraph: "",
                order: newOrder,
                imgFile : null
            };

            setSections(prevSections => [...prevSections, newSection]);
        }
    };

    const getCategories = async () => {
        try {
            const response = await axios.get("/api/categories");
            const data = response.data;
            if (data.length > 0) {
                setCategories(data);
                setCategoryId(data[0].id);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getAuthors = async () => {
        try {
            const response = await axios.get("/api/users");
            const data = response.data;
            if (data.length > 0) {
                setAuthors(data);
                setAuthorId(data[0].id);
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getCategories();
        getAuthors();
    }, [])

    useEffect(() => {
        if (categories && authors) {
            setIsLoad(true)
        }
    }, [categories, authors]);

    return (
        <div
            className="h-full overflow-y-auto pr-6 w-1/1"
        >
            <Card>
                <div className="text-4xl mb-6">New Post</div>
                {isLoad ?
                    <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                        <Input
                            placeholder="Name"
                            required={true}
                            className={'bg-white'}
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        />
                        <Input
                            placeholder="Duration"
                            required={true}
                            className={'bg-white'}
                            type={'number'}
                            value={duration !== undefined ? duration.toString() : ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseFloat(e.target.value);
                                if (!isNaN(value)) {
                                    setDuration(value);
                                } else {
                                    setDuration(undefined);
                                }
                            }}/>
                        {
                            isLoad ?
                                <select
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryId(e.target.value)}
                                    value={categoryId}
                                    required
                                    className={"p-4 text-lg rounded-small w-full !border-0"}
                                >
                                    {categories.map((category) => {
                                        return (
                                            <option key={category.id} value={category.id}>{category.name}
                                            </option>
                                        )
                                    })}
                                </select> :
                                <></>
                        } {
                        isLoad ?
                            <select
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAuthorId(e.target.value)}
                                value={authorId}
                                required
                                className={"p-4 text-lg rounded-small w-full !border-0"}
                            >
                                {authors.map((author) => {
                                    return (
                                        <option key={author.id}
                                                value={author.id}>{author.firstName + " " + author.lastName}
                                        </option>
                                    )
                                })}
                            </select> :
                            <></>
                    }


                        <select
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}
                            value={status}
                            required
                            className={"p-4 text-lg rounded-small w-full !border-0"}
                        >
                            <option value={"DRAFT"}>DRAFT
                            </option>
                            <option value="PUBLISHED">PUBLISHED
                            </option>
                        </select>


                        <div className={'text-xl !mt-12'}>Sections</div>

                        {sections.map((value, index) => {
                            return (
                                <div key={index}>

                                    <Input
                                        placeholder="Subtitle"
                                        value={sections[index].subTitle || ""}
                                        className={'mb-6'}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const newSections = [...sections];
                                            newSections[index].subTitle = e.target.value;
                                            setSections(newSections);
                                        }}
                                    />
                                    <TextArea
                                        placeholder="Paragraph"
                                        value={sections[index].paragraph || ""}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                            const newSections = [...sections];
                                            newSections[index].paragraph = e.target.value;
                                            setSections(newSections);
                                        }}
                                    />
                                    <Input
                                        type="file"
                                        value={sectionImgUrl}
                                        className="mb-6"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const newSections = [...sections];
                                            const files = e.target.files;
                                            if (files && files.length > 0) {
                                                newSections[index].imgFile = files[0];
                                            } else {
                                                newSections[index].imgFile = null;
                                            }
                                            setSections(newSections);
                                        }}
                                    />

                                </div>)
                        })}


                        <Button className={'!rounded-small !p-4'} intent={"secondary"} onClick={() => {
                            handleAddSection()
                        }}>Add</Button>

                        <Input required={true} className={'!p-1'} type={"file"} value={imgUrl}
                               onChange={handleFileChange}
                        />
                        <Button type="submit">Create</Button>
                    </form> : <Loading></Loading>
                }
            </Card>

        </div>
    );
};

export default Page;