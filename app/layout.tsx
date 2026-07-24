import type { Metadata } from "next";
import ReduxProvider from "@/providers/redux-provider";
import QueryProvider from "@/providers/app-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tjermin Marketplace",
  description:
    "Find your perfect things from our premium selection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}