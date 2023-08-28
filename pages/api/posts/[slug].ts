import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const {slug} = req.query

    const post = await db.post.findFirst({
        where: {
            slug: slug?.toString(),
        },
    });

    if (post) {
        res.json(post)
    } else {
        res.status(401);
        res.json({error: "Invalid postId"});
    }
}