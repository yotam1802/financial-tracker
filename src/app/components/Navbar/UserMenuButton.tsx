"use client";

import { Session } from "next-auth";
import Image from "next/image";
import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div>
      {user ? (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <Image
              src={user?.image || profilePicPlaceholder}
              alt="Profile Picture"
              width={40}
              height={40}
              className="w-10 rounded-full"
            />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-md z-30 mt-3 w-52 p-2 shadow-lg bg-base-100 border border-neutral-300"
          >
            <li>
              <button onClick={() => signOut({ callbackUrl: "/" })}>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <button
          onClick={() =>
            signIn(undefined, { callbackUrl: "http://localhost:3000/dashboard" })
          }
          className="btn btn-primary text-white w-28 rounded-full"
        >
          Sign in
        </button>
      )}
    </div>
  );
}
