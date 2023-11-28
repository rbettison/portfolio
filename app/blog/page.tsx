
import {getAll}  from '../../server/db/dbService';
import Posts from '@/components/blog/Posts';
import { Metadata } from 'next';

const Blog = async (props: any) => {
    const posts = await getBlogPosts();

    return (
      <section>
          <div className="container">
            <Posts posts={posts ? posts : []}/>  
          </div>
          

        </section>
    )
  }

  async function getBlogPosts() {
    try {
      let posts = await getAll();
      return posts?.map((post) => {
        post['_id'] = post._id.toString();
        return post;
      })
    } catch (err) {
      console.log(err);
    }
    
  }

  export async function generateMetadata() : Promise<Metadata> {
  
    console.log('process.env.env :'  + process.env.env);
    console.log('process.env.base_url: ' + process.env.BASE_URL);
  
    const baseUrlString = process.env.env === "local" ? process.env.BASE_URL : 'https://' + process.env.VERCEL_URL;
    const imageUrlString = baseUrlString + "/blogPreview.png";
  
    console.log('baseUrlString: ' + baseUrlString);
    console.log('baseImageString: ' + imageUrlString);
  
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