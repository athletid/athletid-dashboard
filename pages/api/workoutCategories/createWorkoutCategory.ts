import {validateJWT} from "@/lib/auth";
import {db} from "@/lib/db";
import {NextApiRequest, NextApiResponse} from "next";
import {parseCookies} from "nookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const cookies = parseCookies({req});
        const jwt = cookies["jwt_cookie_id"];
        const user = await validateJWT(jwt);

        const newWorkoutCategory = await db.workoutCategory.create({
            data: {
                name: req.body.name,
            },
        });

        res.json({data: newWorkoutCategory});
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({data: {message: "Internal Server Error"}});
    }
}
