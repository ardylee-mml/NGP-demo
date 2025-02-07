export const campaignPatterns = {
  objectives: {
    launch: {
      patterns: ['launch', 'release', 'introduce', 'new product', 'bringing out'],
      response: "A product launch campaign! We can create impactful virtual events and in-game promotions to generate excitement. What's your target audience for this launch?"
    },
    awareness: {
      patterns: ['awareness', 'recognition', 'visibility', 'exposure', 'known'],
      response: "Brand awareness is key! We can leverage game integrations and KOL partnerships to increase visibility. Who's your target audience?"
    },
    sales: {
      patterns: ['sales', 'revenue', 'conversion', 'sell', 'purchase'],
      response: "A sales-focused campaign! We can create engaging in-game promotions and KOL collaborations. Tell me about your target customers."
    },
    engagement: {
      patterns: ['engagement', 'interaction', 'community', 'participate'],
      response: "Community engagement is great! We can create interactive events and social features. Who would you like to engage with?"
    }
  },
  
  audiences: {
    youth: {
      patterns: ['young', 'teen', 'student', 'generation z', 'kids'],
      demographics: '13-24',
      interests: ['social media', 'trends', 'entertainment']
    },
    youngAdults: {
      patterns: ['young adult', 'college', 'university', 'millennial'],
      demographics: '18-34',
      interests: ['lifestyle', 'social', 'technology']
    },
    professionals: {
      patterns: ['professional', 'working', 'business', 'career'],
      demographics: '25-45',
      interests: ['business', 'technology', 'productivity']
    }
  },

  regions: {
    asia: {
      patterns: ['asia', 'china', 'japan', 'korea', 'southeast'],
      markets: ['mobile gaming', 'social platforms']
    },
    europe: {
      patterns: ['europe', 'eu', 'uk', 'germany', 'france'],
      markets: ['pc gaming', 'console']
    },
    americas: {
      patterns: ['america', 'us', 'canada', 'brazil'],
      markets: ['mixed platforms', 'streaming']
    }
  }
}

export function matchPattern(input: string, patterns: string[]): boolean {
  return patterns.some(pattern => input.toLowerCase().includes(pattern))
}

export function analyzeIntent(message: string) {
  const messageLower = message.toLowerCase()
  
  // Check each category
  for (const [category, patterns] of Object.entries(campaignPatterns)) {
    for (const [type, data] of Object.entries(patterns)) {
      if (matchPattern(messageLower, data.patterns)) {
        return {
          category,
          type,
          data
        }
      }
    }
  }
  
  return null
} 