import connectToDatabase from "./clientConnection";
import BlogPost from "./model/blogpost";


export async function getOne(id: string) {
    console.log('getting blog post');
    await connectToDatabase();
    const blog = await BlogPost.findById(id);

    return blog;
}

export async function getAll() {
    console.log('getting all blog posts...');

    await connectToDatabase();
    const blogs = await BlogPost.find();

    return blogs;
}

