"use client";

import React, { useState, FormEvent } from "react";
import CategoryCard from "./CategoryCard";

type TransactionFormProps = {};

type TransactionType = "income" | "expense";

export default function TransactionForm() {
  const [transactionType, setTransactionType] =
    useState<TransactionType>("expense");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const categories = [
    { name: "Food", icon: "🍔", color: "green" },
    { name: "Transport", icon: "🚊", color: "sky" },
    { name: "Entertainment", icon: "🎭", color: "orange" },
    { name: "Travel", icon: "🚀", color: "amber" },
    { name: "Bills", icon: "💵", color: "lime" },
    { name: "Work", icon: "💼", color: "stone" },
    { name: "Investments", icon: "📈", color: "gray" },
  ];

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

  const color = categories.find(c => c.name === category) ? categories.find(c => c.name === category)?.color : "bg-primary-content"

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-xl w-full shadow-xl text-white max-w-4xl bg-${color}-500`}
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
      <div className="mb-4 flex w-full items-center justify-between flex-wrap px-10 gap-x-10 gap-y-2">
        <div className="flex-grow-0">
          <label className="block">
            <button
              className="btn h-14 w-16 text-3xl bg-gray-800 border-gray-800 hover:bg-gray-800 hover:border-gray-800"
              onClick={() =>
                (
                  document.getElementById("categoryModal") as HTMLDialogElement
                ).showModal()
              }
            >
                {categories.find(c => c.name === category)?.icon}
            </button>
            <dialog id="categoryModal" className="modal">
              <div className="modal-box w-5/6 max-w-4xl text-black flex flex-col gap-5">
                <h3 className="font-bold text-2xl">Categories</h3>
                <div className="flex flex-row flex-wrap gap-6">
                  {categories.map((c, key) => (
                    <CategoryCard
                      icon={c.icon}
                      text={c.name}
                      color={c.color}
                      active={c.name === category}
                      key={key}
                      onClick={() => {
                        setCategory(c.name)
                        return (document.getElementById("categoryModal") as HTMLDialogElement).close()
                      }}
                    />
                  ))}
                </div>
                <div className="modal-action">
                  <div>
                    <button
                      className="btn"
                      onClick={() =>
                        (
                          document.getElementById(
                            "categoryModal",
                          ) as HTMLDialogElement
                        ).close()
                      }
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </dialog>
          </label>
        </div>
        <div className="w-full max-w-3xl flex-1">
          <label className="input input-bordered flex items-center text-black lg:input-lg lg:w-full lg:max-w-2xl">
            <span className="mr-2 text-xl font-semibold">$</span>
            <input type="text" className="grow min-w-0" placeholder="Amount" />
            <span
              className={`badge badge-lg font-semibold border-gray-600 bg-${color}-300 invisible md:visible`}
            >
              CAD
            </span>
          </label>
        </div>
      </div>
    </form>
  );
}
