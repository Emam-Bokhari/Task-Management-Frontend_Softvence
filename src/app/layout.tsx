import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const poppinsClassName: string = poppins.className;

export const metadata: Metadata = {
  title: "Tasko | Simplify Your Task Management",
  description:
    "Tasko helps you organize, track, and manage your tasks efficiently. Boost productivity with an intuitive interface and powerful features.",
  keywords: [
    "Task Management",
    "Productivity",
    "To-do App",
    "Task Tracker",
    "Project Management",
    "Tasko",
    "Manage Tasks Online",
    "Daily Planner",
  ],
  authors: [
    { name: "Moshfiqur Rahman", url: "https://moshfiqur-rahman.vercel.app" },
  ],
  creator: "Moshfiqur Rahman",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppinsClassName}  bg-[#FAFAFA] antialiased`}>
        {children}
        <Toaster
          expand
          position="top-right"
          toastOptions={{
            style: {
              background: "#60E5AE",
              color: "#000000",
              border: "none",
            },
          }}
        />
      </body>
    </html>
  );
}
