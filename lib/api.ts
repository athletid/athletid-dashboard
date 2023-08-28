import slugify from "slugify";
import axios from "axios";
import {SectionsWithImgFile} from "@/types/SectionsProps";


const fetcher = async ({url, method, body, json = true}: {
    url: string,
    method: string,
    body: object,
    json?: boolean
}) => {

    const res = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Api Error")
    }

    if (json) {
        return res.json()
    }

};


export const signin = async (user: Object) => {

    try {
        await fetcher({
            url: "/api/authentification/signin",
            method: "POST",
            body: user,
        })
    } catch (error) {
        console.log(error)
    }
}

export const logout = () => {

    return fetcher({
        url: "/api/authentification/logout",
        method: "POST",
        body: JSON.parse(JSON.stringify('user')),
    });
};


export const editUser = async (user: {
    firstName: string | null;
    lastName: string | null;
    createdAt: string;
    password: string;
    img: string | null;
    role: string;
    id: string;
    email: string;
    updatedAt: string
}, img: any) => {

    const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    };

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "ml_default");

    if (img) {
        const res = await axios.post("https://api.cloudinary.com/v1_1/ddjdkkktr/image/upload", formData, config)
        let imageUrl = res.data.secure_url

        const postWithNewImage = {...user, imageUrl}

        return fetcher({
            url: "/api/users/editUser",
            method: "POST",
            body: JSON.parse(JSON.stringify(postWithNewImage)),
        });
    }

    return fetcher({
        url: "/api/users/editUser",
        method: "POST",
        body: JSON.parse(JSON.stringify(user)),
    });

};


export const createNewPost = async (name: string, categoryId: string | undefined, img: File, status: string, authorId: string | undefined, duration: number | undefined) => {

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "ml_default");

    const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    };


    if (img) {
        const res = await axios.post("https://api.cloudinary.com/v1_1/ddjdkkktr/image/upload", formData, config);
        const imageUrl = res.data.secure_url;
        return await fetcher({
            url: "/api/posts/createPost",
            method: "POST",
            body: {
                name: name,
                categoryId: categoryId,
                duration: duration,
                img: imageUrl,
                status: status,
                slug: slugify(name.substring(0, name.length - 1)),
                authorId: authorId
            },
        })
    }

    return await fetcher({
        url: "/api/posts/createPost",
        method: "POST",
        body: {
            name: name,
            categoryId: categoryId,
            status: status,
            duration: duration,
            slug: slugify(name.substring(0, name.length - 1)),
            authorId: authorId
        },
    })


}

export const createNewWorkout = async (name: string, workoutCategoryId: string | undefined, img: File, qrCodeImg: File | undefined, status: string, authorId: string | undefined, difficulty: string | undefined, duration: number | undefined) => {

    const formData = new FormData();

    const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    };
    if (formData) {
        formData.append("file", img);
        formData.append("upload_preset", "ml_default");
    }

    const QRCodeFormData = new FormData();
    if (qrCodeImg) {
        QRCodeFormData.append("file", qrCodeImg);
        QRCodeFormData.append("upload_preset", "ml_default");
    }

    if (img && qrCodeImg) {
        const res = await axios.post("https://api.cloudinary.com/v1_1/ddjdkkktr/image/upload", formData, config);
        const imageUrl = res.data.secure_url;
        const qrCodeRes = await axios.post("https://api.cloudinary.com/v1_1/ddjdkkktr/image/upload", QRCodeFormData, config);
        const QrCodeImageUrl = qrCodeRes.data.secure_url;
        return await fetcher({
            url: "/api/workouts/createWorkout",
            method: "POST",
            body: {
                name: name,
                duration: duration,
                workoutCategoryId: workoutCategoryId,
                img: imageUrl,
                qrCodeImg: QrCodeImageUrl,
                status: status,
                difficulty: difficulty,
                slug: slugify(name),
                authorId: authorId
            },
        })
    } else if (qrCodeImg && !img) {
        const qrCodeRes = await axios.post("https://api.cloudinary.com/v1_1/ddjdkkktr/image/upload", QRCodeFormData, config);
        const QrCodeImageUrl = qrCodeRes.data.secure_url;
        return await fetcher({
            url: "/api/workouts/createWorkout",
            method: "POST",
            body: {
                name: name,
                duration: duration,
                workoutCategoryId: workoutCategoryId,
                qrCodeImg: QrCodeImageUrl,
                status: status,
                difficulty: difficulty,
                slug: slugify(name.substring(0, name.length - 1)),
                authorId: authorId
            },
        })
    } else if (!qrCodeImg && img) {
        const res = await axios.post("https://api.cloudinary.com/v1_1/ddjdkkktr/image/upload", formData, config);
        const imageUrl = res.data.secure_url;
        return await fetcher({
            url: "/api/workouts/createWorkout",
            method: "POST",
            body: {
                name: name,
                duration: duration,
                workoutCategoryId: workoutCategoryId,
                img: imageUrl,
                status: status,
                difficulty: difficulty,
                slug: slugify(name.substring(0, name.length - 1)),
                authorId: authorId
            },
        })
    } else {
        return await fetcher({
            url: "/api/workouts/createWorkout",
            method: "POST",
            body: {
                name: name,
                duration: duration,
                workoutCategoryId: workoutCategoryId,
                status: status,
                difficulty: difficulty,
                slug: slugify(name.substring(0, name.length - 1)),
                authorId: authorId
            },
        })
    }


}

