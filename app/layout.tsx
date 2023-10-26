import './globals.css'
import type { Metadata } from 'next'
import ClientThemeWrapper from './ClientThemeWrapper';

type Props = {
  children: React.ReactNode
}


export default function RootLayout({
  children,
}: Props) {
  
  return (

    <ClientThemeWrapper>{children}</ClientThemeWrapper>
    
  )
}

export async function generateMetadata({children}: Props) : Promise<Metadata> {

  console.log('process.env.env :'  + process.env.env);
  console.log('process.env.base_url: ' + process.env.BASE_URL);

  const baseUrlString = process.env.env === "local" ? process.env.BASE_URL : 'https://' + process.env.VERCEL_URL;
  const imageUrlString = baseUrlString + "/sitePreview.png";

  console.log('baseUrlString: ' + baseUrlString);
  console.log('baseImageString: ' + imageUrlString);

  return {
    title: "robbettison",
    description: "Software engineer based in Madrid.",
    metadataBase: new URL(baseUrlString),
    twitter: {
      site: "@robbettison",
      card: "summary_large_image",
      title: "robbettison: portfolio site",
      creator:"@robbettison",
      description: "Software engineer based in Madrid."
    },
    openGraph: {
      title: "robbettison: portfolio site",
      description: "Software engineer based in Madrid.",
      url: new URL(baseUrlString),
      locale: "en_GB",
      siteName: "robbettison",
      type: "website"
    }
  }
}
