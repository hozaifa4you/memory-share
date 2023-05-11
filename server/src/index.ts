import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import "module-alias/register";

// import userRoutes from "@/routes/user-routes";
import userRoutes from "@/routes/user-routes";
import { errorHandler, notFound } from "@/middleware/error-middleware";

// config
dotenv.config();
const port = (process.env.PORT as string) || 8080;
const frontend_origin = process.env.FRONTEND_ORIGIN as string;
const backend_origin = process.env.BACKEND_ORIGIN as string;
const app = express();

// declare
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: object | string | undefined | null;
    }
  }
}

// middleware
const middleware = [
  morgan("dev"),
  cors({ origin: frontend_origin, credentials: true }),
  express.json({ limit: "3mb" }),
  express.urlencoded({ limit: "3mb", extended: false }),
];
app.use(middleware);

// static path
const dirname = path.resolve();
app.use("/public", express.static(path.join(dirname, "/public")));

app.use("/api/v1/users", userRoutes);

// error
app.use([notFound, errorHandler]);

// listen
app.listen(port, async () => {
  console.log(`Server is listening on: ${backend_origin}`);
});
