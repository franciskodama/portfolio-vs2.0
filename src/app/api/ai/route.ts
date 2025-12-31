import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  const body = await request.json();
  const { prompt } = body;

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('Missing OpenAI API key');
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  if (!prompt || prompt.trim().length === 0) {
    return NextResponse.json({ message: 'Prompt is required' }, { status: 400 });
  }

  console.log('AI request received with prompt length:', prompt.length);

  const openai = new OpenAI({
    apiKey: apiKey,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful and creative assistant. Provide concise, accurate, and engaging responses.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const result = completion.choices[0].message.content?.trim() || 'No response generated.';

    console.log('AI response generated successfully');
    return NextResponse.json({ 
      result: result,
      model: completion.model,
      usage: completion.usage 
    });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    
    let userMessage = 'Error generating response';
    if (error?.status === 401) {
      userMessage = 'API authentication failed. Please check your API key.';
    } else if (error?.status === 429) {
      userMessage = 'Rate limit exceeded. Please try again later.';
    } else if (error?.status === 500) {
      userMessage = 'OpenAI service error. Please try again.';
    }
    
    return NextResponse.json({ 
      message: userMessage,
      error: error?.message || 'Unknown error',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    }, { status: 500 });
  }
}
