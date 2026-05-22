import fs from "fs";
import path from "path";
import PreservedHtmlClient from "./components/PreservedHtmlClient";
import { getReleaseData } from "../lib/release-data";

function extractSection(source, tagName) {
  const match = source.match(new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match ? match[1] : "";
}

export default async function Home() {
  try {
    const projectRoot = path.join(process.cwd());
    const filePath = path.join(projectRoot, "public", "faranka.html");
    const html = fs.readFileSync(filePath, "utf8");
    const releaseData = await getReleaseData();
    const styles = extractSection(html, "style");
    const body = extractSection(html, "body");
    const downloadHref = "/download";
    const downloadLabel = releaseData?.version_name
      ? `Latest APK v${releaseData.version_name}`
      : "Download APK";

    const hydratedBody = body
      .replace(/href="\/faranka\.apk"/g, `href="${downloadHref}"`)
      .replace(
        /<strong style="color: var\(--black\); display: block; margin-bottom: 4px;">Download APK<\/strong>faranka\.apk/,
        `<strong style="color: var(--black); display: block; margin-bottom: 4px;">${downloadLabel}</strong>${downloadHref}`,
      );

    return (
      <main>
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
