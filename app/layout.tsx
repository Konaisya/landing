import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import SmoothScroll from "@/components/ui/smoothScroll";


const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "landing",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${dmSans.variable} h-full antialiased`}>
        <Navbar />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}