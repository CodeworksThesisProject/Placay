import bodyParser from "body-parser";
import express, { Application } from "express";
import authRoute from "./routes/authRoute";
import adminRoutes from "./routes/adminRoute";

const app: Application = express();

app.use(bodyParser.json());

// Routes
app.use("/api", authRoute);
app.use("/admin", adminRoutes);

export default app;
