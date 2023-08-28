'use client'
import React, {FC, useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {createNewWorkoutSections, editWorkout, editWorkoutSection, listWorkoutSections} from '@/lib/api';
import Card from '@/components/UI/Card';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Image from 'next/image';
import TextArea from '@/components/UI/TextArea';
import axios from 'axios';
import Loading from '@/app/(dashboard)/workouts/loading';
import {User, Workout, WorkoutCategory} from '@prisma/client';
import {SectionsWithImgFile} from '@/types/SectionsProps';

const EditWorkoutForm: FC<{
    workout: Omit<Workout, 'createdAt' | 'updatedAt'> & {
        createdAt: string;
        updatedAt: string;
    };
}> = ({workout}) => {
    const [sections, setSections] = useState<SectionsWithImgFile[]>([]);
    const [categories, setCategories] = useState<WorkoutCategory[]>([]);
    const [authors, setAuthors] = useState<User[]>([]);
    const [isLoad, setIsLoad] = useState(false);
    const [formState, setFormState] = useState({...workout});
    const [img, setImg] = useState<File>();
    const [qrCodeImg, setQrCodeImg] = useState<File>();
    const [newSections, setNewSections] = useState<SectionsWithImgFile[]>([]);


    const [asyncFields, setAsyncFields] = useState<string[]>([]);
    const [isReady, setIsReady] = useState(false);

    const getSections = useCallback(async () => {
        try {
            const sections = await listWorkoutSections(workout.id);
            return sections?.sort((a: any, b: any) => a.order - b.order);
        } catch (e) {
            console.log(e);
        }
    }, [workout.id]);

    const getCategories = async () => {
        try {
            const response = await axios.get('/api/workoutCategories');
            return response.data;
        } catch (e) {
            console.log(e);
        }
    };

    const getAuthors = async () => {
        try {
            return await axios.get('/api/users');
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getSections().then((sections) => {
            setSections(sections);
        });
    }, [getSections]);

    useEffect(() => {
        getCategories().then((data) => setCategories(data));
    }, []);

    useEffect(() => {
        getAuthors().then((response) => setAuthors(response?.data));
    }, []);

    useEffect(() => {
        setFormState({...workout});
    }, [workout]);

    useEffect(() => {
        if (asyncFields.every((field) => fieldLoaded(field))) {
            setIsReady(true);
        }
    }, [asyncFields]);

    useEffect(() => {
        const asyncFields = ['categories', 'sections', 'authors'];
        setAsyncFields(asyncFields);
    }, []);

    const fieldLoaded = useCallback(
        (field: string) => {
            switch (field) {
                case 'categories':
                    return categories.length > 0;
                case 'sections':
                    return sections.length > 0;
                case 'authors':
                    return authors.length > 0;
                default:
                    return false;
            }
        },
        [categories, sections, authors]
    );

    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImg(files[0]);
        }
    };

    const handleQrCodeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setQrCodeImg(files[0]);
        }
    };

    const handleSubmit = useCallback(
        async (e: any) => {
            e.preventDefault();

            try {
                await editWorkout(formState, img, qrCodeImg);

                for (const section of sections) {
                    await editWorkoutSection(section);
                }

                await createNewWorkoutSections(workout.id, newSections)

                router.replace('/workouts');
            } catch (error) {
                console.log(error);
            } finally {
                setFormState({...formState});
            }
        },
        [formState, img, qrCodeImg, sections]
    );

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const duration = parseFloat(e.target.value);
        setFormState((prevState) => ({
            ...prevState,
            duration: !isNaN(duration) ? duration : 0,
        }));
    };

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

    return (
        <Card>
            <div className="text-4xl mb-6">Edit workout</div>
            {isReady ? (
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
                                workoutCategoryId: e.target.value
                            }))}
                            value={formState.workoutCategoryId}
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
                        <select
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    difficulty: e.target.value,
                                }))
                            }
                            value={formState.difficulty}
                            className={"p-4 text-lg rounded-small w-full !border-0"}
                        >
                            <option value={"medium"}>Medium
                            </option>
                            <option value="hard">Hard
                            </option>
                        </select>

                        <div className={'text-xl !mt-12'}>Sections</div>

                        {sections?.map((value, index) => {
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
                                            <Image alt={""} sizes={"60vw"} fill src={value.img}
                                                   className={"object-cover"}/>
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
                                            <Image alt={""} sizes={"60vw"} fill src={value.img}
                                                   className={"object-cover"}/>
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

                        <div className={'text-xl'}>Workout Image</div>

                        <div className={"my-6 h-[200px] w-[400px] relative"}>
                            <Image alt={""} sizes={"60vw"} fill className={'object-cover'}
                                   src={formState.img ?? '/placeholder.png'}/>
                        </div>
                        <Input className={'!p-1'} type={"file"} value={undefined}
                               onChange={handleFileChange}
                        />

                        <div className={'text-xl'}>Qr Code Image</div>

                        <div className={"my-6 h-[200px] w-[400px] relative"}>
                            <Image alt={""} sizes={"60vw"} fill className={'object-cover'}
                                   src={formState.qrCodeImg ?? '/placeholder.png'}/>
                        </div>
                        <Input className={'!p-1'} type={"file"} value={undefined}
                               onChange={handleQrCodeFileChange}
                        />
                        <Button type="submit">Update</Button>
                    </form>
                </div>
            ) : (
                <Loading/>
            )}
        </Card>
    );
};

export default EditWorkoutForm;
