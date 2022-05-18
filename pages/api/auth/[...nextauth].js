import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { varifyPassword } from "../../../lib/auth";
import { databaseConnection, findDataToDatabase } from "../../../lib/db_util";

export default NextAuth({
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                const client = await databaseConnection();
                const user = await findDataToDatabase(
                    client,
                    "nextAuthSignUp",
                    {
                        email: credentials.email,
                    }
                );
                if (!user) {
                    throw new Error("No user found!");
                }
                const isValid = await varifyPassword(
                    credentials.password,
                    user.password
                );
                if (!isValid) {
                    throw new Error("Invalid Password!");
                }
                client.close();
                return {
                    email: user.email,
                };
            },
        }),
    ],
});

// export default async function auth(req, res) {
//     const providers = [
//         CredentialsProvider({
//             name: "Credentials",
//             async authorize(credentials) {
//                 const client = await databaseConnection();
//                 const user = await findDataToDatabase(
//                     client,
//                     "nextAuthSignUp",
//                     {
//                         email: credentials.email,
//                     }
//                 );
//                 if (!user) {
//                     throw new Error("No user found!");
//                 }
//                 const isValid = await varifyPassword(
//                     credentials.password,
//                     user.password
//                 );
//                 if (!isValid) {
//                     throw new Error("Invalid Password!");
//                 }
//                 client.close();
//                 return {
//                     email: user.email,
//                 };
//             },
//         }),
//     ];

//     return await NextAuth(req, res, {
//         // https://next-auth.js.org/configuration/providers/oauth
//         providers,
//         session: {
//             strategy: "jwt",
//         },
//         secret: process.env.NEXTAUTH_SECRET,
//         callbacks: {
//             async session({ session, token }) {
//                 session.address = token.sub;
//                 session.user.name = token.sub;
//                 session.user.image = "https://www.fillmurray.com/128/128";
//                 return session;
//             },
//         },
//     });
// }
