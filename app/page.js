import fs from "fs";
import path from "path";
import PreservedHtmlClient from "./components/PreservedHtmlClient";
import { getReleaseData } from "../lib/release-data";

export default async function Home() {
  try {
    const projectRoot = path.join(process.cwd());
    const htmlPath = path.join(projectRoot, "public", "faranka.html");
    const cssPath = path.join(projectRoot, "public", "faranka.css");
    const html = fs.readFileSync(htmlPath, "utf8");
    const styles = fs.readFileSync(cssPath, "utf8");
    const releaseData = await getReleaseData();
    const body = html.match(/<body>([\s\S]*)<\/body>/i)?.[1] || "";
    const downloadHref = "/download";
    const version = releaseData?.version_name || "1.0.0";

    const hydratedBody = body
      .replace(/__VERSION__/g, version)
      .replace(/href="\/faranka\.apk"/g, `href="${downloadHref}"`);

    const siteUrl = "https://faranka.app";
    const description =
      "Faranka automatically parses bank SMS, categorizes every transaction, and gives you real-time budgets, balances, and spending insights — all on your device, no sign-up needed.";
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: "Faranka",
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
          name: "Faranka",
          url: siteUrl,
          description,
          applicationCategory: "FinanceApplication",
          operatingSystem: "Android",
          inLanguage: "en",
          softwareVersion: version,
          downloadUrl: `${siteUrl}/download`,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "ETB",
          },
          featureList: [
            "Automatic SMS import",
            "Transaction categorization",
            "Real-time budgets and spending pace",
            "Weekly spending summaries",
            "100% offline — no data leaves your phone",
          ],
        },
      ],
    };

    return (
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        {/* Render body only on client to avoid hydration mismatch */}
        <PreservedHtmlClient html={hydratedBody} containerId="preserved-root" />
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error loading page</h1>
          <p className="text-gray-600">{error?.message || "Unable to load landing page"}</p>
        </div>
      </main>
    );
  }
}
