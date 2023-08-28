import {db} from "@/lib/db";
import {NextApiRequest, NextApiResponse} from "next";
import {getCookie} from "cookies-next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const author = getCookie('author_id', {req, res});

        const lastChar = req.body.slug.at(-1);
        let slug = ""

        if (lastChar === "." || lastChar === "/" || lastChar === "?"|| lastChar === "!" || lastChar === "/"   )
        {
            slug = req.body.slug.substring(0, req.body.slug.length - 1)
        }else {
            slug = req.body.slug
        }


        const newWorkout = await db.workout.create({
            data: {
                name: req.body.name,
                workoutCategoryId: req.body.workoutCategoryId,
                difficulty: req.body.difficulty,
                duration :req.body.duration,
                img: req.body.img,
                qrCodeImg: req.body.qrCodeImg,
                slug: slug,
                status: req.body.status,
                authorId: req.body.authorId,
            },
        });

        res.json({data: newWorkout});
    } catch (error) {
        console.log("Error:", error); // Afficher l'erreur en cas de problème
        res.status(500).json({data: {message: "Internal Server Error"}});
    }
}
