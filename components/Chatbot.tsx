"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, MessageSquare, Sparkles, Target, Users, Globe2 } from "lucide-react"
import { useMarketingCampaign } from "@/contexts/MarketingCampaignContext"
import { games, Game } from '@/lib/gameDatabase'

type ConversationState = 'objective' | 'audience' | 'region' | 'complete'

const validateAnswer = (type: ConversationState, answer: string): { valid: boolean; isQuestion: boolean } => {
  const answer_lower = answer.toLowerCase()
  const isQuestion = answer_lower.includes('?') || 
    answer_lower.includes('why') || 
    answer_lower.includes('what') || 
    answer_lower.includes('how')

  if (isQuestion) {
    return { valid: false, isQuestion: true }
  }

  switch (type) {
    case 'objective':
      return {
        valid: answer_lower.includes('awareness') ||
          answer_lower.includes('sales') ||
          answer_lower.includes('engagement') ||
          answer_lower.includes('brand') ||
          answer_lower.includes('promote') ||
          answer_lower.includes('launch') ||
          answer_lower.includes('market'),
        isQuestion: false
      }
    case 'audience':
      return {
        valid: answer_lower.includes('age') ||
          answer_lower.includes('year') ||
          answer_lower.includes('gender') ||
          answer_lower.includes('male') ||
          answer_lower.includes('female') ||
          answer_lower.includes('student') ||
          answer_lower.includes('professional') ||
          answer_lower.includes('gamer'),
        isQuestion: false
      }
    case 'region':
      return {
        valid: (answer_lower.includes('asia') ||
          answer_lower.includes('europe') ||
          answer_lower.includes('america') ||
          answer_lower.includes('africa') ||
          answer_lower.includes('country') ||
          /\b[a-z]{2,}\b/.test(answer_lower)) && 
          !isQuestion,
        isQuestion: false
      }
    default:
      return { valid: true, isQuestion: false }
  }
}

const getExplanation = (state: ConversationState): string => {
  switch (state) {
    case 'objective':
      return "Understanding your campaign objective helps me recommend the most effective games and KOLs that align with your goals."
    case 'audience':
      return "Knowing your target audience helps me suggest games and KOLs that resonate with your desired demographic."
    case 'region':
      return "Different regions have varying gaming preferences and KOL influence. This information helps me recommend the most relevant options for your target market."
    default:
      return ""
  }
}

interface ChatMessage {
  role: "assistant" | "user"
  content: string
}

interface ChatbotProps {
  onComplete: (info: {
    objective: string
    target: string
    region: string
  }) => void
}

