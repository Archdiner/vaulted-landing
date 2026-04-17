import { createPass } from "./_lib/createPass.js";
import { sendPassEmail } from "./_lib/emailClient.js";

// Simple in-memory rate limiting (resets on cold start)
const emailSendTimes = new Map();
const RATE_LIMIT_MS = 60 * 60 * 1000; // 1 hour

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, passType = "room-key" } = req.body || {};

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email required" });
    }

    // Rate limit check
    const lastSent = emailSendTimes.get(email);
    if (lastSent && Date.now() - lastSent < RATE_LIMIT_MS) {
      return res.status(429).json({
        error: "Pass already sent to this email recently. Please check your inbox.",
      });
    }

    const validTypes = ["room-key", "vip-pilot"];
    const type = validTypes.includes(passType) ? passType : "room-key";

    const passBuffer = await createPass({ passType: type });
    await sendPassEmail({ email, passBuffer, passType: type });

    emailSendTimes.set(email, Date.now());

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Send pass email error:", err);
    res.status(500).json({
      error: "Failed to send pass",
      detail: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}
