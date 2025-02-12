"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  MessageSquare,
  Sparkles,
  Target,
  Users,
  Globe2,
} from "lucide-react";
import { useMarketingCampaign } from "@/contexts/MarketingCampaignContext";
import { games, Game } from "@/lib/gameDatabase";
import { kols } from "@/lib/kolDatabase";
import { DebugPanel } from "./DebugPanel";
import { LoadingSpinner } from "./ui/loading-spinner";
import GameRecommendations from "./GameRecommendations";
import KOLRecommendations from "./KOLRecommendations";
import { CampaignStrategy } from "./CampaignStrategy";
import { useRouter } from "next/navigation";

type ConversationState = "objective" | "audience" | "region" | "complete";

const validateAnswer = (
  type: ConversationState,
  answer: string
): { valid: boolean; isQuestion: boolean } => {
  const answer_lower = answer.toLowerCase();
  const isQuestion =
    answer_lower.includes("?") ||
    answer_lower.includes("why") ||
    answer_lower.includes("what") ||
    answer_lower.includes("how");

  if (isQuestion) {
    return { valid: false, isQuestion: true };
  }

  switch (type) {
    case "objective":
      return {
        valid:
          answer_lower.includes("awareness") ||
          answer_lower.includes("sales") ||
          answer_lower.includes("engagement") ||
          answer_lower.includes("brand") ||
          answer_lower.includes("promote") ||
          answer_lower.includes("launch") ||
          answer_lower.includes("market"),
        isQuestion: false,
      };
    case "audience":
      return {
        valid:
          answer_lower.includes("age") ||
          answer_lower.includes("year") ||
          answer_lower.includes("gender") ||
          answer_lower.includes("male") ||
          answer_lower.includes("female") ||
          answer_lower.includes("student") ||
          answer_lower.includes("professional") ||
          answer_lower.includes("gamer"),
        isQuestion: false,
      };
    case "region":
      return {
        valid:
          (answer_lower.includes("asia") ||
            answer_lower.includes("europe") ||
            answer_lower.includes("america") ||
            answer_lower.includes("africa") ||
            answer_lower.includes("country") ||
            /\b[a-z]{2,}\b/.test(answer_lower)) &&
          !isQuestion,
        isQuestion: false,
      };
    default:
      return { valid: true, isQuestion: false };
  }
};

const getExplanation = (state: ConversationState): string => {
  switch (state) {
    case "objective":
      return "Understanding your campaign objective helps me recommend the most effective games and KOLs that align with your goals.";
    case "audience":
      return "Knowing your target audience helps me suggest games and KOLs that resonate with your desired demographic.";
    case "region":
      return "Different regions have varying gaming preferences and KOL influence. This information helps me recommend the most relevant options for your target market.";
    default:
      return "";
  }
};

interface Message {
  role: "assistant" | "user" | "system";
  content: string;
}

interface CampaignInfo {
  objective: string | null;
  target: string | null;
  region: string | null;
}

