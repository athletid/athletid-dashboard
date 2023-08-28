import { db } from "@/lib/db";
import {NextApiRequest, NextApiResponse} from "next";
import slugify from "slugify";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const lastChar = req.body.slug.at(-1);
    let slug = ""

    if (lastChar === "." || lastChar === "/" || lastChar === "?"|| lastChar === "!" || lastChar === "/"   )
    {
        slug = req.body.slug.substring(0, req.body.slug.length - 1)
    }else {
        slug = req.body.slug
    }

    try {
        await db.post.update({
            where: {
                id: req.body.id
            },
            data: {
                name: req.body.name,
                duration : req.body.duration,
                categoryId: req.body.categoryId,
                img: req.body.imageUrl ? req.body.imageUrl : req.body.img ,
                slug: slug,
                status: req.body.status,
                authorId:  req.body.authorId
            },
        });

        res.json({data: {message: "ok"}});
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({data: {message: "Internal Server Error"}});
    }
}
