import bodyParser from "body-parser";
import express, { Application } from "express";
import authRoute from "./routes/authRoute";

const app: Application = express();

app.use(bodyParser.json());

// Routes
app.use("/api", authRoute);

export default app;
