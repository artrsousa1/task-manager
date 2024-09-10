import type { Metadata } from "next";
import { Outfit } from "next/font/google"
import UserProvider from "@/contexts/UserContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({ subsets: ["latin"] });
//const montserrat = Montserrat({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });
// const poppins = Poppins( { weight: ["400", "500", "600", "700"] , subsets: ["latin"] });

export const metadata: Metadata = {
  title: "hivee",
  description: "Turning taks into achievements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Toaster position="top-center"/>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
