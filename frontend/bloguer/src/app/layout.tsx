import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "./storeProvider";
import "./globals.css";
import { NavLinks } from "../components/NavLinks";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "bloguer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <NavLinks />
          <main>
            <div className="container mx-auto max-w-xl py-5">
              {children}
            </div>
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
