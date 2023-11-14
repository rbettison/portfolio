'server only'
import { notFound } from "next/navigation";
import connectToDatabase from "../mongooseClientConnection";
import User, { UserType } from "../model/user";

export async function createOrUpdate(user : UserType) {

    console.log('creating user: ' + JSON.stringify(user))
    let createdUser;
    try {
        await connectToDatabase();
        createdUser = await User.create(user);
        console.log("user created: " + JSON.stringify(createdUser))
        if(createdUser === null) return notFound();
    } catch (err) {
        console.log(err);
    }
    return createdUser;
}

export async function getOne(id: string) {
    console.log('getting user');
    let blog;
    try {
        await connectToDatabase();
        blog = await User.findById(id);
        if(blog === null) return notFound();
    } catch (err) {
        console.log(err);
        return notFound();
    }

    return blog;
}


