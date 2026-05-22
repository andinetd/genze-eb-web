import { NextResponse } from "next/server";
import { getReleaseData } from "../../lib/release-data";

export async function GET() {
  const releaseData = await getReleaseData();
  const targetUrl = releaseData?.apk_url;

  if (!targetUrl) {
    return NextResponse.json(
      { error: "Latest release APK URL is unavailable." },
      { status: 404 },
    );
  }

  return NextResponse.redirect(targetUrl, 302);
}