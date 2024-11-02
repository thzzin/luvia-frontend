import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
      <body className={`${inter.className} flex items-start justify-between`}>
        {/* Mostra a Sidebar no desktop */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        {/* Conteúdo Principal */}
        <main className="grid w-full h-full md:pl-[100px]">
          <div className="p-8">
            {children}
          </div>
          <Toaster />
        </main>

        {/* MobileMenu no mobile */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </body>
    </html>
  );
}
