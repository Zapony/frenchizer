import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TranslateProvider } from "@/context/TranslateContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Frenchizer",
  description: "Translate text to French",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TranslateProvider>
          {children}
        </TranslateProvider>
      </body>
    </html>
  );
}
