import express, { Application } from "express";
import cors from 'cors';
import path from "path";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import authRoute from "./routes/authRoute";
import adminRoutes from "./routes/adminRoute";
import cityRouter from "./routes/cityRoute";
import tourRouter from "./routes/toursRoute";
import profileRoutes from "./routes/profileRoute";
import GoogleRoute from "./routes/GoogleRoute";

const app: Application = express();

// To get info from cookies
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());
app.use(fileUpload());

// Routes for Data Uploads
const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";
app.use("/uploads", express.static(path.join(__dirname, UPLOAD_DIR)));

// Routes used for Requests
app.use("/api", authRoute);
app.use("/admin", adminRoutes);
app.use("/city", cityRouter);
app.use("/user", profileRoutes);
app.use("/tour", tourRouter);
app.use("/google", GoogleRoute);

export default app;