import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import NotificationsProvider from "@/components/notifications";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bridged.vu — Bridge the gap between users and founders",
    template: "%s | Bridged.vu",
  },
  description: "Share concise updates, build an audience from day one, and grow in public.",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Bridged.vu",
    description: "Share concise updates, build an audience, and grow in public.",
    images: [
      { url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: "Bridged.vu" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bridged.vu",
    description: "Share concise updates, build an audience, and grow in public.",
    images: [`${siteUrl}/logo.png`],
  },
  icons: { icon: "/favicon.ico" },
};

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
        {/* Google Search Console verification (optional) */}
        {process.env.NEXT_PUBLIC_GSC_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GSC_VERIFICATION} />
        )}
        <NotificationsProvider>
          <SiteHeader />
          <main className="container mx-auto max-w-5xl p-4 md:p-6 flex-grow">
            {children}
          </main>
          <SiteFooter />
          <Analytics />
          <SpeedInsights />
        </NotificationsProvider>
        {/* Optional GA4 */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');`,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
