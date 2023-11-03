import { NextResponse } from "next/server";
import {createOrUpdate, deleteBlog} from "../../../db/dbService";
import {OPTIONS} from "../options";
import { getServerSession } from "next-auth/next";

export const GET = async (req: Request, res: Response) => {

    if(!await isAuthorised()) {
        return NextResponse.json({error: "forbidden"}, {status: 403})
    }

    console.log("GET REQ")
    return res;
}

export const POST = async (req: Request) => {

    if(!await isAuthorised()) {
        return NextResponse.json({error: "forbidden"}, {status: 403})
    }

    console.log("POST REQ")
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