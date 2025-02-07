import { OpenAI } from 'openai'
import { interviewKnowledge, InterviewPattern } from './interviewKnowledge'

export class LearningService {
  private patterns: Map<string, InterviewPattern[]> = new Map()
  private collectedInfo = {
    objective: false,
    audience: false,
    region: false
  }
  
  constructor() {
    // Initialize with base knowledge
    Object.entries(interviewKnowledge).forEach(([category, patterns]) => {
      this.patterns.set(category, Object.values(patterns))
    })
  }

  async analyzeResponse(message: string, context: string) {
    try {
      const analysis = await this.classifyIntent(message)
      
      // Update collected info based on the analysis
      if (analysis.category === 'objective') {
        this.collectedInfo.objective = true
      } else if (analysis.category === 'audience') {
        this.collectedInfo.audience = true
      } else if (analysis.category === 'region') {
        this.collectedInfo.region = true
      }
      
      this.updatePatterns(message, analysis, context)
      return analysis
    } catch (error) {
      console.error('Error in learning service:', error)
      return null
    }
  }

  private async classifyIntent(message: string) {
    const messageLower = message.toLowerCase()
    
    // Analyze objective
    if (messageLower.includes('launch') || messageLower.includes('new')) {
      this.collectedInfo.objective = true
      return {
        category: 'objective',
        confidence: 0.9,
        terms: ['launch', 'new', 'product'],
        followUp: [
          "Great! A product launch campaign. Could you tell me about your target audience?",
          "What age group are you primarily targeting with this product?",
          "Which regions would you like to focus on for this launch?"
        ]
      }
    }
    
    // Analyze audience
    if (messageLower.includes('age') || messageLower.includes('male') || messageLower.includes('female')) {
      return {
        category: 'audience',
        confidence: 0.9,
        terms: ['age', 'demographic', 'target'],
        followUp: [
          "Perfect! Now, which regions or countries would you like to target with this campaign?",
          "Are there specific markets you want to prioritize?",
          "Would you like to focus on any particular gaming platforms in these regions?"
        ]
      }
    }
    
    // Analyze region
    if (messageLower.includes('region') || messageLower.includes('country') || messageLower.includes('market')) {
      return {
        category: 'region',
        confidence: 0.9,
        terms: ['region', 'market', 'country'],
        followUp: [
          "Excellent! I'll analyze this information to provide tailored recommendations for your campaign.",
          "Let me prepare some specific game and KOL suggestions for these markets.",
          "Would you like to see the campaign recommendations now?"
        ]
      }
    }

    // If no specific category is detected, check what information we still need
    const followUpQuestions = []
    
    if (!this.collectedInfo.objective) {
      followUpQuestions.push(
        "Could you tell me more about your campaign objective?",
        "Are you focusing on product launch, brand awareness, or something else?"
      )
    }
    if (!this.collectedInfo.audience) {
      followUpQuestions.push(
        "What's your target audience for this campaign?",
        "Which age group or demographic are you primarily targeting?"
      )
    }
    if (!this.collectedInfo.region && this.collectedInfo.audience) {
      followUpQuestions.push(
        "Which regions or countries would you like to target?",
        "Are there specific markets you want to prioritize?"
      )
    }

    // If all information is present, move to recommendations
    if (this.collectedInfo.objective && this.collectedInfo.audience && this.collectedInfo.region) {
      followUpQuestions.push(
        "Great! I have all the key information. Would you like to see the campaign recommendations now?"
      )
    }
    
    // If somehow no questions were generated, focus on the next missing piece of information
    if (followUpQuestions.length === 0) {
      if (!this.collectedInfo.audience) {
        followUpQuestions.push("Could you provide more details about your target audience?")
      } else if (!this.collectedInfo.region) {
        followUpQuestions.push("Which regions would you like to target with this campaign?")
      } else {
        followUpQuestions.push("Could you tell me more about your campaign goals?")
      }
    }

    return {
      category: 'general',
      confidence: 0.5,
      terms: [],
      followUp: followUpQuestions
    }
  }

  private updatePatterns(message: string, analysis: any, context: string) {
    // Update existing patterns or add new ones based on successful interactions
    const currentPatterns = this.patterns.get(analysis.category) || []
    
    // Look for similar patterns
    const similarPattern = currentPatterns.find(p => 
      p.trigger.some(t => message.toLowerCase().includes(t))
    )

    if (similarPattern) {
      // Update existing pattern
      similarPattern.examples.push(context)
    } else {
      // Create new pattern
      currentPatterns.push({
        trigger: this.extractKeyTerms(message),
        context: context,
        followUp: analysis.followUp,
        importance: "Learned from user interaction",
        examples: [context]
      })
    }
  }

  private extractKeyTerms(message: string): string[] {
    // Extract potential trigger words from the message
    return message.toLowerCase()
      .split(' ')
      .filter(word => word.length > 3)
  }

  private generateFollowUp(analysis: any): string {
    if (analysis.followUp && analysis.followUp.length > 0) {
      return analysis.followUp[0]
    }
    return "Could you tell me more about your campaign goals?"
  }

  public learnFromInteraction(messages: string[]): void {
    const context = messages.join('\n')
    // Store new patterns and responses for future use
    const newPattern = {
      messages,
      context,
      timestamp: new Date(),
      successful: true
    }
    console.log('Learning from interaction:', newPattern)
  }
} 