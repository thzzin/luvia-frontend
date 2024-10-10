import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatBot",
  description: "Gerenciando seus ChatBot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex items-start justify-between `}>
        <Sidebar />
        <main className="grid w-full h-full pl-[100px]">
          <div className="p-8 ">
            {children}
          </div>
                  <Toaster />

        </main>
      </body>
    </html>
  );
}