export const editPost = async (post: {
    createdAt: string;
    img: string | null;
    name: string;
    id: string;
    authorId: string;
    slug: string;
    categoryId: string;
    status: string;
    updatedAt: string,
    duration: number
}, img: any) => {

    const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    };

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "ml_default");

    if (img) {
        const res = await axios.post("https://api.cloudinary.com/v1_1/ddjdkkktr/image/upload", formData, config)
        let imageUrl = res.data.secure_url

        const postWithNewImage = {...post, imageUrl}

        return fetcher({
            url: "/api/posts/editPost",
            method: "POST",
            body: JSON.parse(JSON.stringify(postWithNewImage)),
        });
    }

    return fetcher({
        url: "/api/posts/editPost",
        method: "POST",
        body: JSON.parse(JSON.stringify(post)),
    });

};

export const editWorkout = async (
    workout: {
        createdAt: string;
        img: string | null;
        name: string;
        id: string;
        authorId: string;
        slug: string;
        workoutCategoryId: string;
        status: string;
        updatedAt: string;
        difficulty: string;
        duration: number | undefined;
        qrCodeImg: string | null;
    },
    img: File | undefined,
    qrCodeImg: File | undefined
) => {
    const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    };

    if (img) {
        const formData = new FormData();
        formData.append('file', img);
        formData.append('upload_preset', 'ml_default');

        const res = await axios.post(
            'https://api.cloudinary.com/v1_1/ddjdkkktr/image/upload',
            formData,
            config
        );
        const imageUrl = res.data.secure_url;

        workout = {
            ...workout,
            img: imageUrl,
        };
    }

    if (qrCodeImg) {
        const qrCodeFormData = new FormData();
        qrCodeFormData.append('file', qrCodeImg);
        qrCodeFormData.append('upload_preset', 'ml_default');

        const qrCodeRes = await axios.post(
            'https://api.cloudinary.com/v1_1/ddjdkkktr/image/upload',
            qrCodeFormData,
            config
        );
        const qrCodeImageUrl = qrCodeRes.data.secure_url;

        workout = {
            ...workout,
            qrCodeImg: qrCodeImageUrl,
        };
    }

    return fetcher({
        url: '/api/workouts/editWorkout',
        method: 'POST',
        body: JSON.parse(JSON.stringify(workout)),
    });
};


export const createNewCategory = async (name: string) => {

    return await fetcher({
        url: "/api/categories/createCategory",
        method: "POST",
        body: {
            name: name,
        },
    })
}

export const createNewWorkoutCategory = async (name: string) => {

    return await fetcher({
        url: "/api/workoutCategories/createWorkoutCategory",
        method: "POST",
        body: {
            name: name,
        },
    })
}


export const editCategory = async (category: {
    name: string;
}) => {

    return fetcher({
        url: "/api/categories/editCategory",
        method: "POST",
        body: JSON.parse(JSON.stringify(category)),
    });
};

export const editWorkoutCategory = async (workoutCategory: {
    name: string;
}) => {

    return fetcher({
        url: "/api/workoutCategories/editWorkoutCategory",
        method: "POST",
        body: JSON.parse(JSON.stringify(workoutCategory)),
    });
};

export const deleteCategory = (categoryId: string) => {

    return fetcher({
        url: "/api/categories/deleteCategory",
        method: "POST",
        body: {categoryId},
    });
};

