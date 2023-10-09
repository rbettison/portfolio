import { notFound } from "next/navigation";
import connectToDatabase from "./clientConnection";
import BlogPost from "./model/blogpost";


export async function getOne(id: string) {
    console.log('getting blog post');
    let blog;
    try {
        await connectToDatabase();
        blog = await BlogPost.findById(id);
        if(blog === null) return notFound();
    } catch (err) {
        console.log(err);
        return notFound();
    }

    return blog;
}

export async function getAll() {
    console.log('getting all blog posts...');

    let blogs;
    try {
        await connectToDatabase();
        blogs = await BlogPost.find();
    } catch (err) {
        console.log(err);
    }

    return blogs;
}

