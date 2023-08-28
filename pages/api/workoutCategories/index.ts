import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";
import {Category, Post} from ".prisma/client";

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const workoutCategories: Category[] = await db.workoutCategory.findMany();

    if (workoutCategories) {
        res.json(workoutCategories)
    } else {
        res.status(401);
        res.json({error: "No categories"});
    }
}