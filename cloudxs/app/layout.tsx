import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
