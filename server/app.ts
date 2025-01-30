import bodyParser from "body-parser";
import express, { Application } from "express";
import authRoute from "./routes/authRoute";
import adminRoutes from "./routes/adminRoute";
import cityRouter from "./routes/cityRoute";
import profileRoutes from "./routes/profileRoute";
import cors from 'cors';
import cookieParser from "cookie-parser";

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

//app.use(cors()); check if everything works with previous

app.use(express.json());

// Routes
app.use("/api", authRoute);
app.use("/admin", adminRoutes);
app.use("/city", cityRouter);
app.use("/profile", profileRoutes);

export default app;