export function Chatbot({ onComplete }: ChatbotProps) {
  const { campaignDetails, setCampaignDetails, isComplete, setIsComplete } = useMarketingCampaign()
  const [conversationState, setConversationState] = useState<ConversationState>('objective')
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! What's the main objective of your marketing campaign?"
    }
  ])
  const [input, setInput] = useState("")
  const [step, setStep] = useState(1)
  const [campaignInfo, setCampaignInfo] = useState({
    objective: "",
    target: "",
    region: ""
  })

  const chatContentRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement
    if (inputElement) {
      inputElement.focus()
    }
  }, [messages])

  const getPromptForState = (state: ConversationState): string => {
    switch (state) {
      case 'objective':
        return "Hi! What's the main objective of your marketing campaign? (e.g., brand awareness, increase sales, product launch)"
      case 'audience':
        return "Please describe your target audience with specific demographics (e.g., age group, gender, interests, occupation)"
      case 'region':
        return "Which specific countries or regions are you targeting? Please list them."
      default:
        return "How else can I help you with your campaign?"
    }
  }

  const getPromptWithIcon = (state: ConversationState): React.ReactElement => {
    const icons = {
      objective: <Target className="h-4 w-4" />,
      audience: <Users className="h-4 w-4" />,
      region: <Globe2 className="h-4 w-4" />,
    }

    return (
      <div className="flex items-center gap-2">
        {state !== 'complete' && icons[state]}
        <span>{getPromptForState(state)}</span>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      role: "user",
      content: input
    }

    let nextAssistantMessage: ChatMessage
    let shouldComplete = false

    // Update campaign info based on current step
    switch (step) {
      case 1:
        setCampaignInfo(prev => ({ ...prev, objective: input }))
        nextAssistantMessage = {
          role: "assistant",
          content: "Please describe your target audience with specific demographics (e.g., age group, gender, interests, occupation)"
        }
        setStep(2)
        break
      case 2:
        setCampaignInfo(prev => ({ ...prev, target: input }))
        nextAssistantMessage = {
          role: "assistant",
          content: "Which specific countries or regions are you targeting? Please list them."
        }
        setStep(3)
        break
      case 3:
        setCampaignInfo(prev => ({ ...prev, region: input }))
        nextAssistantMessage = {
          role: "assistant",
          content: "Great! I've analyzed your requirements and generated personalized recommendations. Check out the suggested games and KOLs on the left panel."
        }
        shouldComplete = true
        break
      default:
        nextAssistantMessage = {
          role: "assistant",
          content: "Is there anything else you'd like to know?"
        }
    }

    setMessages(prev => [...prev, userMessage, nextAssistantMessage])
    setInput("")

    if (shouldComplete) {
      const finalInfo = {
        ...campaignInfo,
        region: input
      }
      onComplete(finalInfo)
    }
  }

  // Add this function to generate the summary
  const generateCampaignSummary = (objective: string, audience: string, region: string) => {
    // Get game recommendations based on criteria
    const gameRec = objective.toLowerCase().includes('awareness') ? 
      "Adventure Quest & Rocket League (high visibility)" :
      objective.toLowerCase().includes('launch') ?
      "City Skylines & Among Us (virtual events)" :
      "Mix of social & competitive games"

    // Get audience-specific recommendations
    const audienceRec = audience.toLowerCase().includes('young') || audience.toLowerCase().includes('teen') ?
      "Rocket League & Among Us (social features)" :
      "City Skylines (professional integration)"

    // Get region-specific note
    const regionRec = region.toLowerCase().includes('asia') ?
      "Among Us (strong in South Korea, Indonesia)" :
      region.toLowerCase().includes('europe') ?
      "Adventure Quest & Rocket League (UK, Germany)" :
      "All games have presence in target regions"

    return ` Campaign Summary:
• Objective: ${objective}
• Audience: ${audience}
• Region: ${region}

🎮 Recommended Games:
• ${gameRec}
• ${audienceRec}
• ${regionRec}

✨ Check out the filtered recommendations on the left panel.`
  }

  // Add this function to generate recommendations
  const generateRecommendations = (objective: string, audience: string, region: string): string => {
    const objectiveLower = objective.toLowerCase()
    const audienceLower = audience.toLowerCase()
    const regionLower = region.toLowerCase()

    // Filter games based on objective
    let recommendedGames = games.filter(game => {
      if (objectiveLower.includes('awareness')) {
        return game.marketingCapabilities.includes('Brand Integration')
      }
      if (objectiveLower.includes('launch')) {
        return game.marketingCapabilities.includes('Custom Events')
      }
      if (objectiveLower.includes('sales')) {
        return game.marketingCapabilities.includes('Product Placement')
      }
      return true
    })

    // Further filter by audience
    recommendedGames = recommendedGames.filter(game => {
      const [minAge] = game.audience.ageRange.split('-').map(Number)
      if (audienceLower.includes('young') || audienceLower.includes('teen')) {
        return minAge <= 25
      }
      if (audienceLower.includes('professional') || audienceLower.includes('business')) {
        return minAge >= 25
      }
      return true
    })

    // Filter by region
    recommendedGames = recommendedGames.filter(game => {
      if (regionLower.includes('asia')) {
        return game.regions.includes('Asia')
      }
      if (regionLower.includes('europe')) {
        return game.regions.includes('Europe')
      }
      return true
    })

    // Generate strategy text based on filtered games
    const strategies = recommendedGames.map(game => {
      const relevantFeatures = game.marketingCapabilities
        .filter(cap => {
          if (objectiveLower.includes('awareness')) return cap.includes('Brand')
          if (objectiveLower.includes('launch')) return cap.includes('Events')
          return true
        })
        .join(', ')

      return `• ${game.name}: ${relevantFeatures}`
    })

    return `Recommendation Strategy:
${strategies.join('\n')}

Key Features:
• ${getAudienceSpecificFeatures(recommendedGames, audienceLower)}
• ${getRegionSpecificAdvantages(recommendedGames, regionLower)}
• ${getObjectiveSpecificStrategy(recommendedGames, objectiveLower)}`
  }

  // Helper functions for specific recommendations
  const getAudienceSpecificFeatures = (games: Game[], audience: string): string => {
    const features = games
      .flatMap(game => game.features)
      .filter(feature => {
        if (audience.includes('young')) return feature.includes('Social')
        if (audience.includes('professional')) return feature.includes('Professional')
        return true
      })
    return features.length > 0 
      ? `Featuring ${features.join(', ')} to engage ${audience} audience`
      : 'Customized features for target audience'
  }

  // Add these functions before the return statement
  const getRegionSpecificAdvantages = (games: Game[], region: string): string => {
    const regions = games
      .flatMap(game => game.regions)
      .filter(r => r.toLowerCase().includes(region.toLowerCase()))
    return regions.length > 0
      ? `Strong presence in ${regions.join(', ')} markets`
      : 'Global market presence'
  }

  const getObjectiveSpecificStrategy = (games: Game[], objective: string): string => {
    const capabilities = games
      .flatMap(game => game.marketingCapabilities)
      .filter(cap => cap.toLowerCase().includes(objective.toLowerCase()))
    return capabilities.length > 0
      ? capabilities.join(', ')
      : 'Flexible marketing options available'
  }

  return (
    <Card className="bg-white border-0 shadow-sm flex flex-col">
      <CardHeader className="border-b border-[#46DFB1]">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[#15919B]" />
          <CardTitle className="text-[#213A58] text-xl font-semibold">
            New Gen Pulse Campaign Assistant
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4" ref={chatContentRef}>
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`rounded-lg px-3 py-2 max-w-[80%] ${
                  message.role === "assistant"
                    ? "bg-[#46DFB1]/20 text-[#213A58] flex items-start gap-2"
                    : "bg-[#15919B] text-white"
                }`}
              >
                {message.role === "assistant" && (
                  <Sparkles className="h-4 w-4 mt-1 text-[#15919B]" />
                )}
                <div>{message.content}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} style={{ height: '1px' }} />
        </div>
      </CardContent>
      <div className="border-t border-[#46DFB1] p-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <Input
            className="flex-1 border-[#46DFB1] focus:ring-[#15919B]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <Button type="submit" size="icon" className="bg-[#15919B] hover:bg-[#0C6478] text-white">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
}