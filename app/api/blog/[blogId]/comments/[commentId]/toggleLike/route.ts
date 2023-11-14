import { OPTIONS } from "@/app/api/options";
import { isAuthorised } from "@/app/api/utils";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { createOrUpdate, deleteLike } from "@/server/db/service/LikeService";
import Like from "@/server/db/model/like";

export const POST = async (req: NextRequest, { params }: 
    { params: { commentId: string, blogId: string }}) => {

    if(!await isAuthorised()) {
        return NextResponse.json({error: "forbidden"}, {status: 403})
    }

    const session = await getServerSession(OPTIONS);

    let likeToCreate = {
        user: session?.user.id.toString() || "",
        comment: params.commentId
    }

    const likeExists = await Like.exists(likeToCreate);

    console.log('likeFound: ' + likeExists);

    let addLike = false;
    if(!likeExists) {
        addLike = true;
        await createOrUpdate(likeToCreate);
    } else {
        console.log('deleting like');
        addLike = false;
        await deleteLike(likeToCreate);
    }

    return NextResponse.json({addLike: addLike}, {status: 200});
}
