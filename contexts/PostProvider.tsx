"use client"
import { BlogPostType } from "@/server/db/model/blogpost";
import { CommentType } from "@/server/db/model/comment";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react";

type PostContextType = {
    blog: BlogPostType,
    setBlog: Dispatch<SetStateAction<BlogPostType>>;
    getReplies: (parentId: string) => CommentType[];
    rootComments: CommentType[];
    createLocalComment: (comment: CommentType) => void;
    updateLocalComment: (id: string, message: string) => void;
    deleteLocalComment: (id: string) => void;
    toggleLocalCommentLike: (id: string, addLike: boolean) => void;
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
    likes: [],
    images: []
}

export default function PostProvider({ children } : {
    children: React.ReactNode
}) {
    let params = useParams();
    let blogUrl: any = undefined;
    if(params != null) {
        blogUrl = params.blogUrl;
    }

    const [comments, setComments] = useState<CommentType[]>([]);

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
        likes: [],
        images: []
    })

    useEffect(() => {
        console.log('blogUrl: ' + blogUrl);
        if(blogUrl == undefined) {
            console.log("We've got a new blog to create.")
            setPost(emptyPost);
        } else {
            console.log("We're trying to fetch an existing blog.")
            fetch("/api/blog?url=" + blogUrl,
            {method: 'GET'}).then(async (resp) => {
                let blog = await resp.json();
                setPost(blog);
            });
        } 
    }, [blogUrl])

    const commentsByParentId = useMemo(() => {
        const group : {[key: string]: CommentType[]}= {};
        comments?.forEach((comment: CommentType) => {
            let parentId;
            if(comment?.parent == undefined) {
                parentId = "parentless";
            } else {
                parentId = comment?.parent.toString();
            }
            group[parentId] ||= [] as CommentType[]
            group[parentId].push(comment)
        })
        console.log('group: ' + JSON.stringify(group));

        return group;
    }, [comments])

    useEffect(() => {
        if(post?.comments == null) return;
        setComments(post.comments)
    }, [post?.comments])

    function getReplies(parentId: string) {
        return commentsByParentId[parentId];
    }

    function createLocalComment(comment: CommentType) {
        setComments(prevComments => {
            return [comment, ...prevComments]
        })
    }

    function updateLocalComment(id: string, message:string) {
        setComments(prevComments => prevComments.map((comment) => {
            console.log('looping through the comments')
            console.log('comment._id: ' + comment._id);
            console.log('id: ' + id);
            if(comment._id === id) {
                console.log('found the local comment corresponding')
                comment.message = message;
                return comment;
            } else {
                return comment;
            }
        }))
    }

    function deleteLocalComment(id: string) {
        setComments(prevComments => prevComments.filter(comment => comment._id != id))
    }

    function toggleLocalCommentLike(id: string, addLike: boolean) {
        setComments(prevComments => {
            return prevComments.map(comment => {
                if(id === comment._id) {
                    if(addLike) {
                        return {
                            ...comment,
                            likeCount: comment.likeCount + 1,
                            likedByMe: true
                        }
                    } else {
                        return {
                            ...comment, 
                            likeCount: comment.likeCount - 1,
                            likedByMe: false
                        }
                    }
                } else {
                    return comment;
                }
            })
        })
    }

    return(
        <PostContext.Provider value={{blog: post, 
                                        setBlog: setPost, 
                                        getReplies, 
                                        rootComments: commentsByParentId["parentless"],
                                        createLocalComment: createLocalComment,
                                        updateLocalComment: updateLocalComment,
                                        deleteLocalComment: deleteLocalComment,
                                        toggleLocalCommentLike: toggleLocalCommentLike}}>
            {children}
        </PostContext.Provider>
    )
}