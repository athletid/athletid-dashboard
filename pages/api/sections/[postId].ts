import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const {postId} = req.query

    const sections = await db.section.findMany({
        where: {
            postId:{
                equals: req.body.postId ? req.body.postId : postId?.toString()
            },
        },
    });

    if (sections) {
        res.json(sections)
        res.status(200)
    } else {
        res.status(401);
        res.json({error: "Invalid postId"});
    }
}