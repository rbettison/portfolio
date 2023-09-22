import styles from './blogPost.module.css';
import Link from 'next/link';
import parse from 'html-react-parser';
import { getOne } from '@/db/dbService';

export default async function Page({ params }: 
  { params: { blogId: string } }) {
    let url = process.env.env === 'dev' ? process.env.base_url : 'https://' + process.env.VERCEL_URL;
    let blog = await getOne(params.blogId);

    return (
        <div className={styles.container}>
        <h1>{blog?.title}</h1>
        <p className={styles.entryPageDate}>{new Date(blog?.created).toLocaleDateString()}</p>
        <div className={styles.article}>
          {parse(blog?.body)}
        </div>
        <div className={styles.bio}>
        <p>
          Robert Bettison
        </p>
        <p>
        I&apos;m a full-stack software engineer and solution architect who loves working with people to bring ideas to life. 
        </p>
        <button className={styles.more}>
          <Link href='/blog'>
          More
          </Link>
        </button>
        </div>
        </div>
    )
}