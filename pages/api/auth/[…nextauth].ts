// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import {NextApiRequest, NextApiResponse} from "next";
import {GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_CLIENTID, NEXTAUTH_URL} from "../../../utils/config";

const options = {
    site: NEXTAUTH_URL,
    session: {
        jwt: true,
        maxAge: 4 * 60 * 60 // the session will last 4h
    },
}
export default NextAuth({
    providers: [
        // OAuth authentication providers..
        GoogleProvider({
            clientId: GOOGLE_OAUTH_CLIENTID,
            clientSecret: GOOGLE_OAUTH_CLIENT_SECRET
        }),
        // Passwordless / email sign in
        // EmailProvider({
        //     server: process.env.MAIL_SERVER,
        //     from: 'NextAuth.js <no-reply@example.com>'
        // }),
    ]
})
//export default (req:NextApiRequest, res:NextApiResponse, options:any) => NextAuth(req, res, options)