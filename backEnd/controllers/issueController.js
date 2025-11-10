/* eslint-disable */
// @ts-nocheck
import Issue from "../models/issueModel.js";
// import { uploadToCloudinary } from "../utils/cloudinary.js"; // keep this if you already use it
import { detectPriorityGemini, summarizeReportGemini } from "../utils/geminiAi.js";

// ✅ CREATE ISSUE (with Gemini AI auto priority + summary)
export const createIssue = async (req, res) => {
  try {
    const { title, description, category, lat, lng } = req.body;

    // Handle image upload if available
    const imageUrl = req.file ? req.file.path : null;


    // 🧠 AI: Detect priority & summarize
    const priority = await detectPriorityGemini(title, description);
    const summary = await summarizeReportGemini(description);

    // Create issue document
    const issue = await Issue.create({
      title,
      description,
      category,
      imageUrl,
      location: lat && lng ? { lat, lng } : undefined,
      priority,
      summary,
      status: "Pending",
    });

    res.status(201).json(issue);
  } catch (err) {
    console.error("❌ Error creating issue:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET ALL ISSUES
export const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    console.error("❌ Error fetching issues:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE ISSUE STATUS (used by admin)
export const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Issue.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: "Issue not found" });

    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating issue status:", err);
    res.status(500).json({ error: err.message });
  }
};
