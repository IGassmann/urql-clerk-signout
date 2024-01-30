import URQLProvider from '@/app/URQLProvider';
import {
  ClerkProvider,
} from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clerk URQL Sign Out Bug",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ClerkProvider>
          <URQLProvider>
            {children}
          </URQLProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
