import crypto from "crypto";

export function generateOTP(): string {
  return crypto.randomInt(10000, 99999).toString();
}
