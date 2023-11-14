'server only'
import { notFound } from "next/navigation";
import connectToDatabase from "../mongooseClientConnection";
import Comment, { CommentType } from "../model/comment";
import BlogPost from "../model/blogpost";
import User from "../model/user";

export async function create(comment : CommentType) {

    let createdComment;
    try {
        await connectToDatabase();
        createdComment = await Comment.create(comment);
        await createdComment.populate({path: 'user', model: User})
        console.log("comment created: " + JSON.stringify(createdComment))
        if(createdComment === null) return notFound();


        // updating blog with new comment id
        let blog = await BlogPost.findById(createdComment.post.toString());
        blog['comments'] = [...blog['comments'], createdComment['_id'].toString()];

        blog = await BlogPost.findOneAndUpdate(blog);

        console.log('bog updated');
    } catch (err) {
        console.log(err);
    }

    let returnComment = {
        ...createdComment._doc,
        likeCount: 0,
        likedByMe: false
    }

    return returnComment;
}

export async function update(message: string, commentId: string) {

    let comment = await Comment.findById(commentId);

    comment.message = message;

    await comment.save();

    return comment;
}

export async function deleteComment(commentId: string) {
    let comment = await Comment.findByIdAndDelete(commentId);

    return comment;

}

