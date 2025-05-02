import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/Auth"

export const authRoutes = ["/login", "/signUp"]

export const middleware = async (request: NextRequest) => {

    const { pathname } = request.nextUrl
    const userInfo = await getCurrentUser();


    if (!userInfo) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(
                // new URL(`https://re-sell-bd-client.vercel.app/login`, request.url)
                new URL(`http://localhost:3000/login`, request.url)
            )
        }
    }


}

export const config = {
    matcher: [
        "/",
        "/:page",
    ]
}