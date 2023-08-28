import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { comparePasswords, createJWT } from "@/lib/auth";
import {setCookie} from "cookies-next";

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const user = await db.user.findUnique({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            res.status(401);
            res.json({ error: "" });
            return;
        }

        const isUser = async () => {
            try {
                return await comparePasswords(req.body.password, user.password);
            }catch (e) {
                console.log(e)
            }
        }

        if (await isUser()) {
            const jwt = await createJWT(user);

            setCookie('jwt_cookie_id', jwt, { req, res, maxAge: 60 * 60 * 24 });

            if (user){
                setCookie('author_id', user.id, { req, res, maxAge: 60 * 60 * 24 });
            }

            res.status(201);
            res.end();
        } else {
            res.status(401);
            res.json({ error: "Invalid login" });
        }
    } else {
        res.status(402);
        res.end();
    }
}