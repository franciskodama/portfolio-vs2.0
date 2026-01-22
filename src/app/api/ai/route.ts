import OpenAI from 'openai';
import { NextResponse } from 'next/server';

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
  "score": number (94-100, representing the match percentage),
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

    const apiKey = process.env.OPENAI_API_KEY;

    console.log('Synergy Seer Request (OpenAI):', {
      company,
      position,
      hasKey: !!apiKey,
    });

    if (!apiKey) {
      console.error('OpenAI API key is missing');
      return NextResponse.json(
        { message: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `
            Analyze this opportunity:
            Position: ${position}
            Company: ${company}
            Job Description: ${description || 'Not provided'}
          `,
        },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;

    if (!content) {
      throw new Error('The crystal ball remained dark (Empty response).');
    }

    const parsedData = JSON.parse(content);
    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error('OpenAI API Error details:', error);
    return NextResponse.json(
      {
        message: 'The crystal ball is clouded.',
        error: error.message,
        details:
          process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
