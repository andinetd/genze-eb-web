import localFont from "next/font/local";
import "./globals.css";
import {
  description,
  keywords,
  ogDescription,
  ogTitle,
  siteName,
  siteUrl,
  title,
} from "../lib/site-config";
import EnableJs from "./components/EnableJs";

const bodyFont = localFont({
  src: [
    { path: "./fonts/IBMPlexSans-400.woff2", weight: "400" },
    { path: "./fonts/IBMPlexSans-500.woff2", weight: "500" },
    { path: "./fonts/IBMPlexSans-600.woff2", weight: "600" },
    { path: "./fonts/IBMPlexSans-700.woff2", weight: "700" },
  ],
  variable: "--font-body",
  display: "swap",
});

const monoFont = localFont({
  src: [
    { path: "./fonts/IBMPlexMono-400.woff2", weight: "400" },
    { path: "./fonts/IBMPlexMono-500.woff2", weight: "500" },
  ],
  variable: "--font-mono",
  display: "swap",
});

const displayFont = localFont({
  src: [
    { path: "./fonts/Satoshi-500.woff2", weight: "500" },
    { path: "./fonts/Satoshi-700.woff2", weight: "700" },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title,
  description,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    url: siteUrl,
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Faranka — SMS Finance Intelligence for Android",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: [
      {
        url: "/og-image.png",
        alt: "Faranka — SMS Finance Intelligence for Android",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  other: {
    keywords,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0d",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#0b0b0d" />
      </head>
      <body className={`${bodyFont.variable} ${monoFont.variable} ${displayFont.variable}`}>
        <EnableJs />
        {children}
      </body>
    </html>
  );
}
