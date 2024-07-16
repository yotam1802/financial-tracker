"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

type TransactionFormProps = {};

type TransactionType = "income" | "expense";
type CategoryType = "default" | "food" | "transport" | "entertainment";

export default function TransactionForm() {
  const [transactionType, setTransactionType] =
    useState<TransactionType>("expense");
  const [category, setCategory] = useState<CategoryType>("default");
  const [amount, setAmount] = useState<string>("");

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTransactionType(event.target.value as TransactionType);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value as CategoryType);
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Add logic to handle the form submission
    console.log({ transactionType, category, amount });
  };

  const expenseArrow = (
    <svg
      fill="#000000"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      width="10px"
      height="10px"
      viewBox="0 0 96.154 96.154"
      className="fill-red-500"
    >
      <g>
        <path
          d="M0.561,20.971l45.951,57.605c0.76,0.951,2.367,0.951,3.127,0l45.956-57.609c0.547-0.689,0.709-1.716,0.414-2.61
		c-0.061-0.187-0.129-0.33-0.186-0.437c-0.351-0.65-1.025-1.056-1.765-1.056H2.093c-0.736,0-1.414,0.405-1.762,1.056
		c-0.059,0.109-0.127,0.253-0.184,0.426C-0.15,19.251,0.011,20.28,0.561,20.971z"
        />
      </g>
    </svg>
  );

  const incomeArrow = (
    <svg
      fill="#000000"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      width="10px"
      height="10px"
      viewBox="0 0 96.154 96.154"
      className="fill-green-500 transform rotate-180"
    >
      <g>
        <path
          d="M0.561,20.971l45.951,57.605c0.76,0.951,2.367,0.951,3.127,0l45.956-57.609c0.547-0.689,0.709-1.716,0.414-2.61
		c-0.061-0.187-0.129-0.33-0.186-0.437c-0.351-0.65-1.025-1.056-1.765-1.056H2.093c-0.736,0-1.414,0.405-1.762,1.056
		c-0.059,0.109-0.127,0.253-0.184,0.426C-0.15,19.251,0.011,20.28,0.561,20.971z"
        />
      </g>
    </svg>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-xl w-full shadow-xl text-white max-w-4xl ${category === "food" ? "bg-green-500" : category === "transport" ? "bg-blue-500" : category === "entertainment" ? "bg-orange-500" : "bg-primary-content"}`}
    >
      <div className="mb-4 w-full">
        <div className="join w-full bg-slate-400">
          <label className="label cursor-pointer flex-1 p-0 join-item btn rounded-b-none justify-center opacity-40 has-[:checked]:opacity-100 font-bold">
            <span>{expenseArrow}</span>
            <span>Expense</span>
            <input
              className="invisible w-0"
              type="radio"
              name="transactionType"
              value="Expense"
              defaultChecked
            />
          </label>
          <label className="label cursor-pointer flex-1 p-0 join-item btn rounded-b-none justify-center opacity-40 has-[:checked]:opacity-100 font-bold">
            <span>{incomeArrow}</span>
            <span>Income</span>
            <input
              className="invisible w-0"
              type="radio"
              name="transactionType"
              value="Income"
            />
          </label>
        </div>
      </div>
      <div className="mb-4 flex w-full mx-5 gap-5">
        <div>
          <label className="block">
            <select
              value={category}
              className="select select-bordered select-lg h-20 bg-black text-5xl focus:outline-none"
              onChange={handleCategoryChange}
            >
              <option value="default"></option>
              <option value="food">🍔</option>
              <option value="transport">🚊</option>
              <option value="entertainment" title="Entertainment">🎭</option>
              {/* Add more categories as needed */}
            </select>
          </label>
        </div>
        <div className="">b</div>
      </div>
    </form>
  );
}
