import bodyParser from "body-parser";
import express, { Application } from "express";
import authRoute from "./routes/authRoute";
import adminRoutes from "./routes/adminRoute";
import cityRouter from "./routes/cityRoute";
import cors from 'cors';

// Load enviroment variables
process.env.NODE_ENV == 'develop'
  ? require('dotenv').config({ path: '.env.development.local' })
  : require('dotenv').config({ path: '.env.production.local' });

const app: Application = express();

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
app.use("/", cityRouter); //Just 1 route, we need the cityRoute File?

export default app;
