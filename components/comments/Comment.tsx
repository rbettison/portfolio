import { CommentType } from "@/server/db/model/comment";
import { IconBtn } from "./IconBtn";
import { usePost } from "@/contexts/PostProvider";
import CommentList from "./CommentList";
import { useContext, useState } from "react";
import CommentForm from "./CommentForm";
import { useAsyncFn } from "@/hooks/useAsync";
import { createComment, deleteComment, toggleCommentLike, updateComment } from "@/services/comment";
import { useSession } from "next-auth/react";
import { ThemeContext, ThemeContextType } from "@/contexts/ThemeContext";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
})

export default function Comment({comment} : {comment: CommentType}) {
    const {getReplies, createLocalComment, blog, 
        updateLocalComment, deleteLocalComment, 
        toggleLocalCommentLike} = usePost();
    let childComments = getReplies(comment._id.toString());
    const[areChildrenHidden, setAreChildrenHidden] = useState(true);
    const[isReplying, setIsReplying] = useState(false);
    const[isEditing, setIsEditing] = useState(false);
    const createCommentFn = useAsyncFn(createComment, []);
    const updateCommentFn = useAsyncFn(updateComment, []);
    const deleteCommentFn = useAsyncFn(deleteComment, []);
    const toggleCommentLikeFn = useAsyncFn(toggleCommentLike, []);
    const session = useSession();
    const currentUserId = session.data?.user.id;
    const { theme } = useContext(ThemeContext) as ThemeContextType;

    async function onCommentReply(message: string) : Promise<any> {
        await createCommentFn.execute({postId: blog._id, message: message, parent: comment._id}).then((comment) => {
            setIsReplying(false);
            createLocalComment(comment.comment);
        })
    }

    async function onCommentUpdate(message: string) : Promise<any> {
        await updateCommentFn.execute({postId: blog._id, message: message, id:comment._id }).then((comment) => {
            setIsEditing(false);
            updateLocalComment(comment.comment._id, message);
        })
    }

    async function onCommentDelete() : Promise<any> {
        await deleteCommentFn.execute({postId: blog._id, id:comment._id }).then((comment) => {
            deleteLocalComment(comment.deletedComment._id);
        })
    }

    async function onToggleCommentLike() {
        return toggleCommentLikeFn.execute({id: comment._id, postId: blog._id}).then((like) => {
            toggleLocalCommentLike(comment._id, like.addLike);
        })
    }

    return (
        <>
            <div className="min-w-full border border-solid border-currentTextColor p-4 mr-0 rounded mt-2">
                <div className="flex flex-row gap-4 items-center">
                {comment.user?.image && <img src={comment.user.image}/>}
                <div className="flex flex-col">
                <div className="font-bold">{comment.user.name}</div>
                {comment.user?.data?.username && 
                    <div className="flex flex-row items-center gap-0.5">
                        {theme == "dark" ? <div className="w-2.5 h-2.5 bg-cover bg-twitter-image-white">
                        </div> : <div className="w-2.5 h-2.5 bg-cover bg-twitter-image-black">
                        </div>} 
                        @{comment.user.data.username}
                    </div> 
                }
                </div>
                </div>
                {isEditing ? 
                    <CommentForm initialValue={comment.message} 
                        onSubmit={onCommentUpdate} 
                        loading={updateCommentFn.loading} 
                        error={updateCommentFn.error} />
                        : <p className="text-lg p-4">{comment.message}</p>}            
                <div className="text-sm">{dateFormatter.format(new Date(comment.createdAt))}</div>
                <div className="flex flex-row gap-4">
                    <IconBtn iconText={comment.likeCount === 1 ? 
                                        comment.likeCount.toString() + " like" 
                                        : comment.likeCount.toString() + " likes"} 
                            aria-label={comment.likedByMe ? "unlike" : "like"}
                            color={comment.likedByMe ? "green-500" : ""} 
                            onClick={onToggleCommentLike}
                            disabled={toggleCommentLikeFn.loading}/>
                    {currentUserId != undefined && <IconBtn iconText={isReplying ? "cancel reply" : "reply"} 
                        aria-label={isReplying ? "Cancel Reply" : "Reply"} 
                        isActive={isReplying} 
                        onClick={() => setIsReplying(!isReplying)} />}
                    {currentUserId === comment.user._id.toString() && (
                        <>
                        <IconBtn iconText={isEditing ? "cancel edit" : "edit"} 
                        aria-label={isEditing ? "Cancel Edit" : "Edit"} 
                        isActive={isEditing} 
                        onClick={() => setIsEditing(!isEditing)} />
                        <IconBtn 
                        iconText={deleteCommentFn.loading ? "deleting" : "delete"} 
                        color={"red-500"} 
                        aria-label={deleteCommentFn.loading ? "deleting" : "delete"}
                        onClick={onCommentDelete}/>
                        </>)}
                </div>
            </div>
            {isReplying && (
                <div className="mt-2 ml-2">
                    <CommentForm autoFocus onSubmit={onCommentReply} loading={createCommentFn.loading} error={createCommentFn.error} />
                </div>
            )}
            {childComments?.length > 0 && (
                <>
                    <div className={areChildrenHidden ? "hidden" : "min-w-full"}>
                        
                        <div className="flex flex-row">
                            <button 
                            onClick={()=>setAreChildrenHidden(true)}
                            className="border-l border-currentTextColor min-h-full pr-4  hover:border-highlighttext mt-4" aria-label="Hide Replies"></button>
                            <div className="flex flex-col w-full">
                            <CommentList comments={childComments} />

                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={()=>setAreChildrenHidden(false)}
                        className={!areChildrenHidden ? "hidden" : ""}>
                            show replies</button>
                </>
            )}
        </>
    )
}