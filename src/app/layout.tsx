import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeScript } from "@/components/theme/ThemeScript";
import AdSenseScript from "@/components/layout/AdSenseScript";
import { siteConfig } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ConvertTextEasy - Conversor de Texto Online Gratuito",
    template: "%s | ConvertTextEasy",
  },
  description:
    "Converta textos online gratuitamente com o ConvertTextEasy. Transforme texto em maiúsculas, minúsculas, título, sentença, slug, camelCase, snake_case e outros formatos de forma rápida e simples.",
  keywords: siteConfig.keywords,
  icons: {
    icon: "/iconeTextLab.png",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "pt_BR",
    url: siteUrl,
    title: "ConvertTextEasy - Conversor de Texto Online Gratuito",
    description:
      "Converta textos online gratuitamente com o ConvertTextEasy. Transforme texto em maiúsculas, minúsculas, título, sentença, slug, camelCase, snake_case e outros formatos de forma rápida e simples.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ConvertTextEasy - Conversor de Texto Online Gratuito",
    description:
      "Converta textos online gratuitamente com o ConvertTextEasy. Transforme texto em maiúsculas, minúsculas, título, sentença, slug, camelCase, snake_case e outros formatos de forma rápida e simples.",
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col bg-page text-slate-900 dark:text-slate-100">
        {children}
        <AdSenseScript />
      </body>
    </html>
  );
}
