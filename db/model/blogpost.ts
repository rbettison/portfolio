import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema({
    title: String,
    url: String,
    body: String,
    created: Date,
    author: String,
    tags: [],
    description: String
})

const BlogPost = mongoose.models.BlogPost ||
  mongoose.model("BlogPost", BlogPostSchema);

export type BlogPostType = {
  _id: ObjectId,
  title: string, 
  url: string, 
  body: string, 
  created: string,
  author: string,
  tags: string[],
  description: string
}

export default BlogPost;