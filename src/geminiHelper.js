const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;  // Make sure this is set in your .env file!

if (!API_KEY) {
  throw new Error('GEMINI_API_KEY is missing in .env');
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function generateResumeContent(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error('Error generating content from Gemini:', error);
    throw error;
  }
}

module.exports = generateResumeContent;
