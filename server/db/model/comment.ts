import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const CommentSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
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
    }]
})

// TODO cascade delete when BlogPost or User is deleted.

const Comment = mongoose.models.Comment ||
    mongoose.model("Comment", CommentSchema);

export type CommentType = {
    _id: ObjectId,
    message: String,
    createdAt: Date,
    updatedAt: Date,
    user: ObjectId,
    post: ObjectId,
    parent: ObjectId,
    children: ObjectId[]
}

export default Comment;