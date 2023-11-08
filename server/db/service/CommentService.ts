'server only'
import { notFound } from "next/navigation";
import connectToDatabase from "../clientConnection";
import Comment, { CommentType } from "../model/comment";

export async function createOrUpdate(comment : CommentType) {

    console.log('creating comment: ' + JSON.stringify(comment))
    let createdComment;
    try {
        await connectToDatabase();
        createdComment = await Comment.create(comment);
        console.log("comment created: " + JSON.stringify(createdComment))
        if(createdComment === null) return notFound();
    } catch (err) {
        console.log(err);
    }
    return createdComment;
}


