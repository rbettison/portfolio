import { CommentType } from "@/server/db/model/comment";
import Comment from "./Comment";

export default function CommentList({comments} : {comments: CommentType[]}) {
    return (
        comments.map((comment : CommentType) => {
            return(
                <div key={comment._id.toString()} className="w-3/4">
                    <Comment comment={comment}/>
                </div>
            )})
    )
}