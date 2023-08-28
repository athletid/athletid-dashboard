import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const {slug} = req.query

    const workout = await db.workout.findFirst({
        where: {
            slug: String(slug),
        },
    });

    if (workout) {
        res.json(workout)
    } else {
        res.status(401);
        res.json({error: "Invalid workout slug"});
    }
}