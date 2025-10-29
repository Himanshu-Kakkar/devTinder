const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini
const genAI = new GoogleGenerativeAI("YOUR_API_KEY_HERE");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Read files from disk
function readFile(relativePath) {
  return fs.readFileSync(path.resolve(__dirname, relativePath), "utf-8");
}

// Read project files (you can add more as needed)
const readme = readFile("../README.md");
const routes = readFile("./routes.js");
const swipeScreen = readFile("../frontend/SwipeScreen.js");

// System prompt context
const systemInstructions = `
You are an assistant for a devConnect app. Only answer questions based on the following project files. Do not answer anything unrelated.

# README.md
${readme}

# backend/routes.js
${routes}

# frontend/SwipeScreen.js
${swipeScreen}
`;

async function askGemini(userQuestion) {
  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: systemInstructions },
            { text: `User question: ${userQuestion}` },
          ],
        },
      ],
    });

    return result.response.text();
  } catch (err) {
    console.error("Gemini error:", err);
    return "Error while processing the request.";
  }
}

module.exports = { askGemini };







// routes/ askGemini.js

const express = require("express");
const router = express.Router();
const { askGemini } = require("../gemini");

router.post("/api/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "No question provided." });
  }

  const answer = await askGemini(question);
  res.json({ answer });
});

module.exports = router;






// Server.js
const express = require("express");
const app = express();
const askRoute = require("./routes/ask");

app.use(express.json());
app.use("/", askRoute);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});






// frontend code react-native

const res = await fetch("http://localhost:3000/api/ask", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ question: "How does matching work?" }),
});

const data = await res.json();
console.log("Answer:", data.answer);
