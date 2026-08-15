export const siteUrl = "https://faranka.app";
export const siteName = "Faranka";
export const supportEmail = "support@faranka.com";
export const title = "Faranka — Automatic SMS Finance Tracker for Android";
export const description =
  "Faranka automatically parses bank SMS, categorizes every transaction, and gives you real-time budgets, spending pace, and insights — one-tap Google sign-in, on-device by default.";
export const ogTitle = "Faranka — Track Every Birr. Automatically.";
export const ogDescription =
  "Faranka reads your bank messages, categorizes spending, and shows real-time budgets — one-tap Google sign-in, on-device by default.";
export const keywords =
  "finance tracker,SMS banking,expense tracker,budget app,Ethiopian bank app,Awash Bank,CBE,spending tracker,personal finance,Android finance app";

export function getJsonLd(appVersion) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        description,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}/#webapp`,
        name: siteName,
        url: siteUrl,
        description,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Android",
        inLanguage: "en",
        softwareVersion: appVersion,
        downloadUrl: `${siteUrl}/download`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "ETB",
          description:
            "Free tier: 50 receipts and 90 days of history. Pro unlocks unlimited receipts, full history, cloud backup/restore, and JSON/CSV export (99 ETB/mo or 990 ETB/yr).",
        },
        featureList: [
          "Automatic SMS import",
          "Transaction categorization",
          "Real-time budgets and spending pace",
          "Weekly spending summaries",
          "Calendar heatmaps, category radar, and top merchants",
          "On-device storage by default",
          "Optional encrypted cloud backup and restore (Pro)",
          "JSON/CSV export (Pro)",
          "Biometric lock",
          "No analytics or advertising SDKs",
        ],
      },
    ],
  };
}
