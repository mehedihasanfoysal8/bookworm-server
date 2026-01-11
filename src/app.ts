import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundHandler from "./app/middlewares/notFoundHandler";
import router from "./app/routes";
import config from "./app/config";

const app = express();

const defaultOrigins = [
  "https://easternbazarltd.com",
  "https://admin.easternbazarltd.com",
  "http://www.easternbazarltd.com",
  "http://www.admin.easternbazarltd.com",
];

const allowedOrigins = config.origins
  ? config.origins
      .split(",")
      .map((origin: any) => origin.trim())
      .filter(Boolean)
  : defaultOrigins;

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

const corsOptions: cors.CorsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(
  cors({
    origin: config.origins,
    credentials: true,
  })
);

/* ---------------------------------------------------
   Routes
--------------------------------------------------- */

app.use("/api/v1", router);

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Bookworm server running 🚀");
});

/* ---------------------------------------------------
   Error Handlers
--------------------------------------------------- */

// Global error handler
app.use(globalErrorHandler);

// 404 handler
app.use(notFoundHandler);

export default app;
