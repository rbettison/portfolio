import styles from '../blog.module.css';
import Link from 'next/link';
import parse from 'html-react-parser';

export default async function Page({ params }: 
  { params: { blogId: string } }) {
    const postsRequest = await fetch(`${process.env.base_url}/api/blog/${params.blogId}`, {cache: "no-cache"});
    const blog = await postsRequest.json();
    console.log('blog: ' + blog);

    return (
      <main className={styles.postMain}>
        <div className={styles.container}>
        <h1>{blog.title}</h1>
        <p className={styles.entryPageDate}>{new Date(blog.created).toLocaleDateString()}</p>
        <div className={styles.article}>
          {parse(blog.body)}
        </div>
        <div className={styles.bio}>
        <p>
          Robert Bettison
        </p>
        <p>
        I'm a full-stack software engineer and solution architect who loves working with people to bring ideas to life. 
        </p>
        <button className={styles.more}>
          <Link href='/blog'>
          More
          </Link>
        </button>
        </div>
        </div>
      </main>
    )
}