import {db} from "@/lib/db";
import {Category, Post} from ".prisma/client";
import EditCategoryForm from "@/components/Post/Category/EditCategoryForm";

const getData = async (id: any) => {
    const category: Category | null = await db.category.findFirst({
        where: {id},
    });

    return category;
};



export default async function ProjectPage({params}: { params: { id: string } }) {


    const category = await getData(params.id)

    if (!category) {
        return <div>Category not found</div>;
    }

    return (
        <div className="h-full overflow-y-auto pr-6 w-1/1">
            {category &&
				<EditCategoryForm category={category}/>
            }
        </div>
    )
}