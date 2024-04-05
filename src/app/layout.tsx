import type { Metadata } from "next";
import "./globals.css";
import { MHeader } from "@/components/MHeader";

export const metadata: Metadata = {
  title: "Midolii",
  description: "Midolii data store.",
  referrer: "no-referrer",
  icons: "/avatar.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MHeader />
        {children}
      </body>
    </html>
  );
}
