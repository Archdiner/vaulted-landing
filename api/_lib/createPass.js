import { PKPass } from "passkit-generator";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

function getCertificates() {
  // In production (Vercel): certs are base64-encoded env vars
  // In local dev: read from files
  if (process.env.APPLE_PASS_CERT) {
    return {
      signerCert: Buffer.from(process.env.APPLE_PASS_CERT, "base64"),
      signerKey: Buffer.from(process.env.APPLE_PASS_KEY, "base64"),
      wwdr: Buffer.from(process.env.APPLE_WWDR_CERT, "base64"),
      signerKeyPassphrase: process.env.PASS_KEY_PASSPHRASE || undefined,
    };
  }

  // Local dev fallback
  const certDir = path.resolve(import.meta.dirname, "certificates");
  return {
    signerCert: fs.readFileSync(path.join(certDir, "signerCert.pem")),
    signerKey: fs.readFileSync(path.join(certDir, "signerKey.pem")),
    wwdr: fs.readFileSync(path.join(certDir, "wwdr.pem")),
    signerKeyPassphrase: process.env.PASS_KEY_PASSPHRASE || undefined,
  };
}

function getTemplateBuffers(passType) {
  const templateDir = path.resolve(import.meta.dirname, "pass-templates", passType);
  const files = fs.readdirSync(templateDir).filter((f) => f.endsWith(".png"));
  const buffers = {};
  for (const file of files) {
    buffers[file] = fs.readFileSync(path.join(templateDir, file));
  }
  return buffers;
}

function getTemplatePassJson(passType) {
  const templateDir = path.resolve(import.meta.dirname, "pass-templates", passType);
  const raw = fs.readFileSync(path.join(templateDir, "pass.json"), "utf-8");
  return JSON.parse(raw);
}

export async function createPass({
  passType = "room-key",
  roomNumber = "Suite 407",
  hotelName = "The Vaulted",
  checkIn = "Jul 15",
  checkOut = "Jul 18",
  email = "",
} = {}) {
  const certs = getCertificates();
  const templateJson = getTemplatePassJson(passType);
  const templateBuffers = getTemplateBuffers(passType);

  // Override template values with env vars
  templateJson.passTypeIdentifier =
    process.env.PASS_TYPE_IDENTIFIER || templateJson.passTypeIdentifier;
  templateJson.teamIdentifier =
    process.env.TEAM_IDENTIFIER || templateJson.teamIdentifier;
  templateJson.serialNumber = uuidv4();

  // Set dynamic field values
  if (passType === "room-key") {
    templateJson.generic.primaryFields[0].value = roomNumber;
    templateJson.generic.secondaryFields[0].value = hotelName;
    templateJson.generic.auxiliaryFields[0].value = checkIn;
    templateJson.generic.auxiliaryFields[1].value = checkOut;
  }

  const pass = new PKPass(
    {},
    {
      wwdr: certs.wwdr,
      signerCert: certs.signerCert,
      signerKey: certs.signerKey,
      signerKeyPassphrase: certs.signerKeyPassphrase,
    },
    templateJson
  );

  // Add image buffers
  for (const [filename, buffer] of Object.entries(templateBuffers)) {
    pass.addBuffer(filename, buffer);
  }

  const buffer = pass.getAsBuffer();
  return buffer;
}
