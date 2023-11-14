import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    comment: {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }
})

const Like = mongoose.models.Like ||
    mongoose.model("Like", LikeSchema);


export type LikeType = {
    _id: ObjectId,
    user: String,
    comment: String
}

export default Like;