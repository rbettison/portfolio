import { DefaultSession, DefaultUser } from "next-auth";
import AdapterUser from "@auth/core/adapters";
import { JWT, DefaultJWT } from "next-auth/jwt";

// declare module "@auth/core/adapters" {
//     interface AdapterUser {
//         id: string
//         /** The user's email address. */
//         email: string
//         /**
//          * Whether the user has verified their email address via an [Email provider](https://authjs.dev/reference/core/providers/email).
//          * It is `null` if the user has not signed in with the Email provider yet, or the date of the first successful signin.
//          */
//         emailVerified: Date | null
//         role: string
//         id: string
//         name: string
//         email: string | null
//         image: string
//     }
// }

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            role: string,
            name: string,
            image: string
        } & DefaultSession
    }
    interface User extends DefaultUser {
        role: string,
        name: string,
        image: string,
        id: string
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: string,
        name: string,
        image: string,
        id: string
    }
}