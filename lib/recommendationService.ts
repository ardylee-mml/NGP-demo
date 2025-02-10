import { Game, games } from './gameDatabase'
import { KOL, kols } from './kolDatabase'

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

  generateRecommendations(objective: string, target: string, region: string[], games: Game[], kols: KOL[]) {
    console.log("Generating recommendations for:", { objective, target, region });

    // Filter games based on campaign criteria
    const recommendedGames = games.filter(game => {
      const matchesObjective = game.marketingCapabilities.some(cap =>
        cap.toLowerCase().includes('launch') || 
        cap.toLowerCase().includes('brand') ||
        cap.toLowerCase().includes('product')
      );
      
      const matchesAudience = game.audience.interests.some(interest =>
        target.toLowerCase().includes(interest.toLowerCase()) ||
        interest.toLowerCase().includes('social') ||
        interest.toLowerCase().includes('lifestyle')
      );
      
      const matchesRegion = game.regions.some(r =>
        region.some(reg => {
          const regionLower = reg.toLowerCase();
          return regionLower.includes(r.toLowerCase()) ||
                 (regionLower.includes('usa') && r.includes('North America'));
        })
      );
      
      const isRecommended = matchesObjective || (matchesAudience && matchesRegion);
      console.log(`Game ${game.name} matches:`, { matchesObjective, matchesAudience, matchesRegion });
      return isRecommended;
    });

    // Filter KOLs based on campaign criteria
    const recommendedKOLs = kols.filter(kol => {
      const matchesAudience = kol.audience.some(aud => {
        const targetLower = target.toLowerCase();
        const audLower = aud.toLowerCase();
        return targetLower.includes(audLower) ||
               audLower.includes('fashion') ||
               audLower.includes('sports') ||
               audLower.includes(targetLower);
      });
      
      const matchesRegion = kol.regions.some(r =>
        region.some(reg => {
          const regionLower = reg.toLowerCase();
          return regionLower.includes(r.toLowerCase()) ||
                 (regionLower.includes('usa') && r.includes('North America'));
        })
      );
      
      // Relaxed game matching
      const playsRelevantGames = kol.games.some(game => 
        game.toLowerCase().includes('roblox')
      );
      
      const isRecommended = (matchesAudience || matchesRegion) && playsRelevantGames;
      console.log(`KOL ${kol.name} matches:`, { matchesAudience, matchesRegion, playsRelevantGames });
      return isRecommended;
    });

    console.log("Final recommendations:", { recommendedGames, recommendedKOLs });

    return {
      recommendedGames,
      recommendedKOLs,
      analysis: {
        gameStrategy: "Focus on games with high social interaction and fashion/lifestyle elements",
        audienceMatch: "Target fashion-conscious gamers and social media enthusiasts",
        regionalFocus: region.some(r => r.toLowerCase().includes('asia')) 
          ? "Emphasize mobile and social platforms with fashion integration"
          : "Focus on cross-platform presence with lifestyle elements"
      }
    };
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