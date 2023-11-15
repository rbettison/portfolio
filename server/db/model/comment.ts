import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";
import { UserType } from "./user";

const CommentSchema = new mongoose.Schema({
    message: String,
    createdAt: {type: Date, default: Date.now()},
    updatedAt: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'BlogPost'
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref:'Comment'
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref:'Like'
    }]
})

// TODO cascade delete when BlogPost or User is deleted.

const Comment = mongoose.models.Comment ||
    mongoose.model("Comment", CommentSchema);

export type CommentType = {
    [index: string]: string | Date | UserType | ObjectId | ObjectId[] | number | boolean,
    _id: string,
    message: string,
    createdAt: Date,
    updatedAt: Date,
    user: UserType,
    post: ObjectId,
    parent: ObjectId,
    children: ObjectId[],
    likes: ObjectId[],
    likeCount: number,
    likedByMe: boolean
}

export default Comment;