import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDb.js";

import authRouter from "./routes/authRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import CompanyRouter from "./routes/companyRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";

dotenv.config();
const app = express();

//  Allow frontend ports (5173 & 5174 both)
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(cookieParser());

// Connect to DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("hello");
});


app.use("/uploads", express.static("uploads"));
app.use("/auth", authRouter);
app.use("/user", UserRouter);
app.use("/category", categoryRouter);
app.use("/company", CompanyRouter);
app.use("/job", jobRouter);
app.use("/application", applicationRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
