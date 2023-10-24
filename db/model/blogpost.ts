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

export default BlogPost;