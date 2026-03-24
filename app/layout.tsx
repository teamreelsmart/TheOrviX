import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CineNest",
  description:
    "CineNest by @TheOrviX — Discover movies and series, with development by @TheOrviZ."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
