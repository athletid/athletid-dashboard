import {db} from "@/lib/db";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        if (req.body.paragraph !== "") {
            await db.section.create({

                data: {
                    subTitle: req.body.subTitle,
                    paragraph: req.body.paragraph,
                    img: req.body.img,
                    order: req.body.order,
                    post: {
                        connect: {
                            id: req.body.postId
                        }
                    }
                },
            });
        }

        res.json({data: {message: "ok"}});
    } catch (error) {
        console.log("Error:", error); // Afficher l'erreur en cas de problème
        res.status(500).json({data: {message: "Internal Server Error"}});
    }
}
