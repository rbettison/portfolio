import { NextRequest, NextResponse } from "next/server";
import {createOrUpdate, deleteBlog, getBlogByUrl} from "../../../server/db/dbService";
import {OPTIONS} from "../options";
import { getServerSession } from "next-auth/next";
import { NextApiResponse } from "next";

export const GET = async (req: NextRequest, res: NextApiResponse) => {

    if(!await isAuthorised()) {
        return NextResponse.json({error: "forbidden"}, {status: 403})
    }

    console.log("GETting single blog: ");
    let blog;
    
    if(req.nextUrl.searchParams.has("url") && req.nextUrl.searchParams.get("url")!=null) {
        let url = req.nextUrl.searchParams.get("url");
        url!= null ? blog = await getBlogByUrl(url) : "";
        console.log("here comes the blog: " + blog);
        return NextResponse.json(blog, {status: 200})
    }

    return NextResponse.json({}, {status: 404});
}

export const POST = async (req: Request) => {

    if(!await isAuthorised()) {
        return NextResponse.json({error: "forbidden"}, {status: 403})
    }

    let body = await req.json();

    console.log('body: ' + body);
    let blog = await createOrUpdate(body);
    console.log('blog: ' + JSON.stringify(blog));

    if(blog === null) {
        return NextResponse.json(
            {error: 'Internal Error Creating Blog'}, 
            {status: 500}
        )
    }
    return NextResponse.json({blog}, {status: 200})
}

export const DELETE = async(req: Request) => {

    if(!isAuthorised()) {
        return NextResponse.json({"message": "forbidden"}, {status: 403})
    }

    let body = await req.json();

    let resp = await deleteBlog(body._id);

    return NextResponse.json({resp}, {status: 200});

}


async function isAuthorised() {

    console.log('Checking session object: ');
    const session = await getServerSession(OPTIONS);
    console.log('session:' + session);

    if(!session || session == null) {
        console.log('here');
        return false
    } else {
        console.log('there');
        return true
    }
    
}