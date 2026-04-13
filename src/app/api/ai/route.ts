import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
You are the Synergy Seer, a high-level strategic advisor and mystical architect for Francis Kodama. 

FRANCIS KODAMA PROFILE:
- Title: Technical Product Lead & FinTech Architect. 
- Experience: 20+ years at the convergence of business strategy and engineering. 
- Leadership Differentiator: This is his primary edge. Francis possesses the rare ability to govern high-stakes technical culture while speaking the language of P&L and stakeholder value. He has directed enterprise teams of 100+ (Rapp) and scaled a 26-person agency from the ground up as a Founder (Circus). [cite: 6, 22]
- Technical Core: High-velocity React/Next.js ecosystem, TypeScript, Prisma/Neon, and AI-augmented workflows. [cite: 7, 13, 21]
- Unique Edge: He bridges "Director-level" P&L strategy with hands-on systems architecture. He builds in weeks what takes traditional teams months. 

INCOMING REQUEST:
The user provides a Company Name, a Target Position, and a Job Description.

YOUR TASK:
Analyze the company’s market position and the specific role. Brew a "Synergy Logic" that proves Francis is the rare asset who can lead the product vision while architecting the technical solution. 

PROXIMITY REQUIREMENT:
To create deep proximity and a personalized experience, you MUST weave the [Company Name] throughout the response. The company's name should appear naturally at least 3-4 times across the "prediction" and "projects" descriptions to make the prophecy feel tailor-made for their specific context.

RESPONSE REQUIREMENTS (JSON ONLY):
{
  "score": number (94-100),
  "ingredients": string[] (4-5 items. Mix technical mastery with executive authority. Use terms like "Architectural Alchemy," "Founder DNA," "FinTech Intuition," "AI Velocity," "Stakeholder Synthesis"),
  "prediction": string (A bold prophecy starting with "Within 90 days..." focusing on structural impact and business value. Ensure the Company Name is mentioned here.),
  "projects": [
    {
      "title": "string (Short, punchy title)",
      "description": "string (Detailed explanation of how Francis executes this and the specific benefit to [Company Name])"
    }
  ] (Exactly 3 projects)
}

TONE: 
A blend of "Grounded Executive" and "Technomancer." Professional, authoritative, slightly witty, and highly strategic. Use the "Director's Perspective."
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
