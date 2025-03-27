const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to calculate urgency based on votes
const calculateUrgency = (votes) => {
  if (votes >= 50) return "High";
  if (votes >= 20) return "Medium";
  return "Low";
};

// Function to extract city from address
const extractCity = (address) => {
  return address.split(",")[1]?.trim() || "Unknown City"; // Extract city from address
};

// Function to generate AI analysis using Gemini API
const analyzeProblems = async (problems) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Construct AI prompt
    const prompt = `
      Analyze the following problem statements, determine their urgency, and categorize them by city:

      ${JSON.stringify(problems)}

      Provide:
      1. Urgency levels (High, Medium, Low)
      2. Categorization by city
      3. A short AI-generated report highlighting key concerns
      give this to the point and presize
    `;

    // ✅ Correct way to call Gemini API
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // ✅ Correct way to get response text
    const text =
      result.response.candidates[0]?.content?.parts[0]?.text ||
      "No response from AI";

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

module.exports = { calculateUrgency, extractCity, analyzeProblems };
