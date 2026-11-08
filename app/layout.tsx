import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const sans = Space_Grotesk({
  variable: "--font-app-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learning Japanese App",
  description: "Created by devari",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="container max-w-3xl mx-auto border border-foreground/10 min-h-screen p-4">
          <Navbar />
          {children}
        </div>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
