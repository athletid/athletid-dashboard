import {getUserFromCookie} from "@/lib/auth";
import {cookies} from "next/headers";
import Card from "./UI/Card";
import {delay} from "@/lib/async";

const getData = async () => {
    await delay(4000)
    return await getUserFromCookie(cookies())
}

const Greeting = async () => {
    const user = await getData()

    return (
        <Card className="w-full py-4 relative">
            <div className="mb-4">
                <h1 className="text-3xl text-gray-700 font-bold mb-4">
                    Hello, {user?.firstName}!
                </h1>
                <h4 className="text-xl text-gray-400">
                    Check your posts
                </h4>
            </div>
        </Card>
    )
}


export default Greeting