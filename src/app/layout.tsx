import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/app/components/SessionProvider";

const noto_sans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Polaris - Financial Tracker",
  description: "Track your spending, without the tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto_sans.className}>
        <SessionProvider>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
