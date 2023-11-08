'server only'
import { notFound } from "next/navigation";
import connectToDatabase from "./clientConnection";
import BlogPost, { BlogPostType } from "./model/blogpost";
import Comment from "./model/comment";
import { ObjectId } from "mongodb";


export async function createOrUpdate(blog : BlogPostType) {

    console.log('creating blog: ' + JSON.stringify(blog))
    let createdBlog;
    if(blog._id == "") blog._id = new ObjectId().toString();
    try {
        await connectToDatabase();
        createdBlog = await BlogPost.create(blog);
        console.log("blog created: " + JSON.stringify(createdBlog))
        if(createdBlog === null) return notFound();
    } catch (err) {
        // Try updating instead (if duplicate key error is thrown after create attempt)
            console.log(err);
            console.log('Above error after create attempt, attempting to update... ');
            try {
                await connectToDatabase();
                createdBlog = await BlogPost.findByIdAndUpdate(blog._id, blog);
                console.log("blog updated: " + JSON.stringify(createdBlog))
                if(createdBlog === null) return notFound();
            } catch (err) {
                console.log(err);
                return notFound();
            }   

    }
    return createdBlog;

}

export async function deleteBlog(blogId: string) {
    let result;
    console.log("deleting blog with id: " + blogId);
    try {
        await connectToDatabase();
        await BlogPost.findByIdAndDelete(blogId);
        result = {
            "_id": blogId,
            "message": "deleted"
        }
        console.log("successfully deleted blog with id: " + blogId);
    } catch (err) {
        console.log('Error deleting blog: ' + err);
    }

    return result;
}

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

export async function getBlogByUrl(url: string) {
    let blog;
    try {
        await connectToDatabase();
        blog = await BlogPost.findOne({url : url}).populate({path: 'comments', model: Comment}).lean<BlogPostType>();
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
        // without .lean() we face stack overflow errors - lean populates with plain JSON objects rather than mongoose objects
        blogs = await BlogPost.find();
    } catch (err) {
        console.log(err);
    }

    return blogs;
}

