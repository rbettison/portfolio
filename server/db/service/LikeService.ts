'server only'
import { notFound } from "next/navigation";
import connectToDatabase from "../mongooseClientConnection";
import Like from "../model/like";
import Comment from "../model/comment";
import { LikeType } from "../model/like";

export async function createOrUpdate(like: {user: string, comment: string}) {

    console.log('creating like: ' + JSON.stringify(like))
    let createdLike;
    try {
        await connectToDatabase();
        createdLike = await Like.create(like);
        console.log("like created: " + JSON.stringify(createdLike))
        let comment = await Comment.findById(like.comment);
        comment['likes'] = [...comment['likes'], createdLike._id];
        comment.save();

        if(createdLike === null) return notFound();
    } catch (err) {
        console.log(err);
    }
    return createdLike;
}

export async function deleteLike(like: {user: string, comment: string}) {

    let deletedLike = await Like.findOneAndDelete(like);
    let comment = await Comment.findById(deletedLike.comment);
    console.log('comment.likes before:' + comment['likes']);
    comment['likes'] = comment['likes'].filter((like: LikeType) => like._id.toString() != deletedLike._id)
    console.log('comment.likes after:' + comment['likes']);

    comment.save();

    return deletedLike;

}


