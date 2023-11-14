import { CommentType } from "@/server/db/model/comment";
import Comment from "./Comment";

export default function CommentList({comments} : {comments: CommentType[]}) {
    return (
        comments.map((comment : CommentType) => {
            return(
                <div key={comment._id.toString()} className="min-w-full">
                    <Comment comment={comment}/>
                </div>
            )})
    )
}

// {getReplies(comment._id.toString()) != null 
//     && getReplies(comment._id.toString()).length > 0 ?
//         getReplies(comment._id.toString()).map((comment) => {
//             return (
//                 <div key={comment._id.toString()}>
//                 <p>{comment.message}</p>
//                 <p>{comment.createdAt.toString()}</p>
//                 <p>{comment.user.toString()}</p>
//                 </div>
//             );
//         }) : <></>}