import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules : 
            [
                {
                    userAgent: "Twitterbot",
                    disallow: "" 
                },
                {
                    userAgent: "*",
                    disallow: "/"
                }

            ]
    }
}