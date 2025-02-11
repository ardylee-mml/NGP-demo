import { NextResponse } from 'next/server'
import { games } from '@/lib/gameDatabase'
import { kols } from '@/lib/kolDatabase'
import { RecommendationService } from '@/lib/recommendationService'

export async function POST(request: Request) {
  try {
    const { campaignInfo } = await request.json()
    console.log("API - Received campaign info:", campaignInfo)
    
    const recommendationService = new RecommendationService()
    
    // Convert region string to array
    const regionArray = campaignInfo.region
      .toLowerCase()
      .split(/and|,/)
      .map((r: string) => r.trim())

    console.log("API - Processing with regions:", regionArray)
    
    const recommendations = await recommendationService.generateRecommendations(
      campaignInfo.objective,
      campaignInfo.target,
      regionArray,
      games,
      kols
    )

    return NextResponse.json(recommendations)

  } catch (error) {
    console.error('Recommendation API error:', error)
    // Return a basic response structure even on error
    return NextResponse.json({
      recommendedGames: games.slice(0, 3), // Return first 3 games as fallback
      recommendedKOLs: kols.slice(0, 3),   // Return first 3 KOLs as fallback
      analysis: {
        gameStrategy: "Focus on popular games with broad appeal",
        audienceMatch: "Target general gaming audience",
        regionalFocus: "Multi-region approach"
      }
    })
  }
}