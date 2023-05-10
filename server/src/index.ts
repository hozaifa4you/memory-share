import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// config
dotenv.config();
const port = (process.env.PORT as string) || 8080;
const frontend_origin = process.env.FRONTEND_ORIGIN as string;
const backend_origin = process.env.BACKEND_ORIGIN as string;
const app = express();

// middleware
const middleware = [
  morgan("dev"),
  cors({ origin: frontend_origin, credentials: true }),
  express.json({ limit: "3mb" }),
  express.urlencoded({ limit: "3mb", extended: false }),
];
app.use(middleware);

// listen
app.listen(port, async () => {
  console.log(`Server is listening on: ${backend_origin}`);
});
