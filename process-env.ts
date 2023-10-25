declare global {
    namespace NodeJS {
      interface ProcessEnv {
        BASE_URL: string,
        VERCEL_URL: string
      }
    }
  }

  export {}