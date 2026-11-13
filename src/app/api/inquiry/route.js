import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import dbConnect from "@/lib/db";
import Inquiry, { INQUIRY_TYPES } from "@/models/Inquiry";
import { requireAdmin } from "@/lib/auth";
import { scoreLead } from "@/lib/leadScore";
import { notifyNewLead } from "@/lib/notify";
import { rateLimit, clientIp } from "@/lib/rateLimit";

// Only these fields are accepted from the public forms. Anything else
// (status, leadScore, _id, ...) is ignored so visitors can't tamper with them.
const FIELDS = {
  name: 120, company: 160, email: 160, whatsapp: 40, quantity: 60, country: 80,
  address: 500, message: 3000, industry: 120, jobTitle: 120, website: 200,
  monthlyRequirement: 60, preferredSize: 60, packaging: 120, deliveryPort: 160,
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FALLBACK_PATH = path.join(process.cwd(), "inquiries_fallback.json");

function sanitize(data) {
  const clean = {};
  for (const [key, max] of Object.entries(FIELDS)) {
    const v = data?.[key];
    if (typeof v === "string" && v.trim()) clean[key] = v.trim().slice(0, max);
  }
  // Older sample-request clients sent "grade" instead of "preferredSize"
  if (!clean.preferredSize && typeof data?.grade === "string") clean.preferredSize = data.grade.trim().slice(0, 60);
  if (clean.website && !/^https?:\/\//i.test(clean.website)) clean.website = `https://${clean.website}`;
  clean.type = INQUIRY_TYPES.includes(data?.type) ? data.type : "Inquiry";
  return clean;
}

function validate(lead) {
  if (!lead.name) return "Please provide your name.";
  if (!lead.email || !EMAIL_RE.test(lead.email)) return "Please provide a valid email address.";
  if (!lead.whatsapp || lead.whatsapp.replace(/\D/g, "").length < 7) return "Please provide a valid WhatsApp / phone number.";
  return null;
}

export async function POST(req) {
  let data;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never see or fill the hidden "fax" field; bots do.
  // Pretend success so the bot doesn't retry.
  if (data?.fax) return NextResponse.json({ success: true }, { status: 201 });

  if (!rateLimit(`inquiry:${clientIp(req)}`, { limit: 5, windowMs: 10 * 60 * 1000 })) {
    return NextResponse.json(
      { success: false, error: "Too many submissions. Please wait a few minutes or contact us on WhatsApp." },
      { status: 429 }
    );
  }

  const lead = sanitize(data);
  const invalid = validate(lead);
  if (invalid) return NextResponse.json({ success: false, error: invalid }, { status: 400 });
  lead.leadScore = scoreLead(lead);

  let saved = false;
  let conn = null;
  try {
    conn = await dbConnect();
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }

  if (conn) {
    try {
      await Inquiry.create(lead);
      saved = true;
    } catch (err) {
      // A validation error is a bug or bad input — fail loudly, don't hide it in a fallback file.
      if (err.name === "ValidationError") {
        console.error("Inquiry validation failed:", err.message);
        return NextResponse.json({ success: false, error: "Some fields are invalid. Please check the form." }, { status: 400 });
      }
      console.error("Inquiry save failed:", err.message);
    }
  }

  if (!saved) {
    // Database is unreachable: keep a local copy (works on a VPS; read-only on Vercel).
    try {
      let list = [];
      try { list = JSON.parse(await fs.readFile(FALLBACK_PATH, "utf8")); } catch {}
      list.push({ ...lead, status: "New", createdAt: new Date().toISOString() });
      await fs.writeFile(FALLBACK_PATH, JSON.stringify(list, null, 2), "utf8");
      saved = true;
    } catch (fsErr) {
      console.error("Fallback storage failed:", fsErr.message);
    }
  }

  // Email the sales desk either way — if storage failed, the email is the backup copy.
  const emailed = await notifyNewLead(lead);

  if (!saved && !emailed) {
    return NextResponse.json(
      { success: false, error: "We could not record your request right now. Please contact us on WhatsApp or email." },
      { status: 503 }
    );
  }
  return NextResponse.json({ success: true }, { status: 201 });
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const conn = await dbConnect();
    if (conn) {
      const inquiries = await Inquiry.find({}).sort({ createdAt: -1 }).lean();
      return NextResponse.json({ success: true, source: "database", data: inquiries });
    }
  } catch (err) {
    console.error("Inquiry fetch failed:", err.message);
  }

  try {
    const list = JSON.parse(await fs.readFile(FALLBACK_PATH, "utf8"));
    return NextResponse.json({ success: true, source: "fallback", data: list.reverse() });
  } catch {
    return NextResponse.json({ success: true, source: "none", data: [] });
  }
}
