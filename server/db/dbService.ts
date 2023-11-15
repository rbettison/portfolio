'server only'
import { notFound } from "next/navigation";
import connectToDatabase from "./mongooseClientConnection";
import BlogPost, { BlogPostType } from "./model/blogpost";
import Comment, { CommentType } from "./model/comment";
import User from "./model/user";
import { ObjectId } from "mongodb";
import Like from "./model/like";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from "@/app/api/options";


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
    console.log('getting blog by URL')
    try {
        const session = await getServerSession(OPTIONS);
        let userId = session?.user.id.toString();
        await connectToDatabase();
        blog = await BlogPost.findOne({url : url})
            .populate({path: 'comments', model: Comment, 
                        populate: { path: 'user', model: User}}).lean<BlogPostType>().then(async (blog) => {
                            const likes = await Like.find({
                                comment: {
                                    $in: blog?.comments?.map(comment => comment._id.toString())
                                },
                                user: userId})
                            console.log('likes found: ' + likes);
                            console.log('blog: ' + JSON.stringify(blog));
                            return {
                                ...blog,
                                comments: blog?.comments?.map((comment:CommentType) => {
                                    const { ...commentFields } = comment;
                                    return {
                                        ...commentFields,
                                        likedByMe: likes?.find(like => {
                                            console.log('like.commentId: ' + like.comment);
                                            console.log('comment._id: ' + comment._id);
                                            console.log(like.comment.toString() === comment._id.toString())
                                            return like.comment.toString() === comment._id.toString()}
                                        ),
                                        likeCount: comment.likes.length
                                    }
                                })
                            }
                        });
        console.log('blog found by URL: ' + JSON.stringify(blog));
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

