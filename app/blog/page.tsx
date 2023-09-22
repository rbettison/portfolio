import Link from 'next/link';
import styles from './blog.module.css';
import {getAll}  from '../../db/dbService';

const Blog = async (props: any) => {
    const posts = await getBlogPosts();
    console.log('posts: ' + posts);
    return (
        <div className={styles.container}>
          <h1 className={styles.blogTitle}>Blog.</h1>
          <div className={styles.postContainer}>
              {posts?.map((entry: any) => {
                  return (
                      <Link href={`/blog/${entry._id}`} key={entry._id}>
                      <div className={styles.card}>
                          <h2>{entry.title}</h2>
                          <h3>{entry.description}</h3>
                          <h4 className={styles.mainBlogPageDate}>{new Date(entry.created).toLocaleDateString()}</h4>
                      </div>
                      </Link>
                  )
              })}
          </div>
        </div>
    )
  }

  async function getBlogPosts() {
    try {
      return await getAll();
      // let config = process.env.env === 'dev' ? {cache:"no-store" as string} as object : {};
      // let url = process.env.env === 'dev' ? process.env.base_url : 'https://' + process.env.VERCEL_URL;
      // const res = await fetch(url + "/blog/posts", config);
      // const result = await res.json();
      // return result;
    } catch (err) {
      console.log(err);
    }
    
  }

  export default Blog;