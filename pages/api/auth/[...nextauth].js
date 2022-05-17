import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { varifyPassword } from "../../../lib/auth";
import { databaseConnection, findDataToDatabase } from "../../../lib/db_util";

export default NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                const client = await databaseConnection();
                const user = findDataToDatabase(client, "nextAuthSignUp", {
                    email: credentials.email,
                });
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
