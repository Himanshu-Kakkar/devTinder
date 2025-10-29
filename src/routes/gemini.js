const express = require("express");
const geminiRouter = express.Router();

// Example: Using OpenAI (replace with your actual model logic)
const { OpenAI } = require("openai"); // or your Gemini SDK
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

geminiRouter.post("/ai/search", async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: "No query provided." });

  try {
    // Replace this with your Gemini or OpenAI call
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or your Gemini model
      messages: [{ role: "user", content: query }],
    });
    const result = completion.choices[0].message.content;
    res.json({ result });
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ error: "AI service error" });
  }
});

module.exports = geminiRouter;