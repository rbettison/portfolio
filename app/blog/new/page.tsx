"use client"

import BlogForm from "@/components/blog/BlogForm";
import PostProvider from "@/contexts/PostProvider";

export default function NewBlog() {

    return (

        <section>
            <p>New Blog</p>
            <PostProvider>
                <BlogForm/>
            </PostProvider>
        </section>

    )
}