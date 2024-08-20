"use client";

import { Categories, EmojiClickData } from "emoji-picker-react";
import { SetStateAction, useEffect, useState, useTransition } from "react";
import dynamic from "next/dynamic";

export default function CategoriesPage() {
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState({
    bgColor: "bg-primary-content",
    badgeColor: "bg-primary-content",
  });
  const [isPending, startTransition] = useTransition();

  const colors = [
    {
      bgColor: "bg-primary-content",
      badgeColor: "bg-primary-content",
    },
    {
      bgColor: "bg-indigo-500",
      badgeColor: "bg-indigo-300",
    },
    {
      bgColor: "bg-blue-500",
      badgeColor: "bg-blue-300",
    },
    {
      bgColor: "bg-violet-500",
      badgeColor: "bg-violet-300",
    },
    {
      bgColor: "bg-sky-500",
      badgeColor: "bg-sky-300",
    },
    {
      bgColor: "bg-teal-500",
      badgeColor: "bg-teal-300",
    },
    {
      bgColor: "bg-emerald-500",
      badgeColor: "bg-emerald-300",
    },
    {
      bgColor: "bg-green-500",
      badgeColor: "bg-green-300",
    },
    {
      bgColor: "bg-lime-500",
      badgeColor: "bg-lime-300",
    },
    {
      bgColor: "bg-stone-500",
      badgeColor: "bg-stone-300",
    },
    {
      bgColor: "bg-gray-500",
      badgeColor: "bg-gray-300",
    },
    {
      bgColor: "bg-yellow-500",
      badgeColor: "bg-yellow-300",
    },
    {
      bgColor: "bg-amber-500",
      badgeColor: "bg-amber-300",
    },
    {
      bgColor: "bg-orange-500",
      badgeColor: "bg-orange-300",
    },
    {
      bgColor: "bg-red-500",
      badgeColor: "bg-red-300",
    },
  ];

  const Picker = dynamic(
    () => {
      return import("emoji-picker-react");
    },
    { ssr: false }
  );

  const handleIconChange = (emoji: EmojiClickData) => {
    console.log(emoji);
    if (emoji.emoji == "🫐" || emoji.emoji == "🛝") {
      return setTimeout(() => {
        const modal = document.getElementById("iconModal") as HTMLDialogElement;
        if (modal) {
          modal.close();
        }
      }, 0);
    }

    setIcon(emoji.emoji);
    return setTimeout(() => {
      const modal = document.getElementById("iconModal") as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
    }, 0);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={`shadow-lg p-10 w-full flex flex-col gap-5 mb-10 md:w-4/5 md:rounded-box md:my-10 xl:mt-20 xl:mb-10 bg-gray-50`}
      >
        <h1 className="text-2xl font-extrabold">Add New Category</h1>
        <div className="flex w-full flex-col">
          <div className="divider my-0"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-x-10 gap-y-4 flex-grow-0">
          <label>
            <button
              type="button"
              className={`btn h-16 w-20 text-4xl md:h-20 md:w-24 md:text-5xl rounded-2xl ${color.bgColor} border-gray-200 hover:${color.badgeColor} hover:border-gray-200 disabled:cursor-none disabled:bg-opacity-100 disabled:text-black disabled:${color.bgColor} disabled:hover:${color.badgeColor} disabled:hover:text-black`}
              disabled={isPending}
              onClick={() =>
                (
                  document.getElementById("iconModal") as HTMLDialogElement
                ).showModal()
              }
            >
              {icon ? icon : ""}
            </button>
            <dialog id="iconModal" className="modal">
              <div className="modal-box w-5/6 max-w-4xl text-black flex flex-col gap-5">
                <h3 className="font-bold text-2xl">Icons</h3>
                <div role="alert" className="alert border border-slate-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-sky-500 h-6 w-6 shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>Choose an icon to display your new category.</span>
                </div>
                <div className="flex">
                  <Picker
                    onEmojiClick={handleIconChange}
                    skinTonesDisabled={true}
                    categories={[
                      {
                        category: "food_drink" as Categories,
                        name: "Food and Beverages",
                      },
                      {
                        category: "travel_places" as Categories,
                        name: "Travel",
                      },
                      {
                        category: "activities" as Categories,
                        name: "Activities",
                      },
                      {
                        category: "objects" as Categories,
                        name: "Objects",
                      },
                    ]}
                    width={"100vw"}
                  />
                </div>
                <div className="modal-action">
                  <div>
                    <button
                      type="button"
                      className="btn"
                      onClick={() =>
                        (
                          document.getElementById(
                            "iconModal"
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
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered text-lg md:input-lg w-full md:h-20 md:text-3xl font-semibold"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 2xl:justify-between 2xl:gap-1 2xl:flex-nowrap">
          {colors.map((color, key) => {
            if (color.bgColor == "bg-primary-content") {
              return (
                <button
                  key={key}
                  className={`${color.bgColor} p-3 md:p-4 lg:p-5 rounded-full`}
                  onClick={() => setColor(color)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.502-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              );
            }

            return (
              <button
                key={key}
                className={`${color.bgColor} p-3 md:p-4 lg:p-5 rounded-full`}
                onClick={() => setColor(color)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 invisible"
                >
                  <path
                    fillRule="evenodd"
                    d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.502-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
