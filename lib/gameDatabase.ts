export interface Game {
  id: string
  name: string
  description: string
  genre: string[]
  marketingCapabilities: string[]
  audience: {
    ageRange: string
    interests: string[]
  }
  regions: string[]
  image: string
}

export const games: Game[] = [
  {
    id: '1',
    name: 'Adopt Me!',
    description: 'Popular pet adoption and roleplay game',
    genre: ['Roleplay', 'Social'],
    marketingCapabilities: ['brand awareness', 'product launch', 'engagement'],
    audience: {
      ageRange: '8-16',
      interests: ['pets', 'social', 'collecting']
    },
    regions: ['North America', 'Europe', 'Asia'],
    image: '/games/adopt-me.jpg'
  },
  {
    id: '2',
    name: 'Brookhaven RP',
    description: 'Life simulation and roleplay game',
    genre: ['Roleplay', 'Simulation'],
    marketingCapabilities: ['brand awareness', 'virtual events'],
    audience: {
      ageRange: '10-18',
      interests: ['roleplay', 'social', 'lifestyle']
    },
    regions: ['North America', 'Europe'],
    image: '/games/brookhaven.jpg'
  },
  {
    id: '3',
    name: 'Blox Fruits',
    description: 'Action-adventure fighting game',
    genre: ['Action', 'Adventure'],
    marketingCapabilities: ['product launch', 'engagement'],
    audience: {
      ageRange: '12-20',
      interests: ['anime', 'action', 'competition']
    },
    regions: ['Asia', 'North America'],
    image: '/games/blox-fruits.jpg'
  }
] 