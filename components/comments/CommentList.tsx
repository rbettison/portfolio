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