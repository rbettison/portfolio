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
              {posts.map((entry: {_id: string, title: string, description: string, created: Date}) => {
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
      let config = process.env.env === 'dev' ? {cache:"no-store" as string} as object : {};
      let url = process.env.env === 'dev' ? process.env.base_url : 'https://' + process.env.VERCEL_URL;
      const res = await fetch(url + "/api/blog", config);
      const result = await res.json();
      return result;
    } catch (err) {
      console.log(err);
    }
    
  }

  export default Blog;