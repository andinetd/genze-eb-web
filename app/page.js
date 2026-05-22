import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function extractSection(source, tagName) {
  const match = source.match(new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match ? match[1] : "";
}

export default function Home() {
  try {
    const projectRoot = path.join(process.cwd());
    const filePath = path.join(projectRoot, "public", "faranka.html");
    const html = fs.readFileSync(filePath, "utf8");
    const styles = extractSection(html, "style");
    const body = extractSection(html, "body");

    return (
      <main>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <div dangerouslySetInnerHTML={{ __html: body }} />
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
