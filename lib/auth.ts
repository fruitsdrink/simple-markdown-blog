import GithubProvider from "next-auth/providers/github";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession, type AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //   httpOptions: {
    //     timeout: 10000,
    //   },
    // }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token?.sub) {
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
          select: {
            role: true,
          },
        });
        return {
          ...session,
          user: {
            ...session.user,
            id: token.sub,
            role: user?.role ?? "USER",
          },
        };
      }

      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        return {
          ...token,
          uid: user.id,
        };
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("Admin access required.");
  }

  return user;
}
