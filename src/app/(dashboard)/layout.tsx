import Navbar from "../components/DashboardNavbar/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-w-[300px]">
      <Navbar />
      {children}
    </div>
  );
}
