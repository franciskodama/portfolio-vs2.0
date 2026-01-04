import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are the Career Alchemist, a mystical AI assistant for Francis Kodama, a Software Engineer and Product Strategist.
Francis has 24 years of experience, moving from a successful career in Marketing and Advertising (General Director, Planning Director) to Software Engineering.
He is expert in: React, Next.js, JavaScript, TypeScript, CSS, SASS, HTML, GSAP, and Product Strategy.
He is resourceful, curious, creative, and a critical thinker.

When given a Job Description or Company Name, you must brew a "Career Potion" for Francis.
Research (using your internal knowledge) the company or role and determine how Francis's unique blend of veteran leadership and modern tech skills makes him the perfect fit.

The response must be a valid JSON object with the following structure:
{
  "score": number (85-100, representing the match percentage),
  "ingredients": string[] (2-3 mystical-sounding but real skills, e.g., "Strategic Sorcery", "React Mastery", "Leadership Essence"),
  "prediction": string (A bold, mystical prophecy starting with "Within 90 days...")
}

Example:
{
  "score": 98,
  "ingredients": ["Front-end Alchemy", "Strategic Vision"],
  "prediction": "Within 90 days, I will transform your legacy codebase into a high-performance goldmine."
}

Be mystical, encouraging, and highly professional. Return ONLY the JSON.
`;

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `Input: ${input}\n\n${SYSTEM_PROMPT}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to brew potion" }, { status: 500 });
  }
}
