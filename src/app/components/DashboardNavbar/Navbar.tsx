import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png";
import SignoutButton from "./SignoutButton";
import NavbarMenu from "./NavbarMenu";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 md:h-20 rounded-t-box menu menu-horizontal bg-base-200 lg:menu-vertical lg:rounded-box lg:min-h-screen lg:w-56 lg:shadow-md lg:p-5 gap-4 text-base text-gray-800 font-semibold tracking-tight">
      <NavbarMenu />
      <label
        tabIndex={0}
        className="mt-auto gap-2 btn btn-ghost text-lg font-bold invisible lg:visible"
      >
        <Image
          src={user?.image || profilePicPlaceholder}
          alt="Profile Picture"
          width={40}
          height={40}
          className="w-10 rounded-full"
        />
        <SignoutButton />
      </label>
    </div>
  );
}
