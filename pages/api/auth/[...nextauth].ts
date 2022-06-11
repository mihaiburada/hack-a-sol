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
  site: NEXTAUTH_URL,
  session: {
    jwt: true,
    maxAge: 4 * 60 * 60, // the session will last 4h
  },
};
export default NextAuth({
  providers: [
    // OAuth authentication providers..
    GoogleProvider({
      clientId: GOOGLE_OAUTH_CLIENTID,
      clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: GITHUB_OAUTH_CLIENTID,
      clientSecret: GITHUB_OAUTH_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "index",
  },
});

//export default (req:NextApiRequest, res:NextApiResponse, options:any) => NextAuth(req, res, options)
