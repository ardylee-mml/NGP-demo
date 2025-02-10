import OpenAI from 'openai';
import { NextResponse } from 'next/server';

type ChatMessage = {
  role: "assistant" | "user" | "system";
  content: string;
};

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com/v1',
  apiKey: process.env.DEEPSEEK_API_KEY,
  timeout: 15000,
});

// Simple in-memory cache for development
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour in milliseconds

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: `You are a friendly marketing assistant helping plan a Roblox marketing campaign.
Guide and drive the conversation to collect these 3 key pieces of information:
1. Campaign objective (e.g., launch, awareness)
2. Target audience (age, demographics)
3. Target regions/markets

If objective is missing, ask about campaign goals.
If audience is missing, ask about target demographics.
If region is missing, ask about target markets.
Once all information is collected, provide a summary.

Keep responses under 150 characters.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 500
    });

    const response = completion.choices[0].message.content;
    
    return NextResponse.json({
      response: response || "Could you tell me more about your campaign goals?"
    });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({
      response: "Could you tell me more about your campaign goals?"
    });
  }
}