import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const workoutSections = await db.workoutSection.findMany();

    if (workoutSections) {
        res.json(workoutSections)
    } else {
        res.status(401);
        res.json({error: "No posts"});
    }
}