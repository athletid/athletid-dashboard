import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const workouts = await db.workout.findMany();

    if (workouts) {
        res.json(workouts)
    } else {
        res.status(401);
        res.json({error: "No posts"});
    }
}