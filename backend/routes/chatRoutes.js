import express from "express";
import Chat from "../models/Chat.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  // Dummy responses (replace with Gemini / other LLMs)
  const responses = {
    model1: "Response from Model 1",
    model2: "Response from Model 2",
    model3: "Response from Model 3"
  };

  const chat = await Chat.create({ prompt, responses });
  res.json(chat);
});

export default router;
