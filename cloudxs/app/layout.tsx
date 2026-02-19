import type { Metadata } from "next";
import "./globals.css";
import AppGuard from "@/components/AppGuard";
import { Toaster } from "@/components/ui/sonner"
export const metadata: Metadata = {
  title: "CloudXS",
  description: "CloudXS - Your Cloud Storage Solution",
};
import { Analytics } from "@vercel/analytics/next"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppGuard><Analytics/>{children}</AppGuard>
        <Toaster />

      </body>
    </html>
  );
}
