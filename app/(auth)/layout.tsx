import React, {ReactNode} from "react";
import "@/styles/global.css";

function AuthRootLayout({children}: { children: ReactNode }) {

    return (
        <>
            <html lang={"en"}>
            <head/>
            <body
                className={"w-2/3 h-screen max-w-[350px] md:max-w-[1170px] px-4 mx-auto flex items-center justify-center"}>
            {children}
            </body>
            </html>
        </>
    );
}

export default AuthRootLayout;
