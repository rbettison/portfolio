import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import TwitterProvider from 'next-auth/providers/twitter';
import { TwitterProfile } from "next-auth/providers/twitter";

export const OPTIONS: NextAuthOptions = {
    debug: true,
    providers: [
        TwitterProvider({
            profile(profile: TwitterProfile) {
                return {
                    ...profile, 
                    role: "user",
                    name: profile.data.name.toString(),
                    id: profile.data.id.toString(),
                    image: profile.data.profile_image_url?.toString() || ""
                }
            },
            clientId: process.env.TWITTER_CLIENT_ID,
            clientSecret: process.env.TWITTER_CLIENT_SECRET,
            version: "2.0"
        }),
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
                                role: "admin", image: ""
                            };

                if(credentials?.username === user.name 
                    && credentials?.password === process.env.admin_pass) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({user, token}) {
            if(user) {
                token.role = user.role;
                token.name = user.name;
            }
            return token;
        },
        // use role in client components
        async session({session, token}) {
            if(session.user) {
                session.user.role = token.role;
                session.user.name = token.name;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt"            
    },
    secret: process.env.NEXTAUTH_SECRET
}