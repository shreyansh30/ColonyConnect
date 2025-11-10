import express from "express";
import { chatbotReplyGemini } from "../utils/geminiAi.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Received message from frontend:", message); // debug
    const reply = await chatbotReplyGemini(message);
    console.log("Gemini reply:", reply); // debug
    res.json({ reply });
  } catch (err) {
    console.error("Chatbot route error:", err);
    res.status(500).json({ reply: "⚠️ AI connection failed." });
  }
});

export default router;
