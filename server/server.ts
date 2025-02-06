import dotenv from 'dotenv';
import app from "./app";
import { connectDB } from "./config/db";

// Load enviroment variables
// This only needs to be done once here and it will then be set for all following modules
dotenv.config({ path: process.env.NODE_ENV === 'develop' ? '.env.development.local' : '.env.production.local' });

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });