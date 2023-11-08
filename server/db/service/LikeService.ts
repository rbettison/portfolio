'server only'
import { notFound } from "next/navigation";
import connectToDatabase from "../clientConnection";
import Like, { LikeType } from "../model/like";

export async function createOrUpdate(like : LikeType) {

    console.log('creating like: ' + JSON.stringify(like))
    let createdLike;
    try {
        await connectToDatabase();
        createdLike = await Like.create(like);
        console.log("like created: " + JSON.stringify(createdLike))
        if(createdLike === null) return notFound();
    } catch (err) {
        console.log(err);
    }
    return createdLike;
}


