import { EMAIL_SALES } from "@/data/contact";
import nodemailer from "nodemailer";
import { trackingUrl, leadRef, typePhrase } from "@/lib/tracking";

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Env: EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, LEAD_NOTIFY_TO (defaults to EMAIL_USER)
function transport() {
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) return null;
  const port = Number(EMAIL_PORT) || 465;
  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port,
    secure: port === 465,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });
}

/**
 * Emails the sales desk about a new lead. Never throws — a mail failure must
 * not lose the lead (it's already saved in the database by the time we get here).
 */
export async function notifyNewLead(lead) {
  const { EMAIL_USER, LEAD_NOTIFY_TO } = process.env;
  const transporter = transport();
  if (!transporter) {
    console.warn("Lead email skipped: EMAIL_* env vars not configured.");
    return false;
  }
  try {

    const rows = [
      ["Type", lead.type],
      ["Lead score", lead.leadScore],
      ["Name", lead.name],
      ["Job title", lead.jobTitle],
      ["Company", lead.company],
      ["Website", lead.website],
      ["Email", lead.email],
      ["WhatsApp", lead.whatsapp],
      ["Country", lead.country],
      ["Industry", lead.industry],
      ["Size / grade", lead.preferredSize],
      ["Quantity (MT)", lead.quantity],
      ["Monthly requirement", lead.monthlyRequirement],
      ["Packaging", lead.packaging],
      ["Delivery", lead.deliveryPort],
      ["Address", lead.address],
      ["Message", lead.message],
      ["Dashboard", `${trackingUrl("").replace(/\/track\/$/, "")}/adminsumanth`],
    ].filter(([, v]) => v !== undefined && v !== null && v !== "");

    const html = `<h2>New ${esc(lead.type)} — ${esc(lead.company || lead.name)}</h2>
      <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${rows.map(([k, v]) => `<tr><td style="color:#666;border-bottom:1px solid #eee">${esc(k)}</td><td style="border-bottom:1px solid #eee"><strong>${esc(v)}</strong></td></tr>`).join("")}
      </table>`;

    await transporter.sendMail({
      from: `"Sumanth Minerals Website" <${EMAIL_USER}>`,
      to: LEAD_NOTIFY_TO || EMAIL_USER,
      replyTo: lead.email,
      subject: `[${lead.type}] ${lead.company || lead.name} — ${lead.country || "Unknown country"} (score ${lead.leadScore})`,
      html,
    });
    return true;
  } catch (err) {
    console.error("Lead email failed:", err.message);
    return false;
  }
}

/** Confirmation to the buyer with their private tracking link. Never throws. */
export async function sendBuyerConfirmation(lead) {
  const transporter = transport();
  if (!transporter || !lead.email || !lead.trackingToken) return false;
  const url = trackingUrl(lead.trackingToken);
  const ref = leadRef(lead);
  try {
    await transporter.sendMail({
      // Buyers see the company address. sales@ is a verified "Send mail as" alias of the
      // Gmail account, so Gmail sends it as-is (an unverified alias would be rewritten).
      from: `"Sumanth Minerals" <${process.env.EMAIL_FROM || EMAIL_SALES}>`,
      to: lead.email,
      replyTo: EMAIL_SALES,
      subject: `We received your ${typePhrase(lead.type)} (ref ${ref}) — Sumanth Minerals`,
      html: `<div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#0E2238;max-width:560px">
        <p>Dear ${esc(lead.name)},</p>
        <p>Thank you for your ${esc(typePhrase(lead.type))}${lead.company ? ` on behalf of ${esc(lead.company)}` : ""}. Our sales desk will review it and contact you shortly.</p>
        <p>You can follow its progress — sample dispatch, quotation and order status — on your private page:</p>
        <p><a href="${url}" style="display:inline-block;background:#0E2238;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none">Track your request</a></p>
        <p style="color:#5B6B7C;font-size:13px">Keep this link private; anyone with it can see your request. If the button does not work, copy this address: ${url}</p>
        <p>Regards,<br/>Sales desk, Sumanth Minerals</p>
      </div>`,
    });
    return true;
  } catch (err) {
    console.error("Buyer confirmation email failed:", err.message);
    return false;
  }
}