export const deleteWorkoutCategory = (workoutCategoryId: string) => {

    return fetcher({
        url: "/api/workoutCategories/deleteWorkoutCategory",
        method: "POST",
        body: {workoutCategoryId},
    });
};

export const createNewSections = async (postId: string, sections: SectionsWithImgFile[]) => {

    try {
        return Promise.all(sections.map(async section => {

            const img = section.imgFile;

            const config = {
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            };

            const formData = new FormData();
            formData.append("file", img ? img : "");
            formData.append("upload_preset", "ml_default");

            if (img !== null) {
                const res = await axios.post("https://api.cloudinary.com/v1_1/ddjdkkktr/image/upload", formData, config)
                let imageUrl = res.data.secure_url
                return fetcher({
                    url: "/api/sections/createSection",
                    method: "POST",
                    body: {
                        postId: postId,
                        subTitle: section.subTitle,
                        paragraph: section.paragraph,
                        order: section.order,
                        img: imageUrl
                    },
                });
            }

            return fetcher({
                url: "/api/sections/createSection",
                method: "POST",
                body: {
                    postId: postId,
                    subTitle: section.subTitle,
                    paragraph: section.paragraph,
                    order: section.order,
                },
            });


        }))

    } catch (e) {
        console.log(e)
    }
}

export const createNewWorkoutSections = async (workoutId: string, sections: SectionsWithImgFile[]) => {

    try {
        return Promise.all(sections.map(async section => {

            const img = section.imgFile;

            const config = {
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            };

            const formData = new FormData();
            formData.append("file", img ? img : "");
            formData.append("upload_preset", "ml_default");

            if (img !== null) {
                const res = await axios.post("https://api.cloudinary.com/v1_1/ddjdkkktr/image/upload", formData, config)
                let imageUrl = res.data.secure_url

                return fetcher({
                    url: "/api/workoutSections/createWorkoutSection",
                    method: "POST",
                    body: {
                        workoutId: workoutId,
                        subTitle: section.subTitle,
                        paragraph: section.paragraph,
                        order: section.order,
                        img: imageUrl
                    },
                });
            } else {
                return fetcher({
                    url: "/api/workoutSections/createWorkoutSection",
                    method: "POST",
                    body: {
                        workoutId: workoutId,
                        subTitle: section.subTitle,
                        paragraph: section.paragraph,
                        order: section.order,
                    },
                });
            }


        }))

    } catch (e) {
        console.log(e)
    }
}

export const listSections = (postId: string) => {

    return fetcher({
        url: "/api/sections/[postId]",
        method: "POST",
        body: {postId},
    });
};

export const listWorkoutSections = (workoutId: string) => {

    return fetcher({
        url: "/api/workoutSections/[workoutId]",
        method: "POST",
        body: {workoutId},
    });
};


export const editSection = async (section: SectionsWithImgFile) => {
    const img = section.imgFile;

    if (img) {
        const config = {
            headers: {'Content-Type': 'multipart/form-data'},
        };

        const formData = new FormData();
        formData.append("file", img);
        formData.append("upload_preset", "ml_default");

        const res = await axios.post("https://api.cloudinary.com/v1_1/ddjdkkktr/image/upload", formData, config);
        const imageUrl = res.data.secure_url;

        return axios.post("/api/sections/editSection", {...section, imageUrl});
    } else {
        return axios.post("/api/sections/editSection", section);
    }
};

export const editWorkoutSection = async (section: SectionsWithImgFile) => {
    const img = section.imgFile;

    if (img) {
        const config = {
            headers: {'Content-Type': 'multipart/form-data'},
        };

        const formData = new FormData();
        formData.append("file", img);
        formData.append("upload_preset", "ml_default");

        const res = await axios.post("https://api.cloudinary.com/v1_1/ddjdkkktr/image/upload", formData, config);
        const imageUrl = res.data.secure_url;

        return axios.post("/api/workoutSections/editWorkoutSection", {...section, imageUrl});
    } else {
        return axios.post("/api/workoutSections/editWorkoutSection", section);
    }
};


export const deletePost = (postId: string) => {

    return fetcher({
        url: "/api/posts/deletePost",
        method: "POST",
        body: {postId},
    });
};

export const deleteWorkout = (workoutId: string) => {

    return fetcher({
        url: "/api/workouts/deleteWorkout",
        method: "POST",
        body: {workoutId},
    });
};

