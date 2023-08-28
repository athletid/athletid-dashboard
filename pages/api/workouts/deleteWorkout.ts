import {db} from "@/lib/db";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        await db.workoutSection.deleteMany({
            where: {
                workoutId: req.body.workoutId
            }
        })

        // Créer un nouveau post avec l'utilisateur en tant qu'auteur
        await db.workout.delete({
            where: {
                id: req.body.workoutId
            }
        });

        res.json({data: {message: "ok"}});
    } catch (error) {
        console.log("Error:", error); // Afficher l'erreur en cas de problème
        res.status(500).json({data: {message: "Internal Server Error"}});
    }
}
