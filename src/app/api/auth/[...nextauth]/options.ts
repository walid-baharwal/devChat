import DbConnect from "@/lib/DbConnect";
import UserModel from "@/models/User.model";
import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any): Promise<any> {
        await DbConnect();
        try {
          const user = await UserModel.findOne({
            username: credentials.identifier,
          });
          if (!user) {
            throw new Error("User with this credentials not found");
          }
          const isPasswordCorrect = await user.isPasswordCorrect(credentials.password);
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Please login using correct credentials");
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
};
