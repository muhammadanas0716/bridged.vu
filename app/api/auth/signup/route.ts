import { NextRequest, NextResponse } from "next/server";
import { createSession, createUser, findUserByEmail } from "@/lib/auth";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || "").toString().trim().toLowerCase();
    const password = (body.password || "").toString();
    const name = body.name ? String(body.name) : undefined;
    const handle = body.handle ? String(body.handle) : undefined;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const user = await createUser({ email, password, name, handle });
    await createSession(user.id);
    // fire-and-forget welcome email (await is fine but don't fail signup if it throws)
    sendWelcomeEmail({ to: user.email, name: user.name, handle: user.handle }).catch(() => {});
    return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name, handle: user.handle } }, { status: 201 });
  } catch (err) {
    console.error("/api/auth/signup error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
