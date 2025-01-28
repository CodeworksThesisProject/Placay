import bodyParser from "body-parser";
import express, { Application } from "express";
import authRoute from "./routes/authRoute";
import cityRouter from "./routes/cityRoute";
import cors from 'cors';

const app: Application = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoute);
app.use("/", cityRouter); //Just 1 route, we need the cityRoute File?


export default app;
