import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";
import {Category, Post} from ".prisma/client";

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const categories: Category[] = await db.category.findMany();

    if (categories) {
        res.json(categories)
    } else {
        res.status(401);
        res.json({error: "No categories"});
    }
}