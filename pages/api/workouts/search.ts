import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";
import NextCors from 'nextjs-cors';
import Cors from 'cors'

const cors = Cors({
    methods: ['GET', 'HEAD'],
})


function runMiddleware(req:NextApiRequest, res:NextApiResponse, fn:any) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result:any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await runMiddleware(req, res, cors);

    if (req.method === "GET") {
        try {

            const {q: query} = req.query;

            if (typeof query !== "string") {
                throw new Error("Invalid request");
            }

            const workouts = await db.workout.findMany({
                where: {
                    name: {
                        contains: query.toLowerCase(),
                    }
                }
            })
            if (workouts.length > 0) {
                res.status(200).json({ workouts });
            } else {
                res.status(404).json({ message: "No workouts found" });
            }
        } catch (e) {
            res.status(500).end();
        }
    }

}