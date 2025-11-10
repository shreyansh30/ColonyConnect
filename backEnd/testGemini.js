import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

async function testGemini() {
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
  const body = {
    contents: [
      {
        parts: [{ text: "Say hello from Gemini using REST API!" }],
      },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("❌ Request failed:", res.status, res.statusText);
    const text = await res.text();
    console.error(text);
    return;
  }

  const data = await res.json();
  console.log("✅ Gemini response:", data.candidates?.[0]?.content?.parts?.[0]?.text);
}

testGemini();
