import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";
import {Category, Post} from ".prisma/client";
import {User} from "@prisma/client";

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const users: User[] = await db.user.findMany();

    if (users) {
        const usersWithoutPassword = users.map(({ password, ...rest }) => rest);
        res.json(usersWithoutPassword)
    } else {
        res.status(401);
        res.json({error: "No categories"});
    }
}