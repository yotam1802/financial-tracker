"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getMonthlyFinancials } from "./actions";

interface Category {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  badgeColor: string;
  userId?: string | null;
}

interface Transaction {
  id: string;
  transactionType: string;
  categoryId: string;
  category: Category;
  amount: string;
  title: string;
  date: string;
  description: string;
  userId?: string | null;
}

interface Financials {
  totalIncome: number;
  totalExpenses: number;
  transactions: Transaction[];
}

export default function BudgetPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [financials, setFinancials] = useState<Financials>({
    totalIncome: 0,
    totalExpenses: 0,
    transactions: [],
  });

  useEffect(() => {
    const currentDate = new Date();
    const fetchFinancials = async () => {
      setIsLoading(true);
      const monthlyFinancials = await getMonthlyFinancials(
        currentDate.getFullYear().toString(),
        (currentDate.getMonth() + 1).toString()
      );
      setFinancials(monthlyFinancials);
      setIsLoading(false);
    };

    fetchFinancials();
  }, []);

  const chartData = {
    labels: ["Income", "Expenses", "Remaining"],
    datasets: [
      {
        label: "Amount in $",
        data: [
          financials.totalIncome,
          financials.totalExpenses,
          financials.totalIncome - financials.totalExpenses,
        ],
        backgroundColor: ["#4CAF50", "#F44336", "#FFEB3B"],
        hoverOffset: 4, // Adds spacing on hover
      },
    ],
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={`shadow-lg p-10 w-full flex flex-col gap-5 mb-10 md:w-4/5 md:rounded-box md:pb md:my-10 min-h-screen sm:min-h-fit xl:mt-20 bg-gray-100 transition-opacity ease-in-out duration-700 ${isLoading ? "opacity-60" : ""}`}
      >
        <div className="flex flex-col gap-y-3 gap-x-5 md:flex-row md:justify-between md:items-end">
          <h1 className="text-2xl font-extrabold">Budget</h1>
        </div>
        <div className="flex w-full flex-col">
          <div className="divider my-0"></div>
        </div>
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src={"/budget.svg"}
              alt="Budget Hero Image"
              width={1000}
              height={1000}
              className="w-[20rem]"
            />
            <div className="mx-5 mt-2">
              <h1 className="text-4xl font-bold">Your Monthly Budget</h1>
              <p className="py-6">
                Manage your finances effortlessly. Track your spending, analyze
                your income, and optimize your budget to reach your financial
                goals.
              </p>
              <Link
                className="btn btn-primary text-white"
                href={"/transactions"}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
        {
          // monthly spending, income and chartjs info
        }
        <div className="flex flex-row w-full mt-5 justify-center gap-x-10">
          <div>
            <h2 className="text-lg font-bold text-gray-700">Total Income</h2>
            <p className="text-xl font-semibold text-green-600">
              ${financials.totalIncome}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-700">Total Expenses</h2>
            <p className="text-xl font-semibold text-red-600">
              ${financials.totalExpenses}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-700">
              Remaining Budget
            </h2>
            <p className="text-xl font-semibold text-yellow-600">
              ${financials.totalIncome - financials.totalExpenses}
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full mt-10">
          {/* Cashflow during the month */}
          <div className="w-full lg:w-1/2 mt-10 lg:mt-0 lg:ml-10 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Budget Breakdown
            </h2>
          </div>

          {/* Expenses based on category*/}
          <div className="w-full lg:w-1/2 mt-10 lg:mt-0 lg:ml-10 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Budget Breakdown
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
