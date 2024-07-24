"use client";

import React, { useState, FormEvent, useEffect } from "react";
import CategoryCard from "@/app/components/CategoryCard";
import { getReceiptDetails } from "./actions";

type TransactionType = "income" | "expense";

type Category =
  | "Food"
  | "Transport"
  | "Entertainment"
  | "Travel"
  | "Bills"
  | "Work"
  | "Investments"
  | "default";

type CategoryColors = {
  [key in Category]: {
    bgColor: string;
    badgeColor: string;
  };
};

const categoryColors: CategoryColors = {
  Food: { bgColor: "bg-green-500", badgeColor: "bg-green-300" },
  Transport: { bgColor: "bg-sky-500", badgeColor: "bg-sky-300" },
  Entertainment: { bgColor: "bg-orange-500", badgeColor: "bg-orange-300" },
  Travel: { bgColor: "bg-amber-500", badgeColor: "bg-amber-300" },
  Bills: { bgColor: "bg-lime-500", badgeColor: "bg-lime-300" },
  Work: { bgColor: "bg-stone-500", badgeColor: "bg-stone-300" },
  Investments: { bgColor: "bg-gray-500", badgeColor: "bg-gray-300" },
  default: { bgColor: "bg-primary-content", badgeColor: "bg-primary-content" },
};

const categories = [
  { name: "Food", icon: "🍔", color: "green" },
  { name: "Transport", icon: "🚊", color: "sky" },
  { name: "Entertainment", icon: "🎭", color: "orange" },
  { name: "Travel", icon: "🚀", color: "amber" },
  { name: "Bills", icon: "💵", color: "lime" },
  { name: "Work", icon: "💼", color: "stone" },
  { name: "Investments", icon: "📈", color: "gray" },
];

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

export default function TransactionPage() {
  const [transactionType, setTransactionType] =
    useState<TransactionType>("expense");
  const [category, setCategory] = useState<Category>("default");
  const [amount, setAmount] = useState<string>("0");
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [receipt, setReceipt] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>(
    categoryColors["default"].bgColor,
  );
  const [badgeColor, setBadgeColor] = useState<string>(
    categoryColors["default"].badgeColor,
  );

  useEffect(() => {
    const colors = categoryColors[category] || categoryColors["default"];
    setBgColor(colors.bgColor);
    setBadgeColor(colors.badgeColor);
  }, [category]);

  const addTransaction = (event: FormEvent) => {
    event.preventDefault();
    // Add logic to handle the form submission
    console.log({ transactionType, category, amount });
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^(0|[1-9]\d*)?(\.\d{0,2})?$/.test(value)) {
      setAmount(value);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length > 30) {
      return;
    }
    setTitle(value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDate(value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    if (value.length > 150) {
      return;
    }
    setDescription(value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return;
    }

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === "string") {
        console.log(reader.result); // Testing
        setReceipt(reader.result);
      }

      reader.onerror = (error) => {
        console.log("Error: " + error); // For Debugging
      };
    };
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (receipt === "") {
      return;
    }

    const receiptDetails = await getReceiptDetails(receipt);
    console.log(receiptDetails); // debugging

    setAmount(receiptDetails.amount);
    setTitle(receiptDetails.name);
    setDate(receiptDetails.date); // Need to fix
    setDescription(`Purchase from ${receiptDetails.name}.`);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="rounded-box shadow-lg p-10 w-4/5 flex flex-col gap-5 mb-20 md:my-10 xl:mt-20 xl:mb-10">
        <h1 className="text-2xl font-extrabold">Add New Transaction</h1>
        <div className="flex w-full flex-col">
          <div className="divider my-0"></div>
        </div>

        <form onSubmit={addTransaction} className={"flex flex-col gap-7"}>
          <div
            className={`rounded-xl w-full shadow-xl text-white max-w-4xl ${bgColor}`}
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
                    onClick={() => setTransactionType("expense")}
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
                    onClick={() => setTransactionType("income")}
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
                        document.getElementById(
                          "categoryModal",
                        ) as HTMLDialogElement
                      ).showModal()
                    }
                  >
                    {categories.find((c) => c.name === category)?.icon}
                  </button>
                  <dialog id="categoryModal" className="modal">
                    <div className="modal-box w-5/6 max-w-4xl text-black flex flex-col gap-5">
                      <h3 className="font-bold text-2xl">Categories</h3>
                      <div className="flex flex-row flex-wrap gap-6">
                        {categories.map((c, key) => (
                          <CategoryCard
                            icon={c.icon}
                            text={c.name}
                            color={categoryColors[c.name as Category].bgColor}
                            active={c.name === category}
                            key={key}
                            onClick={() => {
                              setCategory(c.name as Category);
                              return (
                                document.getElementById(
                                  "categoryModal",
                                ) as HTMLDialogElement
                              ).close();
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
                  <input
                    type="text"
                    className="grow min-w-0"
                    placeholder="Amount"
                    value={amount}
                    onChange={handleAmountChange}
                    required
                  />
                  <span
                    className={`badge badge-lg font-semibold border-gray-600 ${badgeColor} hidden md:inline-flex`}
                  >
                    CAD
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-x-20 gap-y-5">
            <label className="input input-bordered flex items-center gap-2 lg:w-1/2">
              <span className="font-semibold">Title</span>
              <input
                type="text"
                className="grow"
                placeholder="Walmart"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 lg:w-1/2">
              <span className="font-semibold">Date</span>
              <input
                type="date"
                className="grow"
                placeholder="Select date"
                min={"2024-01-01"}
                max={`${new Date().getFullYear() + 4}-12-31`}
                value={date}
                onChange={handleDateChange}
                required
              />
            </label>
          </div>

          <div className="flex flex-col gap-10">
            <textarea
              className="textarea textarea-bordered"
              placeholder="Description"
              value={description}
              onChange={handleDescriptionChange}
              required
            ></textarea>
            <button
              type="submit"
              className="btn w-full btn-primary text-white font-bold"
            >
              Finish
            </button>
          </div>
        </form>
        <form className="mt-5 lg:mt-10 flex flex-col" onSubmit={handleSubmit}>
          <h4 className="text-xl font-bold">Scan Receipt</h4>
          <div className="flex w-full flex-col my-1">
            <div className="divider my-0"></div>
          </div>
          <div className="flex flex-col gap-5 items-start lg:flex-row lg:justify-start">
            <input
              type="file"
              className="file-input file-input-primary file-input-bordered w-full file-input-sm max-w-full lg:max-w-xs lg:file-input-md"
              onChange={(e) => handleFileChange(e)}
            />
            <button
              className="btn btn-primary text-white btn-sm md:btn-md md:btn-wide"
              type="submit"
            >
              Analyze Receipt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
