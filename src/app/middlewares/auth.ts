import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwt_access_secret!);
    req.user = decoded; // attach user {id, role}
    next();
  } catch {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
