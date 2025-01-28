import dotenv from 'dotenv';
import app from "./app";
import { connectDB } from "./config/db";

dotenv.config();

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
