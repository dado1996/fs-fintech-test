import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { initializeDatabase } from "./config/db";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import errorHandler from "./middleware/errorHandler";
import * as admin from "firebase-admin";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize Firebase Admin SDK
admin.initializeApp();

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use(errorHandler);

// Start the server after database initialization
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
