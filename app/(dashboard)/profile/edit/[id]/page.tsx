import React from 'react';
import EditUserForm from "@/components/User/EditUserForm";
import {db} from "@/lib/db";
import {User} from "@prisma/client";

const getData = async (id: any) => {
    const user: User | null = await db.user.findFirst({
        where: {id},
    });

    return user;
};

const Page = async ({params}: { params: { id: string } }) => {

    const user = await getData(params.id)

    if (user !== null) {
        const {createdAt: createdDate, updatedAt: updatedDate, ...rest} = user;
        const createdAt = createdDate.toISOString();
        const updatedAt = updatedDate.toISOString();


        return (
            <div>
                <EditUserForm user={{...user, createdAt, updatedAt}}/>
            </div>

        );
    }

};

export default Page;