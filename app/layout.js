import localFont from "next/font/local";
import "./globals.css";

const bodyFont = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "100 900",
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
  src: "./fonts/DepartureMono-Regular.woff2",
  variable: "--font-display",
  display: "swap",
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
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  other: {
    keywords:
      "finance tracker,SMS banking,expense tracker,budget app,Ethiopian bank app,Awash Bank,CBE,spending tracker,personal finance,Android finance app",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3f1e9",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${monoFont.variable} ${displayFont.variable}`}>
        {children}
      </body>
    </html>
  );
}