import './globals.css'
import type { Metadata } from 'next'
import GlobalContextsWrapper from './GlobalContextsWrapper';

type Props = {
  children: React.ReactNode
}


export default function RootLayout({
  children,
}: Props) {
  
  return (

    <GlobalContextsWrapper>
      {children}
    </GlobalContextsWrapper>
    
  )
}

export async function generateMetadata({children}: Props) : Promise<Metadata> {


  const baseUrlString = process.env.env === "local" ? process.env.BASE_URL : 'https://' + process.env.VERCEL_URL;


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
