// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import {
  GITHUB_OAUTH_CLIENT_SECRET,
  GITHUB_OAUTH_CLIENTID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_CLIENTID,
  NEXTAUTH_URL,
} from "../../../utils/config";

const options = {
  site: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
  session: {
    jwt: true,
    maxAge: 4 * 60 * 60, // the session will last 4h
  },
};
export default NextAuth({
  providers: [
    // OAuth authentication providers..
      GoogleProvider({
      clientId: String(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENTID),//GOOGLE_OAUTH_CLIENTID || 'invalidclientid',
      clientSecret: String(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_SECRET),//GOOGLE_OAUTH_CLIENT_SECRET || 'invalidsecret',
          ...options
    }),
    GithubProvider({
      clientId: GITHUB_OAUTH_CLIENTID,
      clientSecret: GITHUB_OAUTH_CLIENT_SECRET,
      ...options
    }),
  ],

});

//export default (req:NextApiRequest, res:NextApiResponse, options:any) => NextAuth(req, res, options)
