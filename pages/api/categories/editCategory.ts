import { db } from "@/lib/db";
import {NextApiRequest, NextApiResponse} from "next";
import slugify from "slugify";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await db.category.update({
            where: {
                id: req.body.id
            },
            data: {
                name: req.body.name,
            },
        });

        res.json({data: {message: "ok"}});
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({data: {message: "Internal Server Error"}});
    }
}
