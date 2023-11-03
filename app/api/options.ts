import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

export const OPTIONS: NextAuthOptions = {
    debug: true,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "enter username"
                },
                password: {
                    label: "Password",
                    type: "text", 
                    placeholder: "enter password"
                }
            },
            async authorize(credentials) {
                // this is where you would usually 
                // retrieve user data from database to verify user
                const user = {
                                id: "1", name: process.env.admin_user, 
                                password: process.env.admin_pass
                            };
                console.log('hereeee');
                if(credentials?.username === user.name 
                    && credentials?.password === user.password) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt"            
    },
    secret: process.env.NEXTAUTH_SECRET
}