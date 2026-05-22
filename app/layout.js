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

export const metadata = {
  title: "Faranka | SMS finance intelligence for Android",
  description:
    "Marketing site for Faranka, the Android app that imports bank SMS, categorizes spending, and surfaces receipts, budgets, and insights.",
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