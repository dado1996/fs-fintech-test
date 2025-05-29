import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";
import { verifyToken } from "../util/token";
import { JwtPayload } from "jsonwebtoken";

// Extend the Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string;
    }
  }
}

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = verifyToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ error: "Forbidden" });
  }
};

export default authenticate;
