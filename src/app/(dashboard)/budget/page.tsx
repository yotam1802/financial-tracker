"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getMonthlyFinancials } from "./actions";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale
);

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

const months = [
  "Jan 1st - Jan 31st",
  "Feb 1st - Feb 28th",
  "Mar 1st - Mar 31st",
  "Apr 1st - Apr 30th",
  "May 1st - May 31st",
  "Jun 1st - Jun 30th",
  "Jul 1st - Jul 31st",
  "Aug 1st - Aug 31st",
  "Sept 1st - Sept 30th",
  "Oct 1st - Oct 31st",
  "Nov 1st - Nov 30th",
  "Dec 1st - Dec 31st",
];

// Function to map Tailwind class names to hex colors
const tailwindColorMap = (tailwindClass: string) => {
  const colorMap: { [key: string]: string } = {
    "bg-primary-content": "#cee4ff",
    "bg-violet-500": "#8b5cf6",
    "bg-violet-300": "#c4b5fd",
    "bg-indigo-500": "#6366f1",
    "bg-indigo-300": "#a5b4fc",
    "bg-blue-500": "#3b82f6",
    "bg-blue-300": "#93c5fd",
    "bg-sky-500": "#0ea5e9",
    "bg-sky-300": "#7dd3fc",
    "bg-teal-500": "#14b8a6",
    "bg-teal-300": "#5eead4",
    "bg-emerald-500": "#10b981",
    "bg-emerald-300": "#6ee7b7",
    "bg-green-500": "#22c55e",
    "bg-green-300": "#86efac",
    "bg-lime-500": "#84cc16",
    "bg-lime-300": "#bef264",
    "bg-stone-500": "#78716c",
    "bg-stone-300": "#d6d3d1",
    "bg-gray-500": "#6b7280",
    "bg-gray-300": "#d1d5db",
    "bg-yellow-500": "#eab308",
    "bg-yellow-300": "#fde047",
    "bg-amber-500": "#f59e0b",
    "bg-amber-300": "#fcd34d",
    "bg-orange-500": "#f97316",
    "bg-orange-300": "#fdba74",
    "bg-red-500": "#ef4444",
    "bg-red-300": "#fca5a5",
  };

  return colorMap[tailwindClass] || "#000000"; // Default to black if no match found
};

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

  // Helper function to format the date as "MMM DD"
  const formatDate = (day: number) => {
    const date = new Date(new Date().getFullYear(), new Date().getMonth(), day);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Group transactions by day and calculate the net cash flow for each day
  const dailyNetCashflow = () => {
    const daysInMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();
    const netCashflowPerDay: { [key: number]: number } = {};

    // Initialize each day's net cash flow to 0
    for (let day = 1; day <= daysInMonth; day++) {
      netCashflowPerDay[day] = 0;
    }

    // Calculate net cash flow (Income - Expenses)
    financials.transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date + "T00:00:00");
      const day = transactionDate.getDate();
      const amount = parseFloat(transaction.amount);
      if (transaction.transactionType === "income") {
        netCashflowPerDay[day] += amount;
      } else if (transaction.transactionType === "expense") {
        netCashflowPerDay[day] -= amount;
      }
    });

    return netCashflowPerDay;
  };

  const netCashflowPerDay = dailyNetCashflow();

  // Filter out days that have no transactions
  const daysWithTransactions = Object.keys(netCashflowPerDay)
    .filter((day) => netCashflowPerDay[Number(day)] !== 0)
    .map((day) => formatDate(Number(day)));
  const netCashflowAmounts = Object.entries(netCashflowPerDay)
    .filter(([_, amount]) => amount !== 0)
    .map(([_, amount]) => amount);

  const netCashflowColors = netCashflowAmounts.map((amount) =>
    amount >= 0 ? "#4CAF50" : "#F44336"
  );

  const netCashflowData = {
    labels: daysWithTransactions,
    datasets: [
      {
        label: "Net Cashflow Per Day",
        data: netCashflowAmounts,
        backgroundColor: netCashflowColors,
        borderColor: netCashflowColors,
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    scales: {
      y: {
        type: "linear" as const,
        ticks: {
          callback: (value: number | string) => {
            const numValue = Number(value);
            return `${numValue < 0 ? "-" : ""}$${Math.abs(numValue).toFixed(2)}`;
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `Net Cashflow: ${value < 0 ? "-" : ""}$${Math.abs(value).toFixed(2)}`;
          },
        },
      },
    },
  };

  // Function to group transactions by category and sum their amounts
  const groupTransactionsByCategory = (transactions: Transaction[]) => {
    const categoryMap: {
      [key: string]: { totalAmount: number; bgColor: string };
    } = {};

    transactions.forEach((transaction) => {
      const categoryName = transaction.category.name;
      const amount = parseFloat(transaction.amount);

      if (!categoryMap[categoryName]) {
        // Initialize if category is not yet in the map
        categoryMap[categoryName] = {
          totalAmount: amount,
          bgColor: tailwindColorMap(transaction.category.bgColor),
        };
      } else {
        // Sum amounts if category already exists in the map
        categoryMap[categoryName].totalAmount += amount;
      }
    });

    return categoryMap;
  };

  // Filter out only the expense transactions
  const expenseTransactions = financials.transactions.filter(
    (t) => t.transactionType === "expense"
  );

  // Group transactions by category
  const groupedExpenses = groupTransactionsByCategory(expenseTransactions);

  // Prepare data for the pie chart
  const expenseCategories = Object.keys(groupedExpenses);
  const expenseAmounts = Object.values(groupedExpenses).map(
    (group) => group.totalAmount
  );
  const expenseBackgroundColors = Object.values(groupedExpenses).map(
    (group) => group.bgColor
  );

  const expensesByCategoryData = {
    labels: expenseCategories,
    datasets: [
      {
        label: "Expenses",
        data: expenseAmounts,
        backgroundColor: expenseBackgroundColors,
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw as number;
            return `Expenses: $${value.toFixed(2)}`; // Adding $ sign
          },
        },
      },
    },
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={`shadow-lg p-10 w-full flex flex-col mb-10 md:w-4/5 md:rounded-box md:pb md:my-10 min-h-screen sm:min-h-fit xl:mt-20 bg-gray-100 transition-opacity ease-in-out duration-700 ${isLoading ? "opacity-60" : ""}`}
      >
        <div className="flex flex-col gap-y-3 gap-x-5 md:flex-row md:justify-between md:items-end">
          <h1 className="text-2xl font-extrabold">Budget</h1>
        </div>
        <div className="flex w-full flex-col mb-5">
          <div className="divider my-0"></div>
        </div>
        <div className="hero md:hidden xl:block">
          <div className="hero-content flex-col xl:flex-row">
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
        <div className="flex items-center justify-center md:justify-start gap-x-7">
          <div className="stats stats-vertical xl:stats-horizontal shadow min-w-fit">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z"
                    clipRule="evenodd"
                  />
                  <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                </svg>
              </div>
              <div className="stat-title">Income</div>
              <div className="stat-value">
                ${financials.totalIncome.toFixed(2)}
              </div>
              <div className="stat-desc">
                Period: {months[new Date().getMonth()]}
              </div>
            </div>

            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                  <path
                    fillRule="evenodd"
                    d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="stat-title">Expenses</div>
              <div className="stat-value">
                ${financials.totalExpenses.toFixed(2)}
              </div>
              <div className="stat-desc">
                Last Updated:{" "}
                {(new Date().getMonth() + 1).toString().padStart(2, "0")}/
                {new Date().getDate().toString().padStart(2, "0")}/
                {new Date().getFullYear()}
              </div>
            </div>

            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="stat-title">Remaining Budget</div>
              <div className="stat-value">
                $
                {(financials.totalIncome - financials.totalExpenses).toFixed(2)}
              </div>
              <div className="stat-desc">
                Total Transactions: {financials.transactions.length}
              </div>
            </div>
          </div>
          <div className="flex-col gap-y-5 mb-0 hidden md:flex xl:hidden">
            <Image
              src={"/budget.svg"}
              alt="Budget Hero Image"
              width={1000}
              height={1000}
              className="w-[14rem]"
            />
            <p>
              Manage your finances effortlessly. Track your spending, analyze
              your income, and optimize your budget to reach your financial
              goals.
            </p>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row w-full xl:mt-5 justify-center gap-x-5">
          {/* Cashflow during the month */}
          <div className="w-full xl:w-1/2 mt-5 xl:mt-0 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Net Cashflow Per Day
            </h2>
            <div className="h-64 md:h-80 xl:h-96">
              <Bar
                data={netCashflowData}
                options={{ ...barChartOptions, maintainAspectRatio: false }}
              />
            </div>
          </div>

          {/* Expenses based on category*/}
          <div className="w-full xl:w-1/2 mt-5 xl:mt-0 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Monthly Expenses By Category
            </h2>
            <div className="h-64 md:h-80 xl:h-96">
              <Pie
                data={expensesByCategoryData}
                options={{ ...pieChartOptions, maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
