import { isAuthorised } from "@/app/api/utils";
import { NextResponse, NextRequest } from "next/server";
import { create } from "@/server/db/service/CommentService";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from "@/app/api/options";

export const POST = async (req: NextRequest, { params }: { params: { blogId: string }}) => {

    if(!await isAuthorised()) {
        return NextResponse.json({error: "forbidden"}, {status: 403})
    }

    const session = await getServerSession(OPTIONS);

    let body = await req.json();

    if(body.message === "" || body.message === null) {
        return NextResponse.json({"message": "Need a message"}, {status: 400})
    }

    let commentToCreate = {...body, post: params.blogId, user: session?.user.id}

    let comment = await create(commentToCreate);

    return NextResponse.json({comment}, {status: 200})
}