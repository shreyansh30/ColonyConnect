import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

async function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`Gemini API error ${res.status}: ${res.statusText}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No reply.";
}

export async function chatbotReplyGemini(message) {
  try {
    const prompt = `
You are **ColonyConnect Assistant**, a polite and concise civic helpdesk chatbot. 

🎯 Guidelines:
- Always keep answers **under 80 words**.
- Use **simple, short sentences**.
- If a process has steps, show them as a short numbered list (max 4 steps).
- Never include long paragraphs, disclaimers, or unnecessary details.
- Sound friendly and professional, like a government helpdesk assistant.
- Use 1–2 relevant emojis to make answers engaging, but never spam them.


👤 User: ${message}

✍️ Respond:
`;

    return await callGemini(prompt);
  } catch (err) {
    console.error("Gemini chatbot error:", err);
    return "⚠️ Failed to connect to AI service.";
  }
}

export async function summarizeReportGemini(description) {
  try {
    const prompt = `Summarize this civic issue in one sentence for an admin dashboard:\n${description}`;
    return await callGemini(prompt);
  } catch (err) {
    console.error("Gemini summary error:", err);
    return "Summary unavailable.";
  }
}

export async function detectPriorityGemini(title, description) {
  try {
    const prompt = `
Determine the urgency of this civic issue (High, Medium, or Low):
Title: ${title}
Description: ${description}
Respond with only one word.
`;
    return await callGemini(prompt);
  } catch (err) {
    console.error("Gemini priority error:", err);
    return "Medium";
  }
}
