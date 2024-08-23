"use client";

import { Categories, EmojiClickData } from "emoji-picker-react";
import { FormEvent, useState, useTransition } from "react";
import { addCategory } from "./actions";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

export default function CategoriesPage() {
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState({
    bgColor: "bg-primary-content",
    badgeColor: "bg-primary-content",
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const colors = [
    {
      bgColor: "bg-primary-content",
      badgeColor: "bg-primary-content",
    },
    {
      bgColor: "bg-violet-500",
      badgeColor: "bg-violet-300",
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

  const handleIconChange = (emoji: EmojiClickData) => {
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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
  };

  const submitCategory = async (event: FormEvent) => {
    event.preventDefault();

    if (!name || !icon || !color) return;

    startTransition(async () => {
      try {
        await addCategory(name, icon, color.bgColor, color.badgeColor);
      } finally {
        router.push("/categories");
      }
    });
  };

  return (
    <form
      className="flex w-full flex-col items-center mb-5"
      onSubmit={submitCategory}
    >
      <div
        className={`shadow-lg p-10 w-full flex flex-col gap-5 gap-y-10 mb-10 md:w-4/5 md:rounded-box min-h-screen sm:min-h-fit md:my-10 xl:mt-20 xl:mb-10 bg-gray-100 transition-opacity ease-in-out duration-700 ${isPending ? "opacity-60" : ""}`}
      >
        <h1 className="text-2xl font-extrabold">Add New Category</h1>
        <div className="flex w-full flex-col">
          <div className="divider my-0"></div>
        </div>
        <div
          role="alert"
          className="alert alert-info bg-primary text-white md:font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Choose a category icon and name to add a category.</span>
        </div>

        <div className="flex flex-col md:flex-row gap-x-10 gap-y-4 flex-grow-0">
          <label>
            <button
              type="button"
              className={`btn h-20 w-24 text-5xl rounded-2xl ${color.bgColor} border-gray-200 hover:bg-gray-100 hover:border-gray-200 disabled:cursor-none disabled:bg-opacity-100 disabled:text-black disabled:bg-primary-content disabled:hover:bg-primary-content disabled:hover:text-black`}
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
              value={name}
              placeholder="Name"
              className="input input-bordered text-xl input-lg w-full md:h-20 md:text-3xl font-semibold"
              required
              onChange={handleNameChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 2xl:justify-between 2xl:gap-1 2xl:flex-nowrap">
          {colors.map((color, key) => {
            if (color.bgColor == "bg-primary-content") {
              return (
                <button
                  key={key}
                  className={`${color.bgColor} p-4 lg:p-5 rounded-full`}
                  onClick={() => setColor(color)}
                  type="button"
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
                className={`${color.bgColor} p-4 lg:p-5 rounded-full`}
                onClick={() => setColor(color)}
                type="button"
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
        <button
          type="submit"
          className="btn w-full lg:w-2/5 btn-primary text-white font-bold mx-auto"
          disabled={isPending}
        >
          Add Category
        </button>
      </div>
      {isPending && (
        <span className="loading loading-dots w-24 lg:w-32 fixed flex items-center justify-center h-full"></span>
      )}
    </form>
  );
}
