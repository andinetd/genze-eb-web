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
