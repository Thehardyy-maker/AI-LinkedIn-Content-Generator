import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

app.post("/api/generate", async (req, res) => {
  try {
    const { topic, tone } = req.body;

    const completion = await client.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "user",
          content: `
          Write a LinkedIn post about: ${topic}

          Tone: ${tone}

          Include:
          - Hook
          - Main post
          - CTA
          - Hashtags
          `,
        },
      ],
    });

    const content = completion.choices[0].message.content;

    res.json({
      content,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate content",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

