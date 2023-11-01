import NextAuth from "next-auth/next";
import { OPTIONS } from "./options";

const handler = NextAuth(OPTIONS);

export {handler as GET, handler as POST}