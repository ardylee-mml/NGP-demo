import { Game } from "@/lib/gameDatabase";
import { Checkbox } from "@/components/ui/checkbox";

interface GameCardProps {
  game: Game;
  isSelected: boolean;
  onSelect: () => void;
}

export function GameCard({ game, isSelected, onSelect }: GameCardProps) {
  return (
    <div
      className={`flex gap-4 p-4 rounded-lg transition-colors ${
        isSelected ? "bg-blue-50 border border-blue-200" : "bg-gray-50"
      }`}
    >
      {/* Checkbox Column */}
      <div className="flex items-start pt-1">
        <Checkbox checked={isSelected} onCheckedChange={onSelect} />
      </div>

      <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={game.image || "/placeholder-game.jpg"}
          alt={game.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium">{game.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{game.description}</p>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {game.genre.map((g) => (
            <span
              key={g}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Regions */}
        <div className="flex flex-wrap gap-2 mt-2">
          {game.regions.map((region) => (
            <span
              key={region}
              className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
            >
              {region}
            </span>
          ))}
        </div>

        {/* Marketing Capabilities */}
        <div className="flex flex-wrap gap-2 mt-2">
          {game.marketingCapabilities.map((capability) => (
            <span
              key={capability}
              className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
            >
              {capability}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
