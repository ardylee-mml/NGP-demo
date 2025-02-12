import { NextResponse } from 'next/server'
import { RecommendationService } from '@/lib/recommendationService'

export async function POST(request: Request) {
  try {
    const campaignInfo = await request.json()
    console.log("API - Received campaign info:", campaignInfo)

    const recommendationService = new RecommendationService()
    
    // Convert region string to array
    const regions = campaignInfo.region
      .split(/\s*(?:and|,)\s*/)
      .map((r: string) => r.toLowerCase().trim())

    console.log("API - Processing with regions:", regions)

    const recommendations = await recommendationService.generateBasicRecommendations(
      campaignInfo.objective,
      campaignInfo.target,
      regions,
      recommendationService.getGames(),
      recommendationService.getKOLs()
    )

    return NextResponse.json(recommendations)
  } catch (error) {
    console.error('Recommendation API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    )
  }
}