"use server";

import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function getMonthlyFinancials(year: string, month: string) {
  "use server";

  // Retrieve the session
  const session = await getServerSession(authOptions);

  // Redirect if the session is not found
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/budget");
  }

  const startDate = `${year}-${month.padStart(2, "0")}-01`;
  const endDate = `${year}-${month.padStart(2, "0")}-31`;

  // Fetch income transactions
  const incomeTransactions = await prisma.transaction.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
      userId: session.user.id,
      transactionType: "income",
    },
  });

  // Fetch expense transactions
  const expenseTransactions = await prisma.transaction.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
      userId: session.user.id,
      transactionType: "expense",
    },
  });

  // Calculate total income and expenses
  const totalIncome = incomeTransactions.reduce(
    (sum, transaction) => sum + Number(transaction.amount),
    0
  );
  const totalExpenses = expenseTransactions.reduce(
    (sum, transaction) => sum + Number(transaction.amount),
    0
  );

  return { totalIncome, totalExpenses };
}
