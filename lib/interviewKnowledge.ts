export interface InterviewPattern {
  trigger: string[]
  context: string
  followUp: string[]
  importance: string
  examples: string[]
  learningPoints?: {
    success: string[]
    failure: string[]
  }
}

export const interviewKnowledge = {
  objectives: {
    product_launch: {
      trigger: ['launch', 'new product', 'releasing', 'introducing', 'new line', 'debut'],
      context: "Product launches in gaming platforms can create interactive experiences around the product reveal",
      followUp: [
        "What unique features of your product would you like to highlight in the gaming environment?",
        "Are you planning a global launch or regional rollout?",
        "Would you prefer in-game events or influencer collaborations for the launch?",
        "What's your timeline for this product launch?"
      ],
      importance: "Launch timing and method can significantly impact product adoption",
      examples: [
        "LEGO's limited edition sets revealed through Roblox events",
        "Nike's virtual sneaker previews in gaming worlds",
        "Coca-Cola's new flavor launches with gaming tournaments"
      ],
      learningPoints: {
        success: [
          "User mentioned specific product features",
          "Clear launch timeline provided",
          "Target market explicitly stated"
        ],
        failure: [
          "Vague product description",
          "Unclear launch scope",
          "Missing target demographic"
        ]
      }
    },
    brand_awareness: {
      trigger: ['awareness', 'recognition', 'visibility', 'known', 'branding', 'presence'],
      context: "Gaming platforms offer unique ways to build brand recognition through immersive experiences",
      followUp: [
        "What aspects of your brand identity should we emphasize?",
        "Are you looking to build long-term engagement or short-term visibility?",
        "Do you have any existing gaming partnerships we should consider?",
        "What's your current brand perception in the gaming community?"
      ],
      importance: "Brand perception in gaming communities requires authentic engagement",
      examples: [
        "BMW's virtual showrooms in racing games",
        "McDonald's themed islands in popular games",
        "Samsung's tech integration in esports events"
      ],
      learningPoints: {
        success: [
          "Clear brand values identified",
          "Specific awareness goals stated",
          "Target audience engagement preferences noted"
        ],
        failure: [
          "Inconsistent brand messaging",
          "No clear metrics for success",
          "Misaligned gaming platform choice"
        ]
      }
    }
  },
  
  audiences: {
    youth_gamers: {
      trigger: ['young', 'teen', 'student', 'kids', 'youth', 'school'],
      context: "Young gamers are highly engaged and influential in gaming communities",
      followUp: [
        "What specific age range are you targeting within the youth segment?",
        "Which gaming platforms do they prefer?",
        "Are there any educational aspects we should consider?",
        "What gaming genres are most popular with your target age group?"
      ],
      importance: "Youth audiences require authentic and engaging content",
      examples: [
        "Educational content through gaming",
        "Social features for peer interaction",
        "Achievement-based engagement systems"
      ],
      learningPoints: {
        success: [
          "Age range clearly specified",
          "Platform preferences identified",
          "Content restrictions noted"
        ],
        failure: [
          "Too broad age targeting",
          "Inappropriate platform choice",
          "Missing parental considerations"
        ]
      }
    },
    tech_enthusiasts: {
      trigger: ['tech', 'digital', 'professional', 'early adopter', 'innovation'],
      context: "Tech-savvy audiences appreciate innovation and cutting-edge features",
      followUp: [
        "What technological aspects of your product appeal most to this audience?",
        "Are there specific gaming platforms where tech enthusiasts gather?",
        "How do you plan to showcase technical innovation in your campaign?",
        "Which tech influencers align with your brand?"
      ],
      importance: "Technical audiences value authenticity and innovation",
      examples: [
        "AR/VR integration campaigns",
        "Tech product launches in games",
        "Cross-platform experiences"
      ],
      learningPoints: {
        success: [
          "Technical preferences identified",
          "Innovation aspects highlighted",
          "Platform compatibility noted"
        ],
        failure: [
          "Oversimplified technical aspects",
          "Missing innovation angle",
          "Poor platform selection"
        ]
      }
    }
  },

  regions: {
    global: {
      trigger: ['worldwide', 'global', 'international', 'multiple regions'],
      context: "Global campaigns require careful consideration of regional preferences",
      followUp: [
        "Which regions are your primary focus?",
        "Are there specific cultural considerations we should be aware of?",
        "Do you need different approaches for different regions?",
        "What languages should we support?"
      ],
      importance: "Regional customization can significantly impact campaign success",
      examples: [
        "Region-specific in-game events",
        "Localized influencer partnerships",
        "Cultural adaptation of content"
      ],
      learningPoints: {
        success: [
          "Clear regional priorities",
          "Cultural considerations noted",
          "Language requirements specified"
        ],
        failure: [
          "One-size-fits-all approach",
          "Cultural insensitivity",
          "Unclear regional focus"
        ]
      }
    }
  }
}

export interface LearningRecord {
  timestamp: Date
  pattern: string
  context: string
  success: boolean
  learningPoints: string[]
  improvements: string[]
}

export function learnFromInteraction(message: string, context: string, success: boolean): LearningRecord {
  return {
    timestamp: new Date(),
    pattern: message,
    context: context,
    success: success,
    learningPoints: success ? 
      ["Successfully identified campaign needs", "Clear user intent"] :
      ["Unclear user intent", "Missing key information"],
    improvements: ["Add new trigger words", "Expand follow-up questions"]
  }
} 