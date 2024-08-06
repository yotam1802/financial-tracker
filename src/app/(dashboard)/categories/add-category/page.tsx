"use client";

import { Categories, EmojiClickData } from "emoji-picker-react";
import { useEffect, useState, useTransition } from "react";
import dynamic from "next/dynamic";

export default function CategoriesPage() {
  const [icon, setIcon] = useState("");
  const [isPending, startTransition] = useTransition();

  const Picker = dynamic(
    () => {
      return import("emoji-picker-react");
    },
    { ssr: false }
  );

  const handleIconChange = (emoji: EmojiClickData) => {
    if (emoji.emoji == "🫐")
      return setTimeout(() => {
        const modal = document.getElementById("iconModal") as HTMLDialogElement;
        if (modal) {
          modal.close();
        }
      }, 0);

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

        <div className="flex-grow-0">
          <label>
            <button
              type="button"
              className="btn h-20 w-24 text-5xl bg-primary-content border-gray-200 hover:bg-primary-content hover:border-gray-200 disabled:cursor-none disabled:bg-opacity-100 disabled:text-black disabled:bg-primary-content disabled:hover:bg-primary-content disabled:hover:text-black"
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
        </div>
      </div>
    </div>
  );
}
