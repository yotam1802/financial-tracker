import Navbar from "../components/DashboardNavbar/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Retrieve the session
  const session = await getServerSession(authOptions);

  // Redirect if the session is not found
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row min-h-full min-w-full">
      <Navbar />
      <div className="lg:flex-1 lg:ml-56">{children}</div>
    </div>
  );
}
