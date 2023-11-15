declare global {
    namespace NodeJS {
      interface ProcessEnv {
        BASE_URL: string,
        VERCEL_URL: string,
        NEXTAUTH_SECRET: string,
        admin_user: string,
        admin_pass: string,
        admin_id: string,
        TWITTER_CLIENT_SECRET: string,
        TWITTER_CLIENT_ID: string,
        MONGODB_URI: string
      }
    }
  }

  export {}