"use client";

import { act, MouseEventHandler } from "react";

interface CategoryCardProps {
  icon: string;
  text: string;
  color: string;
  active: boolean;
  onClick: () => void;
}

export default function CategoryCard({ icon, text, color, active, onClick }: CategoryCardProps) {
    console.log(active)
  return (
    <button className="flex flex-col justify-center items-center text-black" onClick={onClick}>
      <div
        className={`btn w-24 h-20 rounded-2xl text-5xl ${`bg-${color}-500`} ${active ? `border-gray-800 border-4` : "" }`}
      >
        {icon}
      </div>
      <p className="text-sm font-mono">{text}</p>
    </button>
  );
}
