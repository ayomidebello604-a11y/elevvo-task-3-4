import jwt from "jsonwebtoken";

export type Role = "USER" | "ADMIN";

export interface TokenPayload {
  id: string;
  email: string;
  role: Role;
}

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (payload: TokenPayload): string => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined.");
  }

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "20m",
  });
};

export const verifyToken = (token: string): TokenPayload => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined.");
  }

  return jwt.verify(token, JWT_SECRET) as TokenPayload;
  
};