'use client';

import { usePost } from "@/contexts/PostProvider";
import { MDXRemote } from "next-mdx-remote";
import LoadingSpinner from "../loading/LoadingSpinner";

export default function ArticleBody() {

    const {blogHtml} = usePost();

    return (
        <>
            {blogHtml === undefined ? <LoadingSpinner /> : <MDXRemote {...blogHtml} />}
        </>
    )
}