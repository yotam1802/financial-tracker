"use client";

import { signOut } from "next-auth/react";

export default function SignoutButton() {
  return (
    <button
      className="btn active text-white bg-[#021431] text-lg font-bold hover:bg-gray-600"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign Out
    </button>
  );
}
