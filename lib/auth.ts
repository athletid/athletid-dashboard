import bcrypt from "bcrypt";
import {jwtVerify, SignJWT} from "jose";
import {db} from "@/lib/db";
import {User} from "@prisma/client";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (plainTextPassword: string, hashedPassword: string) =>
    bcrypt.compare(plainTextPassword, hashedPassword);

export const createJWT = (user : User) => {
    // return jwt.sign({ id: users.id }, 'cookies')
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * 24 * 7;

    return new SignJWT({ payload: { id: user.id, email: user.email } })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt:any) => {
    const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return payload.payload as any;
};

export const getUserFromCookie = async (cookies:any) => {
    const jwt = cookies.get(process.env.JWT_COOKIE);

    const { id } = await validateJWT(jwt.value);

    const user = await db.user.findUnique({
        where: {
            id: id as string,
        },
    });

    return user;
};