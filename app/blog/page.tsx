import Link from 'next/link';
import styles from './blog.module.css';

const Blog = async (props: any) => {
    const posts = await getBlogPosts();
    console.log('posts: ' + posts);
    return (
      <main className={styles.blog}>
        <h1 className={styles.blogTitle}>Blog</h1>
        <div className={styles.container}>
            {posts.map((entry) => {
                return (
                    <Link href={`/blog/${entry.id}`}>
                    <div className={styles.card}>
                        <h2>{entry.title}</h2>
                        <h3>{entry.description}</h3>
                    </div>
                    </Link>
                )
            })}
        </div>
      </main>
    )
  }

  async function getBlogPosts() {
    try {
      const res = await fetch(process.env.base_url + "/api/blog");
      const result = await res.json();
      return result;
    } catch (err) {
      console.log(err);
    }
    
  }

  export default Blog;