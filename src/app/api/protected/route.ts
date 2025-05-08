import { verifyAuth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Check from "@/models/Check";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const auth = await verifyAuth(request);

  // Si verifyAuth devuelve un NextResponse → hubo error → regresamos directamente
  if (auth instanceof NextResponse) {
    return auth;
  }

  const reps = NextResponse.json({
    message: "Session del",
  });

  reps.cookies.delete(process.env.TOKEN_KEY || "tkn");

  return reps;
}
