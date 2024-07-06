import Link from "next/link";
import logo from "@/assets/polaris-logo.png";
import Image from "next/image";

export default async function Navbar() {
  return (
    <div className="bg-base-100">
      <div className="navbar max-w-7xl mx-auto flex-col sm:flex-row gap-x-2">
        <div className="flex-1">
          <Link
            href="/"
            className="btn btn-ghost text-3xl normal-case tracking-tighter"
          >
            <Image src={logo} height={50} width={50} alt="Prisma Logo" />
            Polaris
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div>Sign up</div>
          <div>Sign in</div>
        </div>
      </div>
      <div className="flex w-full flex-col">
        <div className="divider mt-0"></div>
      </div>
    </div>
  );
}
