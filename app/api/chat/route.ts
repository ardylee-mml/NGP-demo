import { NextResponse } from 'next/server'
import { analyzeIntent, campaignPatterns } from '@/lib/chatPatterns'
import { LearningService } from '@/lib/learningService'

interface ConversationState {
  objective?: string
  audience?: string
  region?: string
  stage: 'objective' | 'audience' | 'region' | 'complete'
}

interface ChatMessage {
  role: string;
  content: string;
}

const learningService = new LearningService()

export async function POST(req: Request) {
  const { messages } = await req.json()
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''
  
  // Track conversation state through messages
  const state: ConversationState = {
    stage: 'objective'
  }
  
  let isComplete = false  // Single declaration at the top
  
  // Analyze previous messages to build context
  for (const msg of messages) {
    if (msg.role === 'user') {
      if (!state.objective && (msg.content.toLowerCase().includes('launch') || msg.content.toLowerCase().includes('lego'))) {
        state.objective = msg.content
        state.stage = 'audience'
      } else if (!state.audience && (msg.content.toLowerCase().includes('age') || msg.content.toLowerCase().includes('stem'))) {
        state.audience = msg.content
        state.stage = 'region'
      } else if (!state.region && (lastMessage.includes('usa') || lastMessage.includes('asia'))) {
        state.region = lastMessage
        state.stage = 'complete'
        isComplete = true
      }
    }
  }

  // Update isComplete based on all conditions
  isComplete = isComplete || Boolean(state.objective && state.audience && state.region)

  // Use learning service to analyze and generate response
  const analysis = await learningService.analyzeResponse(
    lastMessage,
    messages.map((m: ChatMessage) => m.content).join('\n')
  )

  // Generate contextual response
  let response = ''

  if (analysis) {
    if (analysis.category === 'objective') {
      response = "A product launch campaign! Could you tell me about your target audience? For example, their age range and interests?"
    } else if (analysis.category === 'audience') {
      response = "Perfect! Now, which regions or countries would you like to target with this campaign?"
    } else if (analysis.category === 'region') {
      response = "Great! I have all the information needed. Let me prepare your campaign recommendations with suitable games and KOLs."
      isComplete = true
    } else {
      response = analysis.followUp[0]
    }
  } else {
    response = "I understand. Could you tell me more about your campaign objective?"
  }

  // Store successful interactions for learning
  if (state.stage === 'complete') {
    learningService.learnFromInteraction(messages.map((m: ChatMessage) => m.content))
  }
  
  return NextResponse.json({
    response: isComplete ? 
      "Great! I have all the information needed. Let me prepare your campaign recommendations with suitable games and KOLs." :
      response,
    extractedInfo: {
      objective: state.objective,
      audience: state.audience,
      region: state.region,
      stage: state.stage,
      isComplete: isComplete
    }
  })
} 