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


            const posts = await db.post.findMany({
                where: {
                    name: {
                        contains: query.toLowerCase(),
                    }
                }
            })

            if (posts){
                res.status(200).json({posts})
            }
        } catch (e) {
            res.status(500).end();
        }
    }

}