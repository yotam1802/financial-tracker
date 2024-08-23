"use client";

import Link from "next/link";
import { getCategories, removeCategory } from "./actions";
import { startTransition, useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  badgeColor: string;
  userId?: string;
  transactionCount: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      const categories = await getCategories();
      setCategories(categories);
      setIsLoading(false);
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={`shadow-lg p-10 w-full flex flex-col gap-5 mb-10 md:w-4/5 md:rounded-box md:pb md:my-10 min-h-screen sm:min-h-fit xl:mt-20 bg-gray-100 transition-opacity ease-in-out duration-700 ${isLoading ? "opacity-60" : ""}`}
      >
        <div className="flex flex-col gap-y-3 gap-x-5 md:flex-row md:justify-between md:items-end">
          <h1 className="text-2xl font-extrabold">Categories</h1>
          <Link
            href={"/categories/add-category"}
            className="btn btn-primary text-white md:btn-circle btn-wide md:w-52"
          >
            Add Category
          </Link>
        </div>
        <div className="flex w-full flex-col">
          <div className="divider my-0"></div>
        </div>
        <div className="flex w-full flex-col gap-5">
          {categories.map((category, key) => {
            return (
              <div
                className={`${category.bgColor} flex gap-5 rounded-3xl p-2 md:p-3 justify-between items-center`}
                key={key}
              >
                <div className="flex gap-4 md:gap-5 lg:gap-7 items-center">
                  <div className="text-2xl md:text-3xl bg-slate-300 w-fit rounded-full p-2 md:p-3 ml-1 md:ml-2">
                    {category.icon}
                  </div>
                  <div className="flex flex-col text-white">
                    <div className="font-bold text-md md:text-lg">
                      {category.name}
                    </div>
                    <div className="font-semibold text-gray-100 text-sm md:text-md">
                      {category.transactionCount} transactions
                    </div>
                  </div>
                </div>
                <button
                  className="text-white mr-5 lg:mr-10"
                  onClick={(e) => {
                    startTransition(async () => {
                      setIsLoading(true);
                      await removeCategory(category.id);
                      setCategories((prevCategories) =>
                        prevCategories.filter((c) => c.id !== category.id)
                      );
                      setIsLoading(false);
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 hover:text-gray-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {isLoading && (
        <span className="loading loading-dots w-24 lg:w-32 fixed flex items-center justify-center h-full"></span>
      )}
    </div>
  );
}
