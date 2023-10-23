
import styles from './blog.module.css';
import {getAll}  from '../../db/dbService';
import Posts from '@/components/blog/Posts';

const Blog = async (props: any) => {
    const posts = await getBlogPosts();

    return (
      <>
          <div className="container">
            <h1 className="underline text-right font-bold">blog</h1>
            <Posts posts={posts ? posts : []}/>  
          </div>
          

        </>
    )
  }

  async function getBlogPosts() {
    try {
      let posts = await getAll();
      return posts?.map((post) => {
        post['_id'] = post._id.toString();
        return post;
      })
    } catch (err) {
      console.log(err);
    }
    
  }

  export default Blog;