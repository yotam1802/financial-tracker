"use server";

import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function getCategories() {
  "use server";

  // Retrieve the session
  const session = await getServerSession(authOptions);

  // Redirect if the session is not found
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/categories/add-category");
  }

  // Fetch categories with transaction counts
  const categories = await prisma.category.findMany({
    where: { userId: session.user.id },
    include: {
      _count: {
        select: { transactions: true },
      },
    },
  });

  // Return the categories with transactionCount included
  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    icon: category.icon,
    bgColor: category.bgColor,
    badgeColor: category.badgeColor,
    transactionCount: category._count.transactions,
  }));
}

export async function removeCategory(categoryId: string) {
  "use server";

  // Retrieve the session
  const session = await getServerSession(authOptions);

  // Redirect if the session is not found
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/categories/add-category");
  }

  await prisma.category.delete({
    where: {
      id: categoryId,
      userId: session.user.id,
    },
  });
}
