import type { Metadata } from "next";
import "./globals.css";
import { fontMono, fontSans } from "@/assets/fonts";
import { SITE_CONFIG } from "@/lib/constants";
import Script from "next/script";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.URL),
  title: {
    default: SITE_CONFIG.NAME,
    template: `%s - ${SITE_CONFIG.NAME}`,
  },
  description: SITE_CONFIG.DESCRIPTION,
  openGraph: {
    title: {
      default: SITE_CONFIG.NAME,
      template: `%s - ${SITE_CONFIG.NAME}`,
    },
    description: SITE_CONFIG.DESCRIPTION,
    url: SITE_CONFIG.URL,
    siteName: SITE_CONFIG.NAME,
    type: "website",
    locale: "en_US",
  },
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
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
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
