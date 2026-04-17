import { createPass } from "./_lib/createPass.js";

export default async function handler(req, res) {
  // Allow both GET (QR code scan) and POST (custom pass)
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let options = {};

    if (req.method === "GET") {
      // QR code scan — demo mode with defaults
      const { passType = "room-key" } = req.query;
      options = { passType };
    } else {
      // POST — custom pass
      options = req.body || {};
    }

    const validTypes = ["room-key", "vip-pilot"];
    if (!validTypes.includes(options.passType)) {
      options.passType = "room-key";
    }

    const passBuffer = await createPass(options);

    const filename =
      options.passType === "room-key"
        ? "vaulted-room-key.pkpass"
        : "vaulted-pilot-pass.pkpass";

    res.setHeader("Content-Type", "application/vnd.apple.pkpass");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Cache-Control", "no-store");
    res.send(passBuffer);
  } catch (err) {
    console.error("Pass generation error:", err);
    res.status(500).json({
      error: "Failed to generate pass",
      detail: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}
