import { Game } from './gameDatabase'
import { KOL } from './kolDatabase'

interface MarketStrategy {
  usa: {
    platforms: string[]
    marketingStyle: string[]
    contentType: string[]
  }
  asia: {
    platforms: string[]
    marketingStyle: string[]
    contentType: string[]
  }
}

const marketStrategies: MarketStrategy = {
  usa: {
    platforms: ['PC', 'Console', 'Mobile'],
    marketingStyle: ['Direct promotions', 'Influencer collaborations', 'Esports events'],
    contentType: ['High-production streams', 'Competitive events', 'Interactive experiences']
  },
  asia: {
    platforms: ['Mobile', 'PC Cafe', 'Social gaming'],
    marketingStyle: ['KOL partnerships', 'Social media integration', 'Live events'],
    contentType: ['Short-form content', 'Social features', 'Community events']
  }
}

export class RecommendationService {
  analyzeMarketFit(regions: string[], games: Game[]): Game[] {
    const isUSA = regions.some(r => r.toLowerCase().includes('usa'))
    const isAsia = regions.some(r => r.toLowerCase().includes('asia'))
    
    return games.filter(game => {
      if (isUSA && !game.regions.includes('North America')) return false
      if (isAsia && !game.regions.includes('Asia')) return false
      return true
    })
  }

  matchAudiencePreference(audience: string, games: Game[]): Game[] {
    const ageParts = audience.match(/age.*?(\d+)[-\s]+(\d+)/)
    if (!ageParts) return games

    const minAge = parseInt(ageParts[1])
    const maxAge = parseInt(ageParts[2])

    return games.filter(game => {
      const [gameMinAge, gameMaxAge] = game.audience.ageRange.split('-').map(Number)
      return gameMinAge <= maxAge && gameMaxAge >= minAge
    })
  }

  findRelevantKOLs(games: Game[], audience: string, regions: string[]): KOL[] {
    return kols.filter(kol => {
      const playsRelevantGames = games.some(game => 
        kol.games.includes(game.name)
      )
      const hasRegionalPresence = regions.some(region => 
        kol.regions.some(kolRegion => 
          kolRegion.toLowerCase().includes(region.toLowerCase())
        )
      )
      const audienceMatch = kol.audience.some(kolAudience =>
        audience.toLowerCase().includes(kolAudience.toLowerCase())
      )
      return playsRelevantGames && hasRegionalPresence && audienceMatch
    })
  }

  generateRecommendations(objective: string, audience: string, regions: string[], games: Game[], kols: KOL[]) {
    // Debug logging
    console.log('Generating recommendations for:', {
      objective,
      audience,
      regions,
      availableGames: games.length,
      availableKOLs: kols.length
    })

    const targetRegions = regions.map(r => r.toLowerCase())
    const hasUSA = targetRegions.some(r => r.includes('usa') || r.includes('us'))
    const hasAsia = targetRegions.some(r => r.includes('asia'))

    // Market strategy based on regions combination
    const marketStrategy = {
      reasoning: [],
      strategies: []
    }

    if (hasUSA && hasAsia) {
      marketStrategy.reasoning.push(
        'Campaign targets both US and Asian markets',
        'Need balanced approach between Western and Eastern gaming preferences',
        'Consider platform differences between regions'
      )
      marketStrategy.strategies = [
        'Cross-platform campaign utilizing both PC/Console and Mobile',
        'Region-specific content and KOL partnerships',
        'Balanced marketing mix for different gaming cultures'
      ]
    } else if (hasUSA) {
      marketStrategy.reasoning.push(
        'Focus on US market preferences',
        'Strong PC and Console gaming presence'
      )
      marketStrategy.strategies = marketStrategies.usa.marketingStyle
    } else if (hasAsia) {
      marketStrategy.reasoning.push(
        'Focus on Asian market preferences',
        'Mobile gaming dominance'
      )
      marketStrategy.strategies = marketStrategies.asia.marketingStyle
    }

    // Game selection with detailed reasoning
    const matchedGames = this.matchAudiencePreference(audience, 
      this.analyzeMarketFit(targetRegions, games)
    )
    console.log('Matched Games Analysis:', {
      totalMatched: matchedGames.length,
      matchedGames: matchedGames.map(g => g.name),
      regionFilters: { hasUSA, hasAsia }
    })

    const gameSelection = {
      reasoning: [
        `Found ${matchedGames.length} games matching regional requirements`,
        `Games suitable for audience: ${audience}`,
        `Supporting campaign objective: ${objective}`
      ],
      selectedGames: matchedGames,
      matchCriteria: matchedGames.map(game => ({
        game: game.name,
        reasons: [
          hasUSA && game.regions.includes('North America') ? 'US market presence' : '',
          hasAsia && game.regions.includes('Asia') ? 'Asian market presence' : '',
          `Suitable for ${audience}`,
          `Supports ${objective} campaigns`
        ].filter(Boolean)
      }))
    }

    // KOL selection with reasoning
    const relevantKOLs = this.findRelevantKOLs(matchedGames, audience, targetRegions)
    console.log('KOL Selection Analysis:', {
      totalMatched: relevantKOLs.length,
      matchedKOLs: relevantKOLs.map(k => k.name)
    })

    const analysis = {
      marketStrategy,
      gameSelection,
      kolSelection: {
        reasoning: [
          `Selected ${relevantKOLs.length} KOLs matching campaign criteria`,
          `KOLs with presence in target regions: ${regions.join(', ')}`,
          `Influencers matching audience: ${audience}`
        ],
        selectedKOLs: relevantKOLs,
        matchCriteria: relevantKOLs.map(kol => ({
          kol: kol.name,
          reasons: [
            `Audience match: ${kol.audience.join(', ')}`,
            `Regional presence: ${kol.regions.join(', ')}`,
            `Relevant games: ${kol.games.join(', ')}`
          ]
        }))
      }
    }

    // Log final analysis
    console.log('Final Recommendation Analysis:', analysis)

    return {
      recommendedGames: matchedGames.slice(0, 3),
      recommendedKOLs: relevantKOLs.slice(0, 3),
      marketingStrategies: analysis.marketStrategy.strategies,
      platformFocus: this.getPlatformRecommendations(targetRegions),
      contentStrategy: this.getContentStrategy(targetRegions, objective),
      analysis
    }
  }

  private getPlatformRecommendations(regions: string[]): string[] {
    const hasUSA = regions.includes('usa')
    const hasAsia = regions.includes('asia')
    
    if (hasUSA && hasAsia) {
      return [...new Set([...marketStrategies.usa.platforms, ...marketStrategies.asia.platforms])]
    } else if (hasUSA) {
      return marketStrategies.usa.platforms
    } else if (hasAsia) {
      return marketStrategies.asia.platforms
    }
    return []
  }

  private getContentStrategy(regions: string[], objective: string): string[] {
    const hasUSA = regions.includes('usa')
    const hasAsia = regions.includes('asia')
    const strategies = []

    if (hasUSA && hasAsia) {
      strategies.push(
        'Cross-regional content strategy',
        'Localized campaigns for each market',
        'Multi-platform approach'
      )
    } else if (hasUSA) {
      strategies.push(...marketStrategies.usa.contentType)
    } else if (hasAsia) {
      strategies.push(...marketStrategies.asia.contentType)
    }

    // Add objective-specific strategies
    if (objective.toLowerCase().includes('launch')) {
      strategies.push(
        'Product showcase events',
        'Interactive demonstrations',
        'Launch celebrations'
      )
    }

    return strategies
  }
} 