import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocaleStore } from "@/store/useLocaleStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orbital Imagery Exploration Toolkit",
  description:
    "SpaceApps prototype for browsing large imagery, AI search, and time-series overlays.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = useLocaleStore.getState().locale;

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <LanguageSwitcher />
      </body>
    </html>
  );
}
