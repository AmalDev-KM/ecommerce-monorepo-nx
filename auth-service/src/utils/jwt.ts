import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export function generateAccessToken(userId: string) {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '1d',
  });
}
