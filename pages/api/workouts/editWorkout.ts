import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
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
        console.log(req.body);
        await db.workout.update({
            where: {
                id: req.body.id,
            },
            data: {
                name: req.body.name,
                workoutCategoryId: req.body.workoutCategoryId,
                img: req.body.img ? req.body.img : req.body.imageUrl,
                slug: slug,
                status: req.body.status,
                qrCodeImg: req.body.qrCodeImageUrl ? req.body.qrCodeImageUrl : req.body.qrCodeImg,
                difficulty: req.body.difficulty,
                duration: req.body.duration,
                authorId: req.body.authorId,
            },
        });

        res.json({ data: { message: "ok" } });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ data: { message: "Internal Server Error" } });
    }
}
