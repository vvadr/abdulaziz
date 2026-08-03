import type { Metadata, Viewport } from "next";
import { siteMetadata, siteUrl } from "@/data/site";
import "@fontsource-variable/geist-mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteMetadata.title,
    template: "%s | Abdulaziz Yusupaliev",
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: "Abdulaziz Yusupaliev", url: siteUrl }],
  creator: "Abdulaziz Yusupaliev",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteUrl,
    siteName: "Abdulaziz Yusupaliev",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-mono">
      <body>{children}</body>
    </html>
  );
}
