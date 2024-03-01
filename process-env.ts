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
        MONGODB_URI: string,
        GCP_PROJECT_ID: string,
        AGENT_ID_CX: string,
        CLIENT_EMAIL_CX: string,
        PRIVATE_KEY_CX: string
      }
    }
  }

  export {}