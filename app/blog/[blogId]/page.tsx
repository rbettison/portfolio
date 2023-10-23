import Link from 'next/link';
import { parse } from 'node-html-parser';
import { getOne } from '@/db/dbService';
import styles from './blogPost.module.css';


export default async function Page({ params }: 
  { params: { blogId: string } }) {
    let url = process.env.env === 'dev' ? process.env.base_url : 'https://' + process.env.VERCEL_URL;
    let blog = await getOne(params.blogId);

    return (
        <div className="flex flex-col gap-8 mt-16 relative">
            <Link href="/blog" className="absolute -left-12 top-4 hover:text-highlighttext">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                  className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </Link>

        <div>
          <h1 className="text-3xl font-bold">{blog?.title}</h1>
          <p className="text-sm">{new Date(blog?.created).toLocaleString('default', { day:'2-digit', month: 'long', year:'numeric' })}</p>
        </div>
        <div className={styles.article} dangerouslySetInnerHTML={{__html: parse(blog?.body).toString()}}>
        </div>


        <div className={styles.border}>
        <p className='font-bold text-lg'>
          @robbettison
        </p>
        <Link href="/blog">
          <p className='font-bold text-2xl hover:text-highlighttext'>
            show me more
          </p>
        </Link>
        </div>
        </div>
    )
}