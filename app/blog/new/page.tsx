"use client"

import BlogForm from "@/components/blog/BlogForm";
import PostProvider from "@/contexts/PostProvider";

export default function NewBlog() {

    return (

        <div>
            <p>New Blog</p>
            <PostProvider>
                <BlogForm/>
            </PostProvider>
        </div>

    )
}