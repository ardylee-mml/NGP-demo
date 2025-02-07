"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bug } from "lucide-react";

interface DebugInfo {
  campaignInfo: {
    objective: string;
    target: string;
    region: string;
  };
  analysis: {
    marketStrategy: {
      reasoning: string[];
      strategies: string[];
    };
    gameSelection: {
      reasoning: string[];
      matchCriteria: {
        game: string;
        reasons: string[];
      }[];
    };
    kolSelection: {
      reasoning: string[];
      matchCriteria: {
        kol: string;
        reasons: string[];
      }[];
    };
  };
}

export function DebugPanel({ info }: { info: DebugInfo }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 z-50 bg-white shadow-lg hover:bg-gray-100"
        >
          <Bug className="h-4 w-4 text-gray-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Campaign Analysis Debug</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-bold mb-2">Campaign Info:</h3>
            <pre className="bg-slate-100 p-2 rounded">
              {JSON.stringify(info.campaignInfo, null, 2)}
            </pre>
          </div>

          <div>
            <h3 className="font-bold mb-2">Market Strategy Analysis:</h3>
            <div className="bg-slate-100 p-2 rounded">
              <h4 className="font-semibold">Reasoning:</h4>
              <ul className="list-disc pl-5">
                {info.analysis.marketStrategy.reasoning.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
              <h4 className="font-semibold mt-2">Strategies:</h4>
              <ul className="list-disc pl-5">
                {info.analysis.marketStrategy.strategies.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">Game Selection Analysis:</h3>
            <div className="bg-slate-100 p-2 rounded">
              <h4 className="font-semibold">Reasoning:</h4>
              <ul className="list-disc pl-5">
                {info.analysis.gameSelection.reasoning.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
              <h4 className="font-semibold mt-2">Match Criteria:</h4>
              {info.analysis.gameSelection.matchCriteria.map((match, i) => (
                <div key={i} className="mt-1 pl-5">
                  <p className="font-medium">{match.game}:</p>
                  <ul className="list-disc pl-5">
                    {match.reasons.map((r, j) => (
                      <li key={j}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-2">KOL Selection Analysis:</h3>
            <div className="bg-slate-100 p-2 rounded">
              <h4 className="font-semibold">Reasoning:</h4>
              <ul className="list-disc pl-5">
                {info.analysis.kolSelection.reasoning.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
              <h4 className="font-semibold mt-2">Match Criteria:</h4>
              {info.analysis.kolSelection.matchCriteria.map((match, i) => (
                <div key={i} className="mt-1 pl-5">
                  <p className="font-medium">{match.kol}:</p>
                  <ul className="list-disc pl-5">
                    {match.reasons.map((r, j) => (
                      <li key={j}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
