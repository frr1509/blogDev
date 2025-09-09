import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const sign = process.env.JWT_SECRET

export async function generateToken(payload) {
  return jwt.sign(payload, sign, { expiresIn: "30d" });
}

export async function verifyToken(token) {
  return jwt.verify(token, sign);
}
