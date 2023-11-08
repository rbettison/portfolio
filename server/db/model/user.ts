import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const UserSchema = new mongoose.Schema({
    name: String,
    image: String,
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref:'Like'
    }]
})

const User = mongoose.models.User ||
    mongoose.model("User", UserSchema);

export type UserType = {
    _id: ObjectId,
    name: String,
    image: String,
    comments: ObjectId[],
    likes: ObjectId[]
}

export default User;