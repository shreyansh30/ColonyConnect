/* eslint-disable */
// @ts-nocheck
import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: {
      type: String,
      enum: ["Road", "Water", "Electricity", "Garbage", "Other"],
      default: "Other",
    },
    location: {
      lat: Number,
      lng: Number,
    },
    imageUrl: String,

    // 🧠 AI fields (added here)
    priority: { type: String, default: "Medium" }, // Gemini-detected urgency
    summary: { type: String }, // Gemini-generated short summary

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Issue", issueSchema);