export function Chatbot() {
  const { setCampaignDetails, setIsComplete } = useMarketingCampaign();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! What's the main objective of your marketing campaign? (e.g., brand awareness, product launch)",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [recommendations, setRecommendations] = useState<any>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when messages change
  useEffect(() => {
    const inputElement = document.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  }, [messages]);

  // Optimized message processing
  const processMessage = async (userMessage: string) => {
    // Check all messages including the new one
    const allMessages: Message[] = [
      ...messages,
      { role: "user" as const, content: userMessage },
    ];

    // Get the last assistant message to determine context
    const lastAssistantMessage = [...messages]
      .reverse()
      .find((m) => m.role === "assistant");

    // Determine what information we're collecting based on the last assistant message
    const isAskingObjective = lastAssistantMessage?.content
      .toLowerCase()
      .includes("objective");
    const isAskingAudience = lastAssistantMessage?.content
      .toLowerCase()
      .includes("target audience");
    const isAskingRegion = lastAssistantMessage?.content
      .toLowerCase()
      .includes("region");

    // Get next question based on what we have
    let nextQuestion = "";
    if (isAskingObjective) {
      nextQuestion =
        "Great! Now, who is your target audience for this campaign? Please describe their demographics (e.g., age, interests).";
    } else if (isAskingAudience) {
      nextQuestion =
        "Perfect! Finally, which regions or countries are you targeting with this campaign?";
    } else if (isAskingRegion) {
      nextQuestion =
        "Thanks! I'll now analyze this information to suggest the most suitable games and KOLs for your campaign.";
    }

    // Only mark as complete if we've collected all information
    const isComplete = isAskingRegion;

    // Get the response from Deepseek
    const response = await fetch("/api/deepseek", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `${userMessage}\n\nNext question: ${nextQuestion}`,
      }),
    });

    const data = await response.json();

    return {
      response: nextQuestion || data.response,
      isComplete,
      campaignDetails: isComplete
        ? {
            objective: extractObjective(allMessages),
            target: extractAudience(allMessages),
            region: extractRegion(allMessages),
          }
        : null,
    };
  };

  // Helper functions to extract information
  const extractObjective = (messages: Message[]) => {
    // Find the user's response after the objective question
    let foundObjective = false;
    for (const msg of messages) {
      if (
        msg.role === "assistant" &&
        msg.content.toLowerCase().includes("objective")
      ) {
        foundObjective = true;
        continue;
      }
      if (foundObjective && msg.role === "user") {
        return msg.content;
      }
    }
    return "";
  };

  const extractAudience = (messages: Message[]) => {
    // Find the user's response after the audience question
    let foundAudience = false;
    for (const msg of messages) {
      if (
        msg.role === "assistant" &&
        msg.content.toLowerCase().includes("target audience")
      ) {
        foundAudience = true;
        continue;
      }
      if (foundAudience && msg.role === "user") {
        return msg.content;
      }
    }
    return "";
  };

  const extractRegion = (messages: Message[]) => {
    // Find the user's response after the region question
    let foundRegion = false;
    for (const msg of messages) {
      if (
        msg.role === "assistant" &&
        msg.content.toLowerCase().includes("region")
      ) {
        foundRegion = true;
        continue;
      }
      if (foundRegion && msg.role === "user") {
        return msg.content;
      }
    }
    return "";
  };

  // Add this function to preserve chat history
  const preserveChatHistory = (messages: Message[]): Message[] => {
    return messages.filter(
      (msg) =>
        msg.role === "user" ||
        (msg.role === "assistant" &&
          !msg.content.includes("Great! I have all the information needed"))
    );
  };

  // Modify handleSubmit to preserve chat history
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    try {
      const messageInfo = await processMessage(userMessage);

      const updatedMessages: Message[] = [
        ...messages,
        { role: "user" as const, content: userMessage },
        { role: "assistant" as const, content: messageInfo.response },
      ];

      setMessages(updatedMessages);

      if (messageInfo.isComplete && messageInfo.campaignDetails) {
        console.log(
          "Campaign details before recommendations:",
          messageInfo.campaignDetails
        );

        // Get recommendations
        const response = await fetch("/api/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            objective: messageInfo.campaignDetails.objective,
            target: messageInfo.campaignDetails.target,
            region: messageInfo.campaignDetails.region,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get recommendations");
        }

        const recommendations = await response.json();
        console.log("Received recommendations:", recommendations);

        // Set recommendations in local state
        setRecommendations(recommendations);

        // Update global state
        setCampaignDetails({
          ...messageInfo.campaignDetails,
          recommendations: recommendations,
        });
        setIsComplete(true);

        // Navigate to campaign plan page
        router.push("/campaign-plan");
      }
    } catch (error) {
      console.error("Chatbot error:", error);
    }
    setIsLoading(false);
  };

  // Add useEffect to load chat history when coming back
  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      setMessages(JSON.parse(savedHistory) as Message[]);
      localStorage.removeItem("chatHistory");
    }
  }, []);

  const chatContentRef = useRef<HTMLDivElement>(null);

  const [debugInfo, setDebugInfo] = useState<any>(null);

  const getPromptForState = (state: ConversationState): string => {
    switch (state) {
      case "objective":
        return "Hi! What's the main objective of your marketing campaign? (e.g., brand awareness, increase sales, product launch)";
      case "audience":
        return "Please describe your target audience with specific demographics (e.g., age group, gender, interests, occupation)";
      case "region":
        return "Which specific countries or regions are you targeting? Please list them.";
      default:
        return "How else can I help you with your campaign?";
    }
  };

  const getPromptWithIcon = (state: ConversationState): React.ReactElement => {
    const icons = {
      objective: <Target className="h-4 w-4" />,
      audience: <Users className="h-4 w-4" />,
      region: <Globe2 className="h-4 w-4" />,
    };

    return (
      <div className="flex items-center gap-2">
        {state !== "complete" && icons[state]}
        <span>{getPromptForState(state)}</span>
      </div>
    );
  };

  // Function to check if all required info is collected
  const isInfoComplete = (info: CampaignInfo): boolean => {
    return Boolean(info.objective && info.target && info.region);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {/* Chat Section */}
      <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "assistant"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-blue-500 text-white"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-gray-100">
                <LoadingSpinner />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-2 border rounded"
          />
        </form>
      </div>

      {/* Recommendations Section */}
      <div className="h-full overflow-y-auto">
        {recommendations && (
          <div className="space-y-4 p-4">
            <CampaignStrategy campaignInfo={{ recommendations }} />
            {recommendations.recommendedGames?.length > 0 && (
              <GameRecommendations campaignInfo={{ recommendations }} />
            )}
            {recommendations.recommendedKOLs?.length > 0 && (
              <KOLRecommendations campaignInfo={{ recommendations }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
