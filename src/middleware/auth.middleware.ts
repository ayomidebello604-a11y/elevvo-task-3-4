import {  type TokenPayload } from "../utils/jwt.ts";
import {type  Request, type Response, type  NextFunction } from "express";
import { verifyToken,type Role } from "../utils/jwt.ts";


declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers["authorization"];

  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. Token missing or malformed." });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decodedUser = verifyToken(token);
   req.user = decodedUser;
  next();
  } catch (error) {
   
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export const authorizeRole = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
 
    if (!req.user) {
      return res.status(401).json({ 
        message: "Unauthorized: User authentication required." 
      });
    }

   
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: "Forbidden: You do not have permission to access this resource." 
      });
    }

    next();
  };
};