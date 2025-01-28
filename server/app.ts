import bodyParser from "body-parser";
import express, { Application } from "express";
import authRoute from "./routes/authRoute";
import adminRoutes from "./routes/adminRoute";

// Load enviroment variables
// Only include it here, its then avalible and set for all other files
process.env.NODE_ENV == 'develop'
  ? require('dotenv').config({ path: '.env.development.local' })
  : require('dotenv').config({ path: '.env.production.local' });

const app: Application = express();

app.use(bodyParser.json());

// Routes
app.use("/api", authRoute);
app.use("/admin", adminRoutes);

export default app;
