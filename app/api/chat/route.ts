import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: "sk-73f0e43d32d24c65b1ba8d5940db7584",
  baseURL: 'https://api.deepseek.com/v1'
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const completion = await openai.chat.completions.create({
    model: 'deepseek-chat',
    messages: [
      {
        role: 'system',
        content: `You are a marketing campaign assistant specializing in gaming and influencer marketing. 
        Your goal is to gather three key pieces of information:
        1. Campaign objective
        2. Target audience demographics
        3. Target regions
        
        Analyze user responses to extract this information and provide relevant guidance for using games 
        and game elements in their marketing campaign. Keep responses concise and focused.`
      },
      ...messages
    ]
  })

  return Response.json({ content: completion.choices[0].message.content })
} 