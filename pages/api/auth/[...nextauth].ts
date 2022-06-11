// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

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
        })
    ]
})
//export default (req:NextApiRequest, res:NextApiResponse, options:any) => NextAuth(req, res, options)