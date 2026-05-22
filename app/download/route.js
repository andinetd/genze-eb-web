import { NextResponse } from "next/server";
import { getReleaseData } from "../../lib/release-data";

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

  try {
    console.log("Fetching APK from:", targetUrl);

    // Fetch the APK file from GitHub
    const response = await fetch(targetUrl);

    if (!response.ok) {
      console.error(`Failed to fetch APK: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        {
          error: `Failed to download APK (${response.status}). The file may be temporarily unavailable. Please try again later.`,
          errorCode: "FETCH_FAILED",
          details: response.statusText,
        },
        { status: response.status },
      );
    }

    const buffer = await response.arrayBuffer();
    console.log("APK downloaded successfully, size:", buffer.byteLength);

    // Return the file with proper download headers
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.android.package-archive",
        "Content-Disposition": 'attachment; filename="faranka.apk"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      {
        error: "An error occurred while downloading the APK. Please try again or check your internet connection.",
        errorCode: "DOWNLOAD_ERROR",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}