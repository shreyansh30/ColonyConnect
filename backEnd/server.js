/* eslint-disable */
// @ts-nocheck
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(morgan("dev"));

import userRoutes from "./routes/userRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
app.use("/api/users", userRoutes);
app.use("/api/issues", issueRoutes);




// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ Error connecting to DB:", err));

// Test route
app.get("/", (req, res) => res.send("ColonyConnect API Running"));
import chatbotRoutes from "./routes/chatbotRoutes.js";
app.use("/api/chatbot", chatbotRoutes);

// Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

