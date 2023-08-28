'use client'
import Card from "../../UI/Card";
import {FC} from "react";
import {Category} from ".prisma/client";
import Button from "@/components/UI/Button";
import {useRouter} from "next/navigation";
import {deleteCategory, deletePost} from "@/lib/api";
import {FiEdit2} from "react-icons/fi";
import {AiOutlineDelete} from "react-icons/ai";


const CategoryCard: FC<{ category: Category }> = ({category}) => {

    const router = useRouter();

    async function deleteHandleSubmit() {
        try {
            await deleteCategory(category.id)
            router.refresh()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Card className={'bg-white px-6'}>
            <div className="grid grid-cols-2 md:flex space-x-4 justify-between items-center ">
                <span className="text-gray-600 !text-lg">{category.name}</span>
                <div className={'space-x-4'}>
                    <Button className={'!p-3'} intent={"primary"} onClick={() => {
                        router.replace(`/categories/edit/${category.id}`)
                    }}>{<FiEdit2 size={16} color={"white"}/>}</Button>
                    <Button className={'!p-3'} intent={"secondary"} onClick={async (): Promise<void> => {
                        await deleteHandleSubmit()
                    }}>{<AiOutlineDelete color={'black'} size={16}/>}</Button>
                </div>
            </div>
        </Card>
    );
};

export default CategoryCard;