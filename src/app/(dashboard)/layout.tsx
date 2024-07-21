import Navbar from "../components/DashboardNavbar/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col-reverse lg:flex-row min-h-full min-w-full">
      <Navbar />
      {children}
    </div>
  );
}
