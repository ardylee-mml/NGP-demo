"use client";

import { Chatbot } from "@/components/Chatbot";
import { useRouter } from "next/navigation";
import { useMarketingCampaign } from "@/contexts/MarketingCampaignContext";

export default function Chat() {
  const router = useRouter();
  const { setCampaignDetails } = useMarketingCampaign();

  const handleComplete = async (info: any) => {
    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ campaignInfo: info }),
      });

      const data = await response.json();
      console.log("Recommendations received:", data);

      setCampaignDetails({
        objective: info.objective,
        target: info.target,
        region: info.region,
        recommendations: data.recommendations,
      });

      router.push("/campaign-plan");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Chatbot onComplete={handleComplete} />
    </div>
  );
}
