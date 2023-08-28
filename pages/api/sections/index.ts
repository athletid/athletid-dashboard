import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const sections = await db.section.findMany();

    if (sections) {
        res.json(sections)
    } else {
        res.status(401);
        res.json({error: "No posts"});
    }
}