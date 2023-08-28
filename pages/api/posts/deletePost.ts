import {db} from "@/lib/db";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        await db.section.deleteMany({
            where: {
                postId: req.body.postId
            }
        })

        // Créer un nouveau post avec l'utilisateur en tant qu'auteur
        await db.post.delete({
            where: {
                id: req.body.postId
            }
        });

        res.json({data: {message: "ok"}});
    } catch (error) {
        console.log("Error:", error); // Afficher l'erreur en cas de problème
        res.status(500).json({data: {message: "Internal Server Error"}});
    }
}
