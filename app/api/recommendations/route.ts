import { NextResponse } from 'next/server'
import { RecommendationService } from '@/lib/recommendationService'
import { games } from '@/lib/gameDatabase'
import { kols } from '@/lib/kolDatabase'

export async function POST(req: Request) {
  const { campaignInfo } = await req.json()
  const recommendationService = new RecommendationService()
  
  // Log incoming request
  console.log('Processing campaign request:', campaignInfo)

  const recommendations = recommendationService.generateRecommendations(
    campaignInfo.objective,
    campaignInfo.target,
    campaignInfo.region.split(' and '),
    games,
    kols
  )

  console.log('Generated recommendations:', recommendations)
  console.log('Analysis:', recommendations.analysis)

  return NextResponse.json({ 
    recommendations: {
      strategy: recommendations.marketingStrategies.join('\n'),
      games: recommendations.recommendedGames,
      kols: recommendations.recommendedKOLs,
      analysis: recommendations.analysis // Make sure this exists
    }
  })
}