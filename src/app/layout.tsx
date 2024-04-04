import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Data-Store",
  description: "Data store.",
  referrer: "no-referrer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
