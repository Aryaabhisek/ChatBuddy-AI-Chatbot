const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

 
require('dotenv').config();
const apiKey = process.env.API_KEY;

const ai = new GoogleGenAI({ apiKey: apiKey });

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userMessage,
    });
    res.json(response); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/', (req, res) => {
  res.send('AI Chatbot backend is running.');
});

app.listen(3000, () => console.log('Server running on port 3000'));