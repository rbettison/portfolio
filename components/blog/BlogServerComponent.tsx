import styles from './blogPost.module.css';
import Link from "next/link";
import Carousel from '../animation/Carousel';
import ArticleBody from './ArticleBody';
import Socials from './Socials';


export default function BlogServerComponent({blog} : {blog: string}) {
  let blogJson = JSON.parse(blog);
    
    

    return (
      <>
        <div className="flex flex-col gap-8 mt-24 relative mb-16 border-b border-currentTextColor line-numbers 
            w-full px-4 sm:min-w-1/2 sm:w-1/2 sm:mx-auto">
            <Link href="/blog" className="absolute md:-left-12 left-1 -top-12 md:top-4 hover:text-highlighttext">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                  className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </Link>

        <div>
          <h1 className="text-4xl font-bold">{blogJson?.title}</h1>
          <p className="text-md">Authored by {blogJson?.author}</p>
          <p className="text-xs">{new Date(blogJson?.created).toLocaleString('default', { day:'2-digit', month: 'long', year:'numeric' })}</p>
        </div>
        {blogJson.images != undefined && blogJson.images.length > 0 && <Carousel IMAGES={blogJson.images} />}
        <div className={styles.article}>
            <ArticleBody />
        </div>


        <div>
        <Socials />
        <p className='font-bold text-lg'>
          @robbettison
        </p>
        <Link href="/blog">
          <p className='font-bold text-2xl hover:text-highlighttext pb-4'>
            show me more
          </p>
        </Link>
        </div>
        </div>
        </>
    )
}