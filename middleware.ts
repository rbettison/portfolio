// export { default } from "next-auth/middleware"
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        // Augments the request with the user's token
        if(request.nextUrl.pathname.startsWith("/blog/new")
            && request.nextauth.token?.role !== "admin") {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }
        console.log(request.nextUrl.pathname);
        console.log(request.nextauth.token);
    },
    {
        callbacks: {
            authorized: ({token}) => !!token
        }
    }   
)

export const config = {
    matcher: ['/blog/new']
}

