import { Game, games } from './gameDatabase'
import { KOL, kols } from './kolDatabase'
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1',
});

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

  // Add a helper method to clean region strings
  private cleanRegionString(region: string): string {
    return region
      .toLowerCase()
      .replace(/in the /g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  findRelevantKOLs(games: Game[], target: string, regions: string[]): KOL[] {
    const cleanedRegions = regions.map(r => this.cleanRegionString(r));
    
    // Extract interests and keywords from target string
    const keywords = target.toLowerCase().split(/[,\s]+/).filter(word => 
      word.length > 3 && 
      !['who', 'like', 'and', 'from', 'age'].includes(word)
    );

    return kols.filter(kol => {
      // More flexible region matching
      const matchesRegion = cleanedRegions.some(region => 
        kol.regions.some(kolRegion => 
          this.cleanRegionString(kolRegion).includes(region) ||
          (region === 'usa' && kolRegion.includes('North America'))
        )
      );

      // More flexible audience matching
      const matchesAudience = kol.audience.some(audienceType => 
        keywords.some(keyword => 
          audienceType.toLowerCase().includes(keyword) ||
          keyword.includes(audienceType.toLowerCase())
        )
      ) || kol.categories.some(category =>
        keywords.some(keyword =>
          category.toLowerCase().includes(keyword) ||
          keyword.includes(category.toLowerCase())
        )
      );

      // Log matching criteria for debugging
      console.log(`KOL ${kol.name} matches:`, {
        matchesAudience,
        matchesRegion,
        regions: cleanedRegions,
        kolRegions: kol.regions,
        keywords,
        kolAudience: kol.audience,
        kolCategories: kol.categories
      });

      // More flexible matching criteria
      return matchesRegion || matchesAudience;
    });
  }

  async generateRecommendations(objective: string, target: string, region: string[], games: Game[], kols: KOL[]) {
    try {
      // Call DeepSeek API
      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          objective,
          target,
          region: region.join(', '),
          games: games.map(g => ({
            id: g.id,
            name: g.name,
            audience: g.audience,
            regions: g.regions,
            marketingCapabilities: g.marketingCapabilities
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI recommendations');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Parse the AI response
      let aiRecommendations;
      try {
        aiRecommendations = typeof data.response === 'string' 
          ? JSON.parse(data.response)
          : data.response;
      } catch (parseError) {
        console.error('Failed to parse AI response:', parseError);
        throw parseError;
      }

      // Filter games based on AI recommendations
      const recommendedGames = games.filter(game => 
        aiRecommendations.recommendedGames.includes(game.id)
      );

      // Get KOL recommendations
      const recommendedKOLs = this.findRelevantKOLs(recommendedGames, target, region);

      return {
        recommendedGames,
        recommendedKOLs,
        analysis: {
          gameStrategy: aiRecommendations.gameStrategy,
          audienceMatch: aiRecommendations.audienceMatch,
          regionalFocus: aiRecommendations.regionalFocus
        }
      };

    } catch (error) {
      console.error('Error getting AI recommendations:', error);
      // Fallback to basic recommendations if AI fails
      return this.generateBasicRecommendations(objective, target, region, games, kols);
    }
  }

  // Update generateBasicRecommendations to use the cleaned regions
  private generateBasicRecommendations(objective: string, target: string, region: string[], games: Game[], kols: KOL[]) {
    const cleanedRegions = region.map(r => this.cleanRegionString(r));
    
    const recommendedGames = games.filter(game => {
      // More flexible objective matching
      const matchesObjective = game.marketingCapabilities.some(cap =>
        objective.toLowerCase().includes(cap.toLowerCase()) ||
        cap.toLowerCase().includes('brand') ||
        cap.toLowerCase().includes('product')
      );
      
      // More flexible audience matching
      const matchesAudience = game.audience.interests.some(interest =>
        target.toLowerCase().includes(interest.toLowerCase()) ||
        interest.toLowerCase().includes('gaming') ||
        interest.toLowerCase().includes(target.toLowerCase())
      );
      
      // More flexible region matching
      const matchesRegion = game.regions.some(r =>
        cleanedRegions.some(reg => 
          this.cleanRegionString(r).includes(reg) ||
          (reg === 'usa' && r.includes('North America'))
        )
      );
      
      // Return true if matches either objective + (audience or region)
      return matchesObjective && (matchesAudience || matchesRegion);
    });

    // Ensure we have at least 3 game recommendations
    const finalGames = recommendedGames.length >= 3 ? recommendedGames : games.slice(0, 3);

    // Get KOL recommendations with more flexible matching
    const recommendedKOLs = this.findRelevantKOLs(finalGames, target, cleanedRegions);
    const finalKOLs = recommendedKOLs.length >= 3 ? recommendedKOLs : kols.slice(0, 3);

    return {
      recommendedGames: finalGames,
      recommendedKOLs: finalKOLs,
      analysis: {
        gameStrategy: "Focus on games with high social interaction and fashion/lifestyle elements",
        audienceMatch: "Target fashion-conscious gamers and social media enthusiasts",
        regionalFocus: cleanedRegions.includes('asia')
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