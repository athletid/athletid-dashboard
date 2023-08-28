import {db} from "@/lib/db";
import EditPostForm from "@/components/Post/EditPostForm";
import {Post} from ".prisma/client";
import {Workout} from "@prisma/client";
import EditWorkoutForm from "@/components/Workout/EditWorkoutForm";

const getData = async (id: any) => {
    const workout: Workout | null = await db.workout.findFirst({
        where: {id},
    });

    return workout;
};



export default async function ProjectPage({params}: { params: { id: string } }) {


    const post = await getData(params.id)
    if (!post) {
        return <div>Workout not found.</div>;
    }
    const { createdAt: createdDate, updatedAt: updatedDate, ...rest } = post;
    const createdAt = createdDate.toISOString();
    const updatedAt = updatedDate.toISOString();

    return (
        <div className="h-full overflow-y-auto pr-6 w-1/1">
            {post &&
				<EditWorkoutForm workout={{...rest, createdAt, updatedAt}}/>
            }
        </div>
    )
}