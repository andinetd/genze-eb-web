import { NextResponse } from "next/server";
import { RELEASE_CACHE_SECONDS, getReleaseData } from "../../lib/release-data";

export const revalidate = 3600;

export async function GET() {
  const updateData = await getReleaseData();

  return NextResponse.json(updateData, {
    headers: {
      "Cache-Control": `public, max-age=0, s-maxage=${RELEASE_CACHE_SECONDS}, stale-while-revalidate=60`,
    },
  });
}