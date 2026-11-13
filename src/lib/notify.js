import nodemailer from "nodemailer";

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/**
 * Emails the sales desk about a new lead. Never throws — a mail failure must
 * not lose the lead (it's already saved in the database by the time we get here).
 * Env: EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, LEAD_NOTIFY_TO (defaults to EMAIL_USER)
 */
export async function notifyNewLead(lead) {
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, LEAD_NOTIFY_TO } = process.env;
  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
    console.warn("Lead email skipped: EMAIL_* env vars not configured.");
    return false;
  }
  try {
    const port = Number(EMAIL_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port,
      secure: port === 465,
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

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
