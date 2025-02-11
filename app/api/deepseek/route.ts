import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1',
  defaultHeaders: {
    'Content-Type': 'application/json'
  }
});

// Simple in-memory cache for development
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour in milliseconds

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!process.env.DEEPSEEK_API_KEY) {
      throw new Error('DeepSeek API key not configured');
    }

    const messages = [{
      role: "system",
      content: "You are a gaming marketing expert. Analyze campaign requirements and match them with game properties. Return a JSON response with recommended games and analysis."
    }, {
      role: "user",
      content: `Analyze this campaign:
        Objective: ${body.objective}
        Target Audience: ${body.target}
        Region: ${body.region}
        
        Provide recommendations in this JSON format:
        {
          "recommendedGames": ["game_id1", "game_id2"],
          "gameStrategy": "strategy description",
          "audienceMatch": "audience analysis",
          "regionalFocus": "regional strategy"
        }`
    }];

    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: messages,
      temperature: 0.3,
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    return NextResponse.json({
      response: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('DeepSeek API error:', error);
    return NextResponse.json(
      { error: "Failed to get AI response", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}