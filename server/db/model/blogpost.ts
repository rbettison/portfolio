
import mongoose from "mongoose";
import { CommentType } from "./comment";

const BlogPostSchema = new mongoose.Schema({
    title: String,
    url: String,
    body: String,
    created: {type: Date, default: Date.now()},
    author: String,
    tags: [],
    description: String,
    comments: [{
      type: mongoose.Schema.ObjectId,
      ref: mongoose.models.Comment
    }],
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref:'Like'
    }]
})

const BlogPost = mongoose.models.BlogPost ||
  mongoose.model("BlogPost", BlogPostSchema);

export type BlogPostType = {
  _id: string,
  title: string, 
  url: string, 
  body: string, 
  created: string,
  author: string,
  tags: string[],
  description: string,
  comments: CommentType[],
  likes: string[]
}

export default BlogPost;