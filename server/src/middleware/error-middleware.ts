import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import { HttpException } from "@/utils/HttpException";
import { ErrorType, NODE_ENV } from "@/utils/options";
import { ZodError } from "zod";

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

  // TODO: zod error
  if (err instanceof ZodError) {
    const zodErrors = err.errors.map((error) => {
      return { path: error.path[0], message: error.message };
    });
    console.error("🚀🚀❌❌ error showing: ", zodErrors);
    status = 400;
    message = "ValidationError";
    errors = zodErrors;
  }

  // TODO: no directory error
  if (err.code?.toString() === ErrorType.NoDirError) {
    message = "File not found or path is invalid!";
    status = 404;
  }

  // TODO: duplicate error
  // console.error("🚀🚀❌❌ error showing: ", err);

  return res.status(status).json({
    success: false,
    stack:
      String(process.env.NODE_ENV) === String(NODE_ENV.DEV)
        ? err.stack
        : "⚠️ not permitted ❌",
    message,
    errors: errors.length > 0 ? errors : null,
  });
};
