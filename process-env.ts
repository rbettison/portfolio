declare global {
    namespace NodeJS {
      interface ProcessEnv {
        BASE_URL: string,
        VERCEL_URL: string,
        NEXTAUTH_SECRET: string,
        admin_user: string,
        admin_pass: string
      }
    }
  }

  export {}