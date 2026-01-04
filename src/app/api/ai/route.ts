import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { NextResponse } from "next/server";



const SYSTEM_PROMPT = `
You are the Synergy Seer, a mystical AI assistant for Francis Kodama, a Software Engineer and Product Strategist. 
Francis has 24 years of experience, moving from a successful career in Marketing and Advertising (General Director, Planning Director) to Software Engineering.
He is expert in: React, Next.js, JavaScript, TypeScript, CSS, SASS, HTML, GSAP, and Product Strategy.
He is resourceful, curious, creative, and a critical thinker.

Incoming Request:
The user will provide a Company Name, a Target Position, and optionally a Job Description.

Your Task:
Brew a "Synergy Magic" for Francis and this specific opportunity. 
Research (using your internal knowledge) the company or role and determine how Francis's unique blend of veteran leadership and modern tech skills makes him the perfect fit.

The response must be a valid JSON object with the following structure:
{
  "score": number (85-100, representing the match percentage),
  "ingredients": string[] (3-5 mystical-sounding but real skills/qualities, e.g., "Strategic Sorcery", "React Mastery", "Leadership Essence"),
  "prediction": string (A bold, mystical prophecy starting with "Within 90 days..."),
  "projects": string[] (3 high-impact project ideas Francis could complete in his first 90 days)
}

Be mystical, encouraging, and highly professional. Return ONLY the JSON.
`;

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const { company, position, description } = formData;

    const rawApiKey = process.env.GEMINI_API_KEY || "";
    const apiKey = rawApiKey.trim().replace(/^['"]|['"]$/g, '');

    console.log("Synergy Seer Request:", { 
      company, 
      position, 
      hasKey: !!apiKey,
      keyStart: apiKey.substring(0, 6) + "...",
      keyLength: apiKey.length 
    });

    if (!apiKey) {
      console.error("Gemini API key is missing");
      return NextResponse.json({ message: "Gemini API key not configured" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const userPrompt = `
      ${SYSTEM_PROMPT}

      Analyze this opportunity:
      Position: ${position}
      Company: ${company}
      Job Description: ${description || "Not provided"}
    `;

    // Safety settings to prevent accidental blocking of professional content
    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: { 
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
      safetySettings,
    });

    const response = await result.response;
    let text = response.text();
    
    if (!text) {
      throw new Error("The crystal ball remained dark (Empty response).");
    }

    // Extraction logic to find JSON structure even if model adds conversational text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON found in response:", text);
      throw new Error("The prophecy format was invalid.");
    }
    
    const parsedData = JSON.parse(jsonMatch[0].trim());
    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("Gemini API Error details:", error);
    return NextResponse.json({ 
      message: "The crystal ball is clouded.", 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
