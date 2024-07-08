import axios from "axios";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await axios.post(`http://localhost:8000/user/login`, {
          email,
          password,
        });
        if (user) {
          return user.data.data;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.id = user.id;
        token.image = user.avatar;
        token.tipeakun = user.tipe_akun;
      }
      if (account?.provider === "google") {
        const data = {
          id: user.id,
          email: user.email,
          name: user.name,
          password: "",
          avatar: user.image,
        };
        console.log("auth", data);
        await axios
          .post(`http://localhost:8000/user/registergoogle`, data)
          .then((response) => {
            if (response.data.success === true) {
              (token.email = response.data.data.email),
                (token.name = response.data.data.name),
                (token.role = response.data.data.role || "member");
              token.image = user.image;
              token.tipeakun = "google";
              token.id = user.id;
            }
          })
          .catch((error) => {
            console.log(error);
            (token.email = user.email),
              (token.name = user.name),
              (token.role = "member");
            token.image = user.image;
            token.id = user.id;
            token.tipeakun = "google";
          });
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      if ("image" in token) {
        session.user.image = token.image;
      }
      if ("id" in token) {
        session.user.id = token.id;
      }
      if ("tipeakun" in token) {
        session.user.tipeakun = token.tipeakun;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login/masuk",
  },
};

export default NextAuth(authOptions);
