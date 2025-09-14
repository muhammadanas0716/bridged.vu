import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

export async function POST() {
  try {
    await destroySession();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/auth/logout error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

