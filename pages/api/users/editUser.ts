import { db } from "@/lib/db";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await db.user.update({
            where: {
                id: req.body.id
            },
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                img: req.body.imageUrl ? req.body.imageUrl : req.body.img ,
            },
        });

        res.json({data: {message: "ok"}});
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({data: {message: "Internal Server Error"}});
    }
}
