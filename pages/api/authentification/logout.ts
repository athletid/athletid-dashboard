import {NextApiRequest, NextApiResponse} from "next";
import {serialize} from "cookie";

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        res.setHeader(
            "Set-Cookie",
            serialize(process.env.JWT_COOKIE ?? 'jwt_cookie_id', '', {
                httpOnly: true,
                path: "/",
                expires: new Date(0),
                secure: true
            })
        );
        res.status(201);
        res.redirect('/signin')
        res.end();
    } catch (e) {
        console.log("Error:", e); // Afficher l'erreur en cas de problème
        res.status(500).json({data: {message: "Internal Server Error"}});
    }
}