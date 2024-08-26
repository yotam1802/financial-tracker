"use server";

import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function getTransactions(year: string, month: string) {
  "use server";

  // Retrieve the session
  const session = await getServerSession(authOptions);

  // Redirect if the session is not found
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/categories/add-category");
  }

  const startDate = `${year}-${month.padStart(2, "0")}-01`;
  const endDate = `${year}-${month.padStart(2, "0")}-31`;

  const transactions = await prisma.transaction.findMany({
    where: {
      date: {
        gte: startDate, // Greater than or equal to the start date
        lte: endDate, // Less than or equal to the end date
      },
      userId: session.user.id,
    },
    include: {
      category: true, // Include the category details in the result
    },
  });

  return transactions;
}

export async function removeTransaction(transactionId: string) {
  "use server";

  // Retrieve the session
  const session = await getServerSession(authOptions);

  // Redirect if the session is not found
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/categories/add-category");
  }

  await prisma.transaction.delete({
    where: {
      id: transactionId,
      userId: session.user.id,
    },
  });
}
