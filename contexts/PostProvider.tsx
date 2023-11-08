"use client"
import { BlogPostType } from "@/server/db/model/blogpost";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

type PostContextType = {
    blog: BlogPostType,
    setBlog: Dispatch<SetStateAction<BlogPostType>>;
}

let PostContext = createContext<PostContextType | null>(null);

export function usePost() {
    return useContext(PostContext) as PostContextType;
}

type BlogParams = {
    blogUrl: string;
}

let emptyPost: BlogPostType = {
    _id: "",
    title: "",
    url: "",
    body: "",
    created: "",
    author: "",
    tags: [],
    description: "",
    comments: [],
    likes: []
}

export default function PostProvider({ children } : {
    children: React.ReactNode
}) {
    const { blogUrl } = useParams();

    const [post, setPost] = useState<BlogPostType>({
        _id: "",
        title: "",
        url: "",
        body: "",
        created: "",
        author: "",
        tags: [],
        description: "",
        comments: [],
        likes: []
    })
    useEffect(() => {
        console.log('blogUrl: ' + blogUrl);
        if(blogUrl == undefined) {
            console.log("We've got a new blog to create.")
            setPost(emptyPost);
        } else {
            console.log("We're trying to fetch an existing blog.")
            fetch("/api/blog?url=" + blogUrl).then(async (resp) => {
                let blog = await resp.json();
                console.log('json response from api: ' + JSON.stringify(blog));
                setPost(blog);
            });
        } 
    }, [blogUrl])

    return(
        <PostContext.Provider value={{blog: post, setBlog: setPost}}>
            {children}
        </PostContext.Provider>
    )
}