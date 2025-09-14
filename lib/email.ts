import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendWelcomeEmail(params: {
  to: string;
  name?: string | null;
  handle?: string | null;
}) {
  if (!resend) return;
  const from = "anas@bridged.vu";
  const subject = "Welcome to Bridged.vu 🎉";
  const preheader = "Bridge the gap between users and founders early on";
  const { to, name, handle } = params;
  const display = name || to.split("@")[0];
  const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.bridged.vu/"}/dashboard`;
  const profileUrl = handle
    ? `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.bridged.vu/"}/u/${handle}`
    : `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.bridged.vu/"}`;

  const html = `
  <!doctype html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Welcome to Bridged.vu</title>
    <style>
      body{background:#f7f7f7;margin:0;padding:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111}
      .container{max-width:560px;margin:0 auto;padding:24px}
      .card{background:#fff;border:1px solid #e5e5e5;border-radius:12px;padding:20px}
      .btn{display:inline-block;background:#FFA500;color:#000;text-decoration:none;border-radius:10px;padding:10px 16px}
      .muted{color:#555}
      .mt{margin-top:12px}
    </style>
  </head>
  <body>
    <div class="container">
      <div style="font-size:14px;color:#444;margin-bottom:10px">${preheader}</div>
      <div class="card">
        <h1 style="margin:0 0 8px 0">Welcome, ${escapeHtml(display || "")} 👋</h1>
        <p class="muted">We’re excited to have you at <strong>Bridged.vu</strong> — a simple, open platform to share concise startup updates, grow an audience from day one, and build in public.</p>
        <h2 style="font-size:16px;margin:20px 0 8px">Get started</h2>
        <ol class="muted" style="padding-left:18px;margin:8px 0 16px">
          <li>Create your startup on the dashboard</li>
          <li>Publish a short “Issue” update (what you shipped, learned, or plan)</li>
          <li>Share your page and invite early supporters</li>
        </ol>
        <a class="btn" href="${dashboardUrl}">Open Dashboard</a>
        <p class="muted mt">Your profile: <a href="${profileUrl}">${profileUrl}</a></p>
        <h2 style="font-size:16px;margin:20px 0 8px">Open source, together</h2>
        <p class="muted">Bridged.vu is open source so founders and developers can learn, iterate, and contribute improvements openly. If you find gaps or have ideas, we welcome PRs and issues.</p>
        <p class="muted">Happy building,<br/>Anas — maintainer</p>
      </div>
      <p class="muted" style="font-size:12px;margin:12px 6px">You’re receiving this because you created an account on Bridged.vu.</p>
    </div>
  </body>
  </html>
  `;

  const text = `Welcome to Bridged.vu\n\nWe’re excited to have you, ${display}.\n\nGet started:\n1) Create your startup\n2) Publish a short update\n3) Share your page\n\nDashboard: ${dashboardUrl}\nProfile: ${profileUrl}\n\nBridged.vu is open source — contributions welcome!\n\n— Anas`;

  try {
    await resend.emails.send({ from, to, subject, html, text });
  } catch (e) {
    // swallow send errors; sign-up should not fail on email issues
    // eslint-disable-next-line no-console
    console.warn("sendWelcomeEmail failed", e);
  }
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
