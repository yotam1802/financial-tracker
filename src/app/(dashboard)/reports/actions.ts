"use server";

import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// Define the types based on the Prisma schema
type Transaction = {
  id: string;
  transactionType: string;
  categoryId: string;
  category: Category;
  amount: string;
  title: string;
  date: string;
  description: string;
  userId?: string | null;
};

type Category = {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  badgeColor: string;
  userId?: string | null;
};

type MonthlyFinancials = {
  totalIncome: number;
  totalExpenses: number;
  transactions: Transaction[];
};

// Helper function to get the first and last day of a given month and year
function getMonthRange(
  year: string,
  month: number
): { startDate: string; endDate: string } {
  const startDate = `${year}-${month.toString().padStart(2, "0")}-01`; // first day of the month
  const endDate = `${year}-${(month + 1).toString().padStart(2, "0")}-01`; // first day of the next month
  return { startDate, endDate };
}

// Function to get the financials for each month of a given year
export async function getYearlyFinancials(
  year: string
): Promise<MonthlyFinancials[]> {
  "use server";

  // Retrieve the session
  const session = await getServerSession(authOptions);

  // Redirect if the session is not found
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/budget");
  }

  // Initialize array to store results for each month
  const monthlyFinancials: MonthlyFinancials[] = [];

  // Loop through each month (1 to 12)
  for (let month = 1; month <= 12; month++) {
    const { startDate, endDate } = getMonthRange(year, month);

    // Fetch all transactions for the current month
    const transactions: Transaction[] = await prisma.transaction.findMany({
      where: {
        date: {
          gte: startDate,
          lt: endDate,
        },
        userId: session.user.id,
      },
      include: {
        category: true, // Include the category details in the result
      },
    });

    // Calculate total income and expenses for the current month
    const totalIncome = transactions
      .filter((transaction) => transaction.transactionType === "income")
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

    const totalExpenses = transactions
      .filter((transaction) => transaction.transactionType === "expense")
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

    // Push the data for the current month into the array
    monthlyFinancials.push({
      totalIncome,
      totalExpenses,
      transactions,
    });
  }

  return monthlyFinancials;
}
