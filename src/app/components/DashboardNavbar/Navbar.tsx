import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png";
import SignoutButton from "./SignoutButton";
import NavbarMenu from "./NavbarMenu";
import polarisLogo from "../../../assets/polaris-logo.png";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className="fixed z-50 bottom-0 left-0 right-0 h-16 md:h-20 rounded-t-box menu menu-horizontal bg-gray-100 lg:menu-vertical lg:rounded-box lg:min-h-screen lg:w-56 lg:shadow-md lg:p-2 gap-4 text-base text-gray-800 font-semibold tracking-tight lg:justify-between">
      <div className="w-full flex-col">
        <div className="hidden lg:flex items-center mb-3">
          <Image
            src={polarisLogo}
            alt="Polaris Logo"
            width={10000}
            height={10000}
            className="w-[4.5rem]"
          />
          <span className="text-[2rem] tracking-tight font-bold">Polaris</span>
        </div>
        <div>
          <NavbarMenu />
        </div>
      </div>
      <div className="gap-5 text-lg font-bold hidden lg:flex items-center justify-center mb-3">
        <Image
          src={user?.image || profilePicPlaceholder}
          alt="Profile Picture"
          width={1000}
          height={1000}
          className="w-[3.2rem]
           rounded-full"
        />
        <SignoutButton />
      </div>
    </div>
  );
}
