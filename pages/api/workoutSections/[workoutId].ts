import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const {workoutId} = req.query

    const workoutSections = await db.workoutSection.findMany({
        where: {
            workoutId:{
                equals: req.body.workoutId ? req.body.workoutId : workoutId?.toString()
            },
        },
    });

    if (workoutSections) {
        res.json(workoutSections)
        res.status(200)
    } else {
        res.status(401);
        res.json({error: "Invalid workoutId"});
    }
}