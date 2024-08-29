"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { getTransactions, removeTransaction } from "./actions";
import emptySVG from "../../../../public/empty.svg";
import transactionSVG from "../../../../public/transaction.svg";
import Image from "next/image";
import ExcelJS from "exceljs";

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

export default function TransactionPage() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [isPending, startTransition] = useTransition();
  const [month, setMonth] = useState<string>("7");
  const [year, setYear] = useState<string>(`${new Date().getFullYear()}`);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    startTransition(async () => {
      const transactions = await getTransactions(year, month);
      setTransactions(transactions);
    });
  }, [month, year]);

  const currentYear = new Date().getFullYear();
  const yearsArray = Array.from(
    { length: 10 },
    (_, index) => currentYear - index
  );

  const groupedTransactions = transactions.reduce(
    (groups: Record<string, Transaction[]>, transaction) => {
      const date = transaction.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    },
    {}
  );

  const sortedDates = Object.keys(groupedTransactions).sort();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const exportToExcel = async () => {
    const maxDescriptionLength = 50;

    const formattedTransactions = transactions.map((transaction) => ({
      Date: transaction.date,
      Title: transaction.title,
      Amount:
        transaction.transactionType === "expense"
          ? -Math.abs(parseFloat(transaction.amount)) // Negative for expenses
          : Math.abs(parseFloat(transaction.amount)), // Positive for income
      Category: transaction.category.name,
      Type: transaction.transactionType,
      Description:
        transaction.description.length > maxDescriptionLength
          ? transaction.description.substring(0, maxDescriptionLength) + "..."
          : transaction.description,
    }));

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Transactions");

    worksheet.columns = [
      { header: "Date", key: "Date", width: 15 },
      { header: "Title", key: "Title", width: 30 },
      {
        header: "Amount",
        key: "Amount",
        width: 18, // Increased width for more space
        style: { numFmt: "[$$-409]#,##0.00;[Red]-[$$-409]#,##0.00" }, // Standard currency format
      },
      { header: "Category", key: "Category", width: 20 },
      { header: "Type", key: "Type", width: 15 },
      { header: "Description", key: "Description", width: 50 },
    ];

    // Bold the headers and center align
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    worksheet.addRows(formattedTransactions);

    // Center align all cells in the worksheet
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = { vertical: "middle", horizontal: "center" };
      });
    });

    // Set column widths dynamically, except for Amount
    worksheet.columns.forEach((column) => {
      if (column.key !== "Amount" && column.eachCell) {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, (cell) => {
          const cellValue = cell.value ? cell.value.toString() : "";
          maxLength = Math.max(maxLength, cellValue.length);
        });
        column.width = maxLength + 2; // Add some padding
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], { type: "application/octet-stream" });

    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Transactions_${year}_${month}.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={`shadow-lg p-10 w-full flex flex-col gap-5 mb-10 md:w-4/5 md:rounded-box md:pb md:my-10 min-h-screen sm:min-h-fit xl:mt-20 bg-gray-100 transition-opacity ease-in-out duration-700 ${isPending ? "opacity-60" : ""}`}
      >
        <div className="flex flex-col gap-y-3 gap-x-5 md:flex-row md:justify-between md:items-end">
          <h1 className="text-2xl font-extrabold">Transactions</h1>
          <Link
            href={"/transactions/add-transaction"}
            className="btn btn-primary text-white md:btn-circle btn-wide md:w-52"
          >
            Add Transaction
          </Link>
        </div>
        <div className="flex w-full flex-col">
          <div className="divider my-0"></div>
        </div>
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src={transactionSVG}
              alt="Transaction Image"
              width={1000}
              height={1000}
              className="max-w-[16rem]"
            />
            <div>
              <h1 className="text-4xl font-bold">
                {months[Number(month) - 1]}, {year}
              </h1>
              <p className="py-6">
                View and manage all your transactions for the selected month and
                year. Easily track your income and expenses, categorize
                transactions, and stay on top of your financial health.
              </p>
              <Link className="btn btn-primary text-white" href={"#content"}>
                View Transactions
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full">
              <input
                type="range"
                min="1"
                max="12"
                value={month}
                className="range range-primary"
                step="1"
                onChange={(e) => setMonth(e.target.value)}
              />
              <div className="flex w-full justify-between px-2 text-xs">
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
              </div>
            </div>
            <select
              className="select select-bordered font-semibold w-full max-w-xs"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option disabled>Select a year</option>
              {yearsArray.map((year, key) => (
                <option key={key}>{year}</option>
              ))}
            </select>
          </div>
          <div className="my-10" id="content">
            {transactions.length !== 0 ? (
              sortedDates.map((date) => (
                <div key={date}>
                  <h3 className="text-xl font-bold tracking-wide my-3">
                    {formatDate(date)}
                  </h3>
                  <ul className="bg-gray-100 p-2 rounded-lg flex flex-col gap-3">
                    {groupedTransactions[date].map((transaction) => (
                      <li
                        key={transaction.id}
                        className={`flex flex-row shadow-lg justify-between gap-3 md:gap-10 md:items-center p-2 md:p-4 rounded-lg transition-transform transform hover:scale-105 border-l-8 ${transaction.transactionType === "income" ? "border-green-500" : "border-red-500"}`}
                      >
                        <div className="flex items-center mb-0 gap-x-3 md:gap-x-4">
                          <div className="flex flex-col justify-center items-center gap-y-1">
                            <div
                              className={`text-3xl flex items-center flex-shrink-0 justify-center w-12 h-12 rounded-full ${transaction.category.bgColor}`}
                            >
                              {transaction.category.icon}
                            </div>
                            <button
                              className="btn btn-xs bg-red-600 text-white hover:bg-red-500"
                              onClick={(e) => {
                                startTransition(async () => {
                                  removeTransaction(transaction.id);
                                });
                                setTransactions(
                                  transactions.filter(
                                    (t) => t.id !== transaction.id
                                  )
                                );
                              }}
                            >
                              Delete
                            </button>
                          </div>

                          <div className="mt-0 pt-0">
                            <h4 className="font-semibold text-lg text-gray-900">
                              {transaction.title}
                            </h4>
                            <p className="text-sm text-gray-500 max-w-full">
                              {transaction.description}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {transaction.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-left mb-1 flex flex-col items-center justify-center">
                          <p
                            className={`text-lg font-bold ${
                              transaction.transactionType === "income"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.transactionType === "income"
                              ? "+"
                              : "-"}
                            ${transaction.amount}
                          </p>
                          <span
                            className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${transaction.category.badgeColor} text-gray-800`}
                          >
                            {transaction.category.name}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-3">
                <Image
                  src={emptySVG}
                  alt="No results"
                  width={1000}
                  height={1000}
                  className="max-w-[13rem] md:max-w-[16rem]"
                />
                <p className="font-semibold text-xs md:text-sm">
                  No transactions found for {months[Number(month) - 1]}, {year}.
                </p>
              </div>
            )}
          </div>
          {transactions.length !== 0 ? (
            <button
              className="btn btn-primary text-white w-44 md:btn-wide btn-md ml-1"
              type="submit"
              disabled={isPending}
              onClick={exportToExcel}
            >
              Export Data to Excel
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      {isPending && (
        <span className="loading loading-dots w-24 lg:w-32 fixed flex items-center justify-center h-full"></span>
      )}
    </div>
  );
}
