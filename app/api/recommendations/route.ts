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
    
    const recommendations = recommendationService.generateRecommendations(
      campaignInfo.objective,
      campaignInfo.target,
      regionArray,
      games,
      kols
    )

    console.log("API - Generated recommendations:", recommendations)
    return NextResponse.json(recommendations)

  } catch (error) {
    console.error('Recommendation API error:', error)
    return NextResponse.json({
      recommendedGames: [],
      recommendedKOLs: [],
      analysis: null
    })
  }
}