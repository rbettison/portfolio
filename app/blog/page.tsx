
import {getAll}  from '../../server/db/dbService';
import Posts from '@/components/blog/Posts';
import { Metadata } from 'next';

const Blog = async (props: any) => {
    const posts = await getBlogPosts();

    return (
        <div>
            <Posts posts={posts ? posts : ""}/>  
        </div>
    )
  }

  async function getBlogPosts() {
    console.log('getting blog posts...')
    try {
      // let posts = await getOnePage(page, limit);
      let posts = await getAll();
      return JSON.stringify(posts);
    } catch (err) {
      console.log(err);
    }
    
  }

  export async function generateMetadata() : Promise<Metadata> {
  
    const baseUrlString = process.env.env === "local" ? process.env.BASE_URL : 'https://' + process.env.VERCEL_URL;
    const imageUrlString = baseUrlString + "/blogPreview.png";
  
    return {
      title: "Blog",
      description: "A collection of tutorials, sport and travel.",
      metadataBase: new URL(baseUrlString),
      twitter: {
        site: "@robbettison",
        creator:"@robbettison",
        card: "summary_large_image",
        title: "Blog",
        description: "A collection of tutorials, sport and travel."
      },
      openGraph: {
        title: "Blog",
        description: "A collection of tutorials, sport and travel.",
        url: new URL(baseUrlString),
        images: new URL(imageUrlString),
        locale: "en_GB",
        siteName: "robbettison",
        type: "website"
      }
    }
  }

  export default Blog;