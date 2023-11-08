import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const BlogPostSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    url: String,
    body: String,
    created: {type: Date, default: Date.now()},
    author: String,
    tags: [],
    description: String,
    comments: [{
      type: Schema.Types.ObjectId,
      ref: mongoose.models.Comment
    }],
    likes: [{
        type: Schema.Types.ObjectId,
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
  comments: string[],
  likes: string[]
}

export default BlogPost;