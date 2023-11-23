'use client';

import { usePost } from "@/contexts/PostProvider";
import { MDXRemote } from "next-mdx-remote";

export default function ArticleBody() {

    const {blogHtml} = usePost();

    return (
        <>
            {blogHtml && <MDXRemote {...blogHtml} />}
        </>
    )
}