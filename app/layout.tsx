import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import Script from "next/script";
import { openGraphImage, SITE_CONFIG } from "@/lib/constants";
import Providers from "./providers";

import "./globals.css";

export const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const mono = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.URL),
  title: {
    default: SITE_CONFIG.NAME,
    template: `%s - ${SITE_CONFIG.SUFFIX_NAME}`,
  },
  description: SITE_CONFIG.DESCRIPTION,
  openGraph: openGraphImage,
  twitter: {
    card: "summary_large_image",
    creator: "@ritiksharmarj",
    site: "@ritiksharmarj",
  },
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <head>
        <Script
          src="https://analytics.ritiksharma.me/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
