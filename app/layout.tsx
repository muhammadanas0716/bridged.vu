"use client";

import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Asimovian&family=Fjalla+One&family=Funnel+Sans:ital,wght@0,300..800;1,300..800&family=Inconsolata:wght@200..900&family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Story+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#faf3e0] text-neutral-900 antialiased flex flex-col">
        <SiteHeader />
        <main className="container mx-auto max-w-5xl p-4 md:p-6 flex-grow">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
