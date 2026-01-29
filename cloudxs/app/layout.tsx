import type { Metadata } from "next";
import "./globals.css";
import AppGuard from "@/components/AppGuard";

export const metadata: Metadata = {
  title: "CloudXS",
  description: "CloudXS - Your Cloud Storage Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppGuard>{children}</AppGuard>
      </body>
    </html>
  );
}
