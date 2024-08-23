"use client";

import React, { useState, FormEvent, useEffect, useTransition } from "react";
import CategoryCard from "@/app/components/CategoryCard";
import { getReceiptDetails, addTransaction, getCategories } from "./actions";
import { useRouter } from "next/navigation";

type TransactionType = "income" | "expense";

// const categoryColors: CategoryColors = {
//   Food: { bgColor: "bg-green-500", badgeColor: "bg-green-300" },
//   Transport: { bgColor: "bg-sky-500", badgeColor: "bg-sky-300" },
//   Entertainment: { bgColor: "bg-orange-500", badgeColor: "bg-orange-300" },
//   Travel: { bgColor: "bg-amber-500", badgeColor: "bg-amber-300" },
//   Bills: { bgColor: "bg-lime-500", badgeColor: "bg-lime-300" },
//   Work: { bgColor: "bg-stone-500", badgeColor: "bg-stone-300" },
//   Investments: { bgColor: "bg-gray-500", badgeColor: "bg-gray-300" },
//   general: { bgColor: "bg-primary-content", badgeColor: "bg-primary-content" },
// };

// const categories = [
//   { name: "Food", icon: "🍔", color: "green" },
//   { name: "Transport", icon: "🚊", color: "sky" },
//   { name: "Entertainment", icon: "🎭", color: "orange" },
//   { name: "Travel", icon: "🚀", color: "amber" },
//   { name: "Bills", icon: "💵", color: "lime" },
//   { name: "Work", icon: "💼", color: "stone" },
//   { name: "Investments", icon: "📈", color: "gray" },
// ];

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

interface Category {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  badgeColor: string;
  userId?: string;
}

export default function TransactionPage() {
  const [isPending, startTransition] = useTransition();
  const [transactionType, setTransactionType] =
    useState<TransactionType>("expense");
  const [categorySelected, setCategorySelected] = useState<Category>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [amount, setAmount] = useState<string>("0");
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [receipt, setReceipt] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("bg-primary-content");
  const [badgeColor, setBadgeColor] = useState<string>("bg-primary-content");
  const router = useRouter();

  useEffect(() => {
    startTransition(async () => {
      const categories = await getCategories();
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    if (categorySelected) {
      setBgColor(categorySelected.bgColor);
      setBadgeColor(categorySelected.badgeColor);
    }
  }, [categorySelected]);

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
    event: React.ChangeEvent<HTMLTextAreaElement>
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

  const analyzeReceipt = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (receipt === "") {
      return;
    }

    startTransition(async () => {
      const receiptDetails = await getReceiptDetails(receipt);

      setAmount(receiptDetails.amount);
      setTitle(receiptDetails.name);
      setDate(receiptDetails.date); // Need to fix
      setDescription(receiptDetails.description);
    });
  };

  const submitTransaction = async (event: FormEvent) => {
    event.preventDefault();

    if (!categorySelected) {
      return;
    }

    startTransition(async () => {
      await addTransaction(
        transactionType,
        categorySelected,
        amount,
        title,
        date,
        description
      );
    });
    router.push("/transactions");
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={`shadow-lg p-10 w-full flex flex-col gap-5 mb-10 md:w-4/5 md:rounded-box md:my-10 xl:mt-20 xl:mb-10 bg-gray-100 transition-opacity ease-in-out duration-700 ${isPending ? "opacity-60" : ""}`}
      >
        <h1 className="text-2xl font-extrabold">Add New Transaction</h1>
        <div className="flex w-full flex-col">
          <div className="divider my-0"></div>
        </div>

        <form onSubmit={submitTransaction} className={"flex flex-col gap-7"}>
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
                    disabled={isPending}
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
                    disabled={isPending}
                  />
                </label>
              </div>
            </div>
            <div className="mb-4 flex w-full items-center justify-between flex-wrap px-10 gap-x-10 gap-y-2">
              <div className="flex-grow-0">
                <label className="block">
                  <button
                    type="button"
                    className="btn h-14 w-16 text-3xl bg-gray-800 border-gray-800 hover:bg-gray-800 hover:border-gray-800 disabled:cursor-none disabled:bg-opacity-100 disabled:text-black disabled:bg-gray-800 disabled:hover:bg-gray-800 disabled:hover:text-black"
                    disabled={isPending}
                    onClick={() =>
                      (
                        document.getElementById(
                          "categoryModal"
                        ) as HTMLDialogElement
                      ).showModal()
                    }
                  >
                    {categorySelected?.icon}
                  </button>
                  <dialog id="categoryModal" className="modal">
                    <div className="modal-box w-5/6 max-w-4xl text-black flex flex-col gap-5">
                      <h3 className="font-bold text-2xl">Categories</h3>
                      <div className="flex flex-row flex-wrap gap-6">
                        {categories.map((c, key) => (
                          <CategoryCard
                            icon={c.icon}
                            text={c.name}
                            color={c.bgColor}
                            active={c == categorySelected}
                            key={key}
                            onClick={() => {
                              setCategorySelected(c);
                              return (
                                document.getElementById(
                                  "categoryModal"
                                ) as HTMLDialogElement
                              ).close();
                            }}
                          />
                        ))}
                      </div>
                      <div className="modal-action">
                        <div>
                          <button
                            type="button"
                            className="btn"
                            onClick={() =>
                              (
                                document.getElementById(
                                  "categoryModal"
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
                    disabled={isPending}
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
                className="grow overflow-hidden"
                placeholder="Walmart"
                value={title}
                onChange={handleTitleChange}
                required
                disabled={isPending}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 lg:w-1/2">
              <span className="font-semibold">Date</span>
              <input
                type="date"
                className="grow overflow-hidden"
                placeholder="Select date"
                min={"2024-01-01"}
                max={`${new Date().getFullYear() + 4}-12-31`}
                value={date}
                onChange={handleDateChange}
                required
                disabled={isPending}
              />
            </label>
          </div>

          <div className="flex flex-col gap-10">
            <textarea
              className="textarea textarea-bordered overflow-hidden"
              placeholder="Description"
              value={description}
              onChange={handleDescriptionChange}
              required
              disabled={isPending}
            ></textarea>
            <button
              type="submit"
              className="btn w-32 md:btn-wide lg:w-96 btn-primary text-white font-bold mx-auto"
              disabled={isPending}
            >
              Finish
            </button>
          </div>
        </form>
        <form className="mt-5 lg:mt-10 flex flex-col" onSubmit={analyzeReceipt}>
          <h4 className="text-xl font-bold">Scan Receipt</h4>
          <div className="flex w-full flex-col my-1">
            <div className="divider my-0"></div>
          </div>
          <div className="flex flex-col gap-5 items-start lg:flex-row lg:justify-start">
            <input
              type="file"
              className="file-input file-input-primary file-input-bordered w-full file-input-sm max-w-full lg:max-w-xs lg:file-input-md"
              onChange={(e) => handleFileChange(e)}
              disabled={isPending}
            />
            <button
              className="btn btn-primary text-white btn-sm w-36 md:btn-wide lg:btn-md"
              type="submit"
              disabled={isPending}
            >
              Scan
            </button>
          </div>
        </form>
      </div>
      {isPending && (
        <span className="loading loading-dots w-24 lg:w-32 fixed flex items-center justify-center h-full"></span>
      )}
    </div>
  );
}
