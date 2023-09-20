import mongoose, {Model} from "mongoose";

const BlogPostSchema = new mongoose.Schema({
    title: String,
    body: String,
    created: Date
})

const BlogPost = mongoose.models.BlogPost ||
  mongoose.model("BlogPost", BlogPostSchema);

export default BlogPost;