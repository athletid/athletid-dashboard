import {db} from "@/lib/db";
import EditCategoryForm from "@/components/Workout/Category/EditCategoryForm";
import {WorkoutCategory} from "@prisma/client";

const getData = async (id: any) => {
    const workoutCategory: WorkoutCategory | null = await db.workoutCategory.findFirst({
        where: {id},
    });

    return workoutCategory;
};



export default async function ProjectPage({params}: { params: { id: string } }) {


    const workoutCategory = await getData(params.id)

    if (!workoutCategory) {
        return <div>Category not found</div>;
    }

    return (
        <div className="h-full overflow-y-auto pr-6 w-1/1">
            {workoutCategory &&
				<EditCategoryForm workoutCategory={workoutCategory}/>
            }
        </div>
    )
}