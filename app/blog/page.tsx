import Link from 'next/link';
import styles from './blog.module.css';

const Blog = async (props: any) => {
    const posts = await getBlogPosts();
    console.log('posts: ' + posts);
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.blogTitle}>Blog.</h1>
          <div className={styles.postContainer}>
              {posts.map((entry) => {
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
      </main>
    )
  }

  async function getBlogPosts() {
    try {
      let config = process.env.env === 'dev' ? {cache: "no-store"} : {};
      const res = await fetch(process.env.base_url + "/api/blog", config);
      const result = await res.json();
      return result;
    } catch (err) {
      console.log(err);
    }
    
  }

  export default Blog;