'use client'

import { usePost } from "@/contexts/PostProvider"
import CommentList from "../comments/CommentList";
import CommentForm from "../comments/CommentForm";
import { useAsyncFn } from "@/hooks/useAsync";
import { createComment } from "@/services/comment";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function BlogComments() {
    const {blog, rootComments, createLocalComment} = usePost();
    const{loading,error,execute: createCommentFn} = useAsyncFn(createComment, []);
    const {data: session} = useSession();

    function onCommentCreate(message: string) : Promise<any> {
        return createCommentFn({postId: blog._id, message: message }).then((comment) => {
            createLocalComment(comment.comment);
        })
    }

    return(
        <>
        <div className="pb-8">
        { session?.user ?
        <CommentForm loading={loading} error={error} onSubmit={onCommentCreate}/>
         : <p><button onClick={() => signIn()} className="hover:text-highlighttext font-bold">log in</button> to comment...</p>
        }
        <p className="font-bold text-2xl">comments</p>
        {rootComments != null && rootComments.length > 0 ? 
            <CommentList comments={rootComments} /> : <p>No comments</p>
        }
        </div>
        </>
    )
}