import { Resend } from "resend";

let resend;

function getClient() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function sendPassEmail({ email, passBuffer, passType }) {
  const client = getClient();
  const isRoomKey = passType === "room-key";
  const filename = isRoomKey ? "vaulted-room-key.pkpass" : "vaulted-pilot-pass.pkpass";

  const { data, error } = await client.emails.send({
    from: process.env.EMAIL_FROM || "Vaulted <onboarding@resend.dev>",
    to: email,
    subject: isRoomKey
      ? "Your Vaulted Digital Room Key"
      : "Welcome to the Vaulted Pilot Program",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
        <div style="margin-bottom: 32px;">
          <span style="display: inline-block; width: 12px; height: 12px; background: #B8956A; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></span>
          <span style="font-weight: 800; font-style: italic; letter-spacing: -0.5px; font-size: 18px; vertical-align: middle;">VAULTED</span>
        </div>

        <h1 style="font-size: 28px; font-weight: 500; letter-spacing: -0.5px; margin: 0 0 16px; color: #1A1A1A;">
          ${isRoomKey ? "Your digital room key is ready." : "Your VIP pilot pass is ready."}
        </h1>

        <p style="color: #888; font-size: 15px; line-height: 1.6; margin: 0 0 32px;">
          ${isRoomKey
            ? "Open this email on your iPhone and tap the attached pass to add it to Apple Wallet. Your room key will be ready at your fingertips."
            : "You're now part of an exclusive group exploring the future of hospitality access. Open this email on your iPhone and tap the attachment to add your VIP pass to Apple Wallet."
          }
        </p>

        <div style="background: #F8F7F4; border-radius: 16px; padding: 24px; margin-bottom: 32px;">
          <p style="font-size: 12px; color: #B8956A; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; margin: 0 0 4px;">
            ${isRoomKey ? "Room" : "Program"}
          </p>
          <p style="font-size: 24px; font-weight: 500; margin: 0; color: #1A1A1A;">
            ${isRoomKey ? "Suite 407" : "Vaulted Pilot"}
          </p>
        </div>

        <p style="color: #ccc; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; font-weight: 700;">
          © 2026 Vaulted Technologies
        </p>
      </div>
    `,
    attachments: [
      {
        filename,
        content: passBuffer.toString("base64"),
        content_type: "application/vnd.apple.pkpass",
      },
    ],
  });

  if (error) {
    throw new Error(`Email send failed: ${error.message}`);
  }

  return data;
}
