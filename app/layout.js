import { DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700", "800"],
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const siteUrl = "https://faranka.app";

export const metadata = {
  title: "Faranka — Automatic SMS Finance Tracker for Android",
  description:
    "Faranka automatically parses bank SMS, categorizes every transaction, and gives you real-time budgets, spending pace, and insights — all on your device, no sign-up needed.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Faranka — Track Every Birr. Automatically.",
    description:
      "Faranka reads your bank messages, categorizes spending, and shows real-time budgets — no account, no data upload.",
    url: siteUrl,
    siteName: "Faranka",
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
    title: "Faranka — Track Every Birr. Automatically.",
    description:
      "Faranka reads your bank messages, categorizes spending, and shows real-time budgets — no account, no data upload.",
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
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/og-image.png", type: "image/png" },
    ],
    apple: "/og-image.png",
  },
  other: {
    keywords:
      "finance tracker,SMS banking,expense tracker,budget app,Ethiopian bank app,Awash Bank,CBE,spending tracker,personal finance,Android finance app",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f5f2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${monoFont.variable}`}>
        {children}
      </body>
    </html>
  );
}