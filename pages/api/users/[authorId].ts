import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const {authorId} = req.query

    const user = await db.user.findFirst({
        where: {
            id: authorId?.toString()
        },
    });

    if (user) {
        res.json(user)
    } else {
        res.status(401);
        res.json({error: "Invalid userId"});
    }
}