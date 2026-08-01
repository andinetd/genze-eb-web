import { NextResponse } from "next/server";
import { getReleaseData } from "../../lib/release-data";

const ALLOWED_HOSTS = new Set(["raw.githubusercontent.com", "github.com"]);

function isAllowedApkUrl(url) {
  try {
    return ALLOWED_HOSTS.has(new URL(url).hostname);
  } catch {
    return false;
  }
}

export async function GET() {
  const releaseData = await getReleaseData();
  const targetUrl = releaseData?.apk_url;

  if (!targetUrl) {
    return NextResponse.json(
      {
        error: "Latest release APK URL is unavailable. Please check back later or visit our GitHub repository.",
        errorCode: "NO_APK_URL",
      },
      { status: 404 },
    );
  }

  if (!isAllowedApkUrl(targetUrl)) {
    return NextResponse.json(
      {
        error: "The APK URL is invalid.",
        errorCode: "INVALID_APK_URL",
      },
      { status: 400 },
    );
  }

  // Redirect straight to the hosted APK so the browser downloads it directly
  // from GitHub's CDN, avoiding server-side buffering of a large binary.
  return NextResponse.redirect(targetUrl, 302);
}
