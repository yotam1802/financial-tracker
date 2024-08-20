"use server";

import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function addCategory(
  name: string,
  icon: string,
  bgColor: string,
  badgeColor: string
) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/categories/add-category");
  }

  if (!name || !icon || !bgColor || !badgeColor) {
    throw Error("Missing required fields");
  }

  await prisma.category.create({
    data: {
      name,
      icon,
      bgColor,
      badgeColor,
      userId: session.user.id,
    },
  });
}
