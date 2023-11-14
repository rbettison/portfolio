import { isAuthorised } from "@/app/api/utils";
import { NextResponse, NextRequest } from "next/server";
import { update,deleteComment } from "@/server/db/service/CommentService";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from "@/app/api/options";
import Comment from "@/server/db/model/comment";

export const PUT = async (req: NextRequest, { params }: { params: { commentId: string }}) => {

    if(!await isAuthorised()) {
        return NextResponse.json({error: "forbidden"}, {status: 403})
    }
    let body = await req.json();

    if(!await userCanActionComment(params.commentId)) {
        return NextResponse.json({error: "this user is unauthorised to update this comment"}, {status: 401})
    }

    let updateMessage = {message: body.message, _id: params.commentId}

    let comment = await update(updateMessage.message, updateMessage._id);

    return NextResponse.json({comment}, {status: 200})
}

export const DELETE = async (req: NextRequest, { params }: { params: { commentId: string }}) => {

    if(!await isAuthorised()) {
        return NextResponse.json({error: "forbidden"}, {status: 403})
    }

    if(!await userCanActionComment(params.commentId)) {
        return NextResponse.json({error: "this user is unauthorised to update this comment"}, {status: 401})
    }

    let deletedComment = await deleteComment(params.commentId);

    return NextResponse.json({deletedComment},{status: 200})

}

async function userCanActionComment(commentId: string) {
    const session = await getServerSession(OPTIONS);
    // User can only edit comments that they have created themselves
    // Here we fetch the comment from the db to check the user that created it
    let commentInDb = await Comment.findById(commentId);

    if(session?.user.id.toString() != commentInDb.user.toString()) {
        return false;
    }
    return true;
}