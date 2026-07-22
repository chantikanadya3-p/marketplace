import type { Metadata } from "next";
import AppProvider from "@/providers/app-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tjermin Marketplace",
  description: "Discover products from our premium selection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}