import { NextResponse } from "next/server";
import { getReleaseData } from "../../lib/release-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const updateData = await getReleaseData();

  return NextResponse.json(updateData, {
    headers: {
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}