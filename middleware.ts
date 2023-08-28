import {NextRequest, NextResponse} from "next/server";
import {jwtVerify} from "jose";
import {db} from "@/lib/db";

const PUBLIC_FILE = /\.(.*)$/;

// @ts-ignore
const verifyJWT = async (jwt) => {

    if (process.env.JWT_SECRET) {
        const {payload} = await jwtVerify(
            jwt,
            new TextEncoder().encode(process.env.JWT_SECRET)
        );
        return payload;
    }else {
        throw new Error('JWT Secret Key undefined');
    }
};

// @ts-ignore
export default async function middleware(req: NextRequest, res: NextResponse) {
    const {pathname} = req.nextUrl;

    const jwt = req.cookies.get('jwt_cookie_id');
    const authorId = req.cookies.get('author_id');



    if (pathname === "/signin") {
        if (jwt && authorId) {
            req.nextUrl.pathname = "/home";
            return NextResponse.redirect(req.nextUrl);
        } else {
            return NextResponse.next();
        }
    }

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/static") ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    if (!jwt) {
        req.nextUrl.pathname = "/signin";
        return NextResponse.redirect(req.nextUrl);
    }

    try {
        await verifyJWT(jwt.value);
        return NextResponse.next();
    } catch (e) {
        console.error(e);
        req.nextUrl.pathname = "/signin";
        return NextResponse.redirect(req.nextUrl);
    }
}
