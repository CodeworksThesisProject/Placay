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

// Load enviroment variables
process.env.NODE_ENV == 'develop'
  ? require('dotenv').config({ path: '.env.development.local' })
  : require('dotenv').config({ path: '.env.production.local' });

const app: Application = express();

// To get info from cookies
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(fileUpload());

// Routes for Data Uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes used for Requests
app.use("/api", authRoute);
app.use("/admin", adminRoutes);
app.use("/city", cityRouter);
app.use("/profile", profileRoutes);
app.use("/tour", tourRouter);

export default app;