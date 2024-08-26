"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

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
  const [month, setMonth] = useState();
  const [year, setYear] = useState(new Date().getFullYear());

  const currentYear = new Date().getFullYear();
  const yearsArray = Array.from(
    { length: 10 },
    (_, index) => currentYear - index
  );

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
        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full">
              <input
                type="range"
                min={10}
                max="120"
                defaultValue={70}
                className="range range-primary"
                step="10"
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
            <select className="select select-bordered font-semibold w-full max-w-xs">
              <option disabled value={year}>
                Select a year
              </option>
              {yearsArray.map((year, key) => (
                <option key={key}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {isPending && (
        <span className="loading loading-dots w-24 lg:w-32 fixed flex items-center justify-center h-full"></span>
      )}
    </div>
  );
}
