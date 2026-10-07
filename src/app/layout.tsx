import type { Metadata } from "next";
import { Brygada_1918, Fraunces, IBM_Plex_Sans, Inter, JetBrains_Mono } from "next/font/google";
import { headers } from "next/headers";

import { getI18n } from "@/i18n/request";
import { isIndexableHost, originFromHost } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const greekSerif = Brygada_1918({
  display: "swap",
  subsets: ["latin", "greek"],
  style: ["normal", "italic"],
  variable: "--font-greek-serif",
});

const inter = Inter({
  display: "swap",
  subsets: ["latin", "greek"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  display: "swap",
  subsets: ["latin", "greek"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
});

const ibmPlexSans = IBM_Plex_Sans({
  display: "swap",
  subsets: ["latin", "greek"],
  variable: "--font-ibm-plex-sans",
  weight: ["400", "500", "600", "700"],
});

const siteTitle = "KRS AI | Accounting, Tax Advisory & Agentic Operations";
const siteDescription =
  "Premium accounting, payroll, tax advisory, and agentic compliance operations for modern Greek businesses.";
const ogAlt = "KRS logo and the line, Building the financial platform for the businesses of tomorrow";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("host");
  const indexable = isIndexableHost(host);
  const { tx } = await getI18n();
  const title = tx(siteTitle);
  const description = tx(siteDescription);
  const ogImage = {
    url: "/images/ogimage-krs.png",
    width: 1200,
    height: 630,
    alt: tx(ogAlt),
  };

  return {
    metadataBase: new URL(originFromHost(host)),
    title,
    description,
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title,
      description,
      siteName: "KRS AI",
      images: [ogImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    icons: {
      icon: [
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/site.webmanifest",
    other: {
      "apple-mobile-web-app-title": "KRS",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale } = await getI18n();

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${greekSerif.variable} ${inter.variable} ${ibmPlexSans.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
