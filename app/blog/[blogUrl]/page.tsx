import { getBlogByUrl } from '../../../server/db/dbService';
import { Metadata } from 'next';
import BlogServerComponent from '@/components/blog/BlogServerComponent';
import BlogClientComponent from '@/components/blog/BlogClientComponent';
import BlogComments from '@/components/blog/BlogComments';

type Props = { params: { blogUrl: string } }

const Page = async({ params }: Props) => {
    let blog = await getBlogByUrl(params.blogUrl);
    console.log('blog: ' + blog);

    return (
      <BlogClientComponent>
        <BlogServerComponent blog={JSON.stringify(blog)}/>
        <BlogComments />
      </BlogClientComponent>
    )
}

export async function generateMetadata({params}: Props) : Promise<Metadata> {

  let blog = await getBlogByUrl(params.blogUrl);

  const baseUrlString = process.env.env === "local" ? process.env.BASE_URL : 'https://' + process.env.VERCEL_URL;
  const imageUrlString = blog.images != undefined && blog.images?.length > 0 ? blog.images[0] : baseUrlString + "/blogPreview.png";

  console.log('imageUrlString: ' + imageUrlString)
  return {
    title: blog.title,
    description: blog.description,
    metadataBase: new URL(baseUrlString),
    twitter: {
      site: "@robbettison",
      creator:"@robbettison",
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images:[imageUrlString]
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
 

