import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";


import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/JP")
    .then(() => console.log("Database connected"))
    .catch((err) => console.log("DB connection failed:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
