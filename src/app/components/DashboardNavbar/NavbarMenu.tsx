"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarMenu() {
  const homeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );

  const banknoteIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
      />
    </svg>
  );

  const walletIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
      />
    </svg>
  );

  const chartIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  );

  const tagIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 6h.008v.008H6V6Z"
      />
    </svg>
  );

  const logoutIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
      />
    </svg>
  );

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <ul className="flex lg:flex-col md:gap-3 justify-around w-full">
      <li>
        <Link
          href={"/dashboard"}
          data-tip="Home"
          className={`tooltip lg:tooltip-right flex flex-col lg:flex-row ${isActive("/dashboard") ? "active" : ""} px-1 md:px-5 w-14 md:w-28 lg:w-full`}
        >
          {homeIcon}
          <div className="invisible md:visible">Home</div>
        </Link>
      </li>
      <li>
        <Link
          href={"/transactions"}
          data-tip="Transactions"
          className={`tooltip lg:tooltip-right flex flex-col lg:flex-row ${isActive("/transactions") ? "active" : ""} px-1 md:px-5 w-14 md:w-28 lg:w-full`}
        >
          {banknoteIcon}
          <span className="invisible md:visible">Transactions</span>
        </Link>
      </li>
      <li>
        <Link
          href={"/budget"}
          data-tip="Budget"
          className={`tooltip lg:tooltip-right flex flex-col lg:flex-row ${isActive("/budget") ? "active" : ""} px-1 md:px-5 w-14 md:w-28 lg:w-full`}
        >
          {walletIcon}
          <span className="invisible md:visible">Budget</span>
        </Link>
      </li>
      <li>
        <Link
          href={"/reports"}
          data-tip="Reports"
          className={`tooltip lg:tooltip-right flex flex-col lg:flex-row ${isActive("/reports") ? "active" : ""} px-1 md:px-5 w-14 md:w-28 lg:w-full`}
        >
          {chartIcon}
          <span className="invisible md:visible">Reports</span>
        </Link>
      </li>
      <li>
        <Link
          href={"/categories"}
          data-tip="Categories"
          className={`tooltip lg:tooltip-right flex flex-col lg:flex-row ${isActive("/categories") ? "active" : ""} px-1 md:px-5 w-14 md:w-28 lg:w-full`}
        >
          {tagIcon}
          <span className="invisible md:visible">Categories</span>
        </Link>
      </li>
      <li className="lg:hidden">
        <Link
          href={"/"}
          onClick={() => signOut({ callbackUrl: "/" })}
          className={`flex flex-col px-1 md:px-5 w-14 md:w-28`}
        >
          {logoutIcon}
          <span className="invisible md:visible">Logout</span>
        </Link>
      </li>
    </ul>
  );
}
