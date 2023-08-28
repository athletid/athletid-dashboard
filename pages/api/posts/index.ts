import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const posts = await db.post.findMany();

    if (posts) {
        res.json(posts)
    } else {
        res.status(401);
        res.json({error: "No posts"});
    }
}