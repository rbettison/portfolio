import { getBlogByUrl } from '@/db/dbService';
import { Metadata } from 'next';
import BlogServerComponent from '@/components/blog/BlogServerComponent';
import BlogClientComponent from '@/components/blog/BlogClientComponent';

type Props = { params: { blogUrl: string } }

const Page = async({ params }: Props) => {
    let blog = await getBlogByUrl(params.blogUrl);

    return (


      <BlogClientComponent blog={JSON.stringify(blog)}>
        <BlogServerComponent blog={JSON.stringify(blog)}/>


      </BlogClientComponent>

        
    )
}

export async function generateMetadata({params}: Props) : Promise<Metadata> {

  let blog = await getBlogByUrl(params.blogUrl);

  const baseUrlString = process.env.env === "local" ? process.env.BASE_URL : 'https://' + process.env.VERCEL_URL;
  const imageUrlString = baseUrlString + "/blogPreview.png";

  return {
    title: blog.title,
    description: blog.description,
    metadataBase: new URL(baseUrlString),
    twitter: {
      site: "@robbettison",
      creator:"@robbettison",
      card: "summary_large_image",
      title: blog.title,
      description: blog.description
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: new URL(baseUrlString),
      images: new URL(imageUrlString),
      locale: "en_GB",
      siteName: "robbettison",
      type: "website"
    }
  }
}

export default Page;
 

