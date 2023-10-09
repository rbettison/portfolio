
import styles from './blog.module.css';
import {getAll}  from '../../db/dbService';
import Posts from '@/components/blog/Posts';

const Blog = async (props: any) => {
    const posts = await getBlogPosts();

    const tags = ['all', 'ai', 'technology', 'sports', 'React', 'NextJS', 'travel'];
    return (
      <>
        <div className={styles.container}>
          <h1 className={styles.blogTitle}>Blog.</h1>
            <Posts tags={tags} posts={posts ? posts : []}/>  
        </div>
        </>
    )
  }

  async function getBlogPosts() {
    try {
      let posts = await getAll();
      return posts?.map((post) => {
        console.log('pre: ' + post.toString());
        post['_id'] = post._id.toString();
        console.log('post._id.toString(): ' + post._id.toString());
        console.log('post: ' + post.toString());

        return post;
      })
    } catch (err) {
      console.log(err);
    }
    
  }

  function handleChipClick() {
    console.log('Handling Chip Click');
  }

  export default Blog;