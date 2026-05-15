import { NextResponse } from "next/server";
import updateData from "../../update.json";

export function GET() {
  return NextResponse.json(updateData, {
    headers: {
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}