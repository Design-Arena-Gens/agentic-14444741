import { NextResponse } from "next/server";
import { buildTrendReport } from "@/lib/trendAgent";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const report = await buildTrendReport();
    return NextResponse.json(report, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Failed to generate trend report", error);
    return NextResponse.json(
      { error: "Unable to generate trend report" },
      { status: 500 },
    );
  }
}

