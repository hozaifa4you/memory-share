import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const jwt_secret = process.env.JWT_SECRET as string;

export interface DecodedUserType {
  id: string;
  userType: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp: number;
}

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("⚠️ unauthorized request ❌");
  }

  const token = header.split(" ")[1];
  if (!token) {
    res.status(401);
    throw new Error("⚠️ unauthorized request ❌");
  }
  const decoded = jwt.verify(token, jwt_secret) as DecodedUserType;
  if (!decoded) {
    res.status(401);
    throw new Error("⚠️ unauthorized request ❌");
  }
  const user = await prisma.user.findFirst({ where: { id: decoded.id } });
  if (!user) {
    res.status(401);
    throw new Error("⚠️ unauthorized request ❌");
  }

  req.user = decoded;
  next();
};
