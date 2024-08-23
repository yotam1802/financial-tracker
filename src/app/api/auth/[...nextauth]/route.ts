import prisma from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      const defaultCategories = [
        {
          name: "General",
          icon: "📦",
          bgColor: "bg-primary-content",
          badgeColor: "bg-primary-content",
        },
        {
          name: "Food",
          icon: "🍔",
          bgColor: "bg-green-500",
          badgeColor: "bg-green-300",
        },
        {
          name: "Transport",
          icon: "🚊",
          bgColor: "bg-sky-500",
          badgeColor: "bg-sky-300",
        },
        {
          name: "Entertainment",
          icon: "🎭",
          bgColor: "bg-orange-500",
          badgeColor: "bg-orange-300",
        },
        {
          name: "Travel",
          icon: "🚀",
          bgColor: "bg-amber-500",
          badgeColor: "bg-amber-300",
        },
        {
          name: "Bills",
          icon: "💵",
          bgColor: "bg-lime-500",
          badgeColor: "bg-lime-300",
        },
        {
          name: "Work",
          icon: "💼",
          bgColor: "bg-stone-500",
          badgeColor: "bg-stone-300",
        },
        {
          name: "Investments",
          icon: "📈",
          bgColor: "bg-gray-500",
          badgeColor: "bg-gray-300",
        },
      ];

      await prisma.category.createMany({
        data: defaultCategories.map((category) => ({
          ...category,
          userId: user.id,
        })),
      });
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
