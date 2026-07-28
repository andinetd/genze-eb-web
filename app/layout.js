import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const displayFont = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "400"],
  style: ["normal", "italic"],
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
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
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    keywords:
      "finance tracker,SMS banking,expense tracker,budget app,Ethiopian bank app,Awash Bank,CBE,spending tracker,personal finance,Android finance app",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        {children}
      </body>
    </html>
  );
}