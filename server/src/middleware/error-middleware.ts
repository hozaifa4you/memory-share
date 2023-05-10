import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import { HttpException } from "@/utils/HttpException";
import { ErrorType, NODE_ENV } from "@/utils/options";

dotenv.config();

// const not found
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const message = `🔥 The requested path was not found ${req.originalUrl} ❌`;

  return next(new HttpException(message, 404, null));
};

// main error handler
export const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status: number = err.status || 500;
  let message: string = err.message || "🔥 internal server error ❌";
  let errors: object[] = [];

  // FIXME: remove in the future
  console.error("❌ error showing: ", err);

  // TODO: no directory error
  if (err.code?.toString() === ErrorType.NoDirError) {
    message = "File not found or path is invalid!";
    status = 404;
  }

  return res.status(status).json({
    success: false,
    stack:
      process.env.NOTE_ENV === NODE_ENV.DEV ? err.stack : "⚠️ not permitted ❌",
    message,
    errors: errors.length > 0 ? errors : null,
  });
};
