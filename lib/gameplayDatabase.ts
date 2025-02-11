export interface GameplayElement {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  customizableElements: {
    id: string;
    name: string;
    type: 'image' | 'text' | 'color' | '3d-model';
    description: string;
    currentValue?: string;
    constraints?: {
      maxSize?: string;
      allowedFormats?: string[];
      maxLength?: number;
    };
  }[];
  marketingCapabilities: string[];
  engagementMetrics: {
    averagePlayTime: string;
    completionRate: string;
    replayRate: string;
  };
  difficulty: 'Easy' | 'Medium' | 'Hard';
  platforms: string[];
}

export const gameplayElements: GameplayElement[] = [
  {
    id: 'wheel-1',
    name: 'Lucky Spin Wheel',
    type: 'Wheel of Fortune',
    description: 'Interactive spinning wheel with customizable segments and brand placements',
    image: '/gameplay/lucky-wheel.png',
    customizableElements: [
      {
        id: 'wheel-bg',
        name: 'Wheel Background',
        type: 'image',
        description: 'Background image behind the wheel',
        constraints: {
          maxSize: '2MB',
          allowedFormats: ['.png', '.jpg', '.jpeg']
        }
      },
      {
        id: 'wheel-segments',
        name: 'Wheel Segments',
        type: 'color',
        description: 'Colors for wheel segments'
      },
      {
        id: 'brand-logo',
        name: 'Brand Logo',
        type: 'image',
        description: 'Center logo placement'
      }
    ],
    marketingCapabilities: ['Brand Awareness', 'Product Showcase', 'Lead Generation'],
    engagementMetrics: {
      averagePlayTime: '45 seconds',
      completionRate: '92%',
      replayRate: '65%'
    },
    difficulty: 'Easy',
    platforms: ['Mobile', 'Web', 'Kiosk']
  },
  {
    id: 'bball-1',
    name: 'Brand Hoops',
    type: 'Basketball',
    description: 'Basketball shooting game with customizable court and billboard advertisements',
    image: '/gameplay/basketball.png',
    customizableElements: [
      {
        id: 'court-floor',
        name: 'Court Floor',
        type: 'image',
        description: 'Basketball court floor branding',
        constraints: {
          maxSize: '4MB',
          allowedFormats: ['.png', '.jpg']
        }
      },
      {
        id: 'billboard',
        name: 'Court Billboard',
        type: 'image',
        description: 'Sideline billboard advertisement'
      },
      {
        id: 'ball-skin',
        name: 'Basketball Skin',
        type: '3d-model',
        description: 'Custom basketball appearance'
      }
    ],
    marketingCapabilities: ['Brand Integration', 'Sports Marketing', 'Event Activation'],
    engagementMetrics: {
      averagePlayTime: '2 minutes',
      completionRate: '78%',
      replayRate: '85%'
    },
    difficulty: 'Medium',
    platforms: ['Mobile', 'AR', 'Event Installation']
  },
  {
    id: 'puzzle-1',
    name: 'Brand Puzzle',
    type: 'Jigsaw Puzzle',
    description: 'Interactive puzzle game featuring brand imagery and products',
    image: '/gameplay/puzzle.png',
    customizableElements: [
      {
        id: 'puzzle-image',
        name: 'Puzzle Image',
        type: 'image',
        description: 'Main puzzle image',
        constraints: {
          maxSize: '5MB',
          allowedFormats: ['.png', '.jpg', '.jpeg']
        }
      },
      {
        id: 'background',
        name: 'Background Theme',
        type: 'color',
        description: 'Puzzle background color scheme'
      }
    ],
    marketingCapabilities: ['Product Education', 'Brand Storytelling', 'Visual Showcase'],
    engagementMetrics: {
      averagePlayTime: '5 minutes',
      completionRate: '65%',
      replayRate: '45%'
    },
    difficulty: 'Medium',
    platforms: ['Web', 'Mobile', 'Tablet']
  },
  {
    id: 'race-1',
    name: 'Brand Racer',
    type: 'Racing Game',
    description: 'Racing game with customizable tracks and billboard advertisements',
    image: '/gameplay/racing.png',
    customizableElements: [
      {
        id: 'track-billboards',
        name: 'Track Billboards',
        type: 'image',
        description: 'Trackside advertising billboards',
        constraints: {
          maxSize: '3MB',
          allowedFormats: ['.png', '.jpg']
        }
      },
      {
        id: 'vehicle-wrap',
        name: 'Vehicle Wrap',
        type: '3d-model',
        description: 'Custom vehicle branding'
      }
    ],
    marketingCapabilities: ['Brand Visibility', 'Product Placement', 'Competitive Gaming'],
    engagementMetrics: {
      averagePlayTime: '4 minutes',
      completionRate: '82%',
      replayRate: '75%'
    },
    difficulty: 'Hard',
    platforms: ['Mobile', 'Console', 'PC']
  },
  {
    id: 'quiz-1',
    name: 'Brand Quiz Challenge',
    type: 'Quiz Game',
    description: 'Interactive quiz with customizable questions and brand-themed visuals',
    image: '/gameplay/quiz.png',
    customizableElements: [
      {
        id: 'quiz-background',
        name: 'Quiz Background',
        type: 'image',
        description: 'Background theme image',
        constraints: {
          maxSize: '2MB',
          allowedFormats: ['.png', '.jpg', '.jpeg']
        }
      },
      {
        id: 'question-text',
        name: 'Questions',
        type: 'text',
        description: 'Custom quiz questions',
        constraints: {
          maxLength: 200
        }
      }
    ],
    marketingCapabilities: ['Product Education', 'Customer Engagement', 'Data Collection'],
    engagementMetrics: {
      averagePlayTime: '3 minutes',
      completionRate: '88%',
      replayRate: '55%'
    },
    difficulty: 'Easy',
    platforms: ['Web', 'Mobile', 'Social Media']
  }
]; 