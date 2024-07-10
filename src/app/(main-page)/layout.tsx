import Navbar from "../components/MainPageNavbar/Navbar";
import Footer from "../components/Footer";

export default function MainPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-4 m-auto min-w-[300px]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
