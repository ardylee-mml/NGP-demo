export interface CustomizationItem {
  id: string;
  name: string;
  image: string;
  category: string;
  compatibility?: string[]; // KOL character types this item is compatible with
  brands?: string[]; // Associated brands
}

export const categories = {
  clothes: {
    name: "Clothes",
    description: "Branded outfits and clothing items"
  },
  shoes: {
    name: "Shoes",
    description: "Footwear from various brands"
  },
  items: {
    name: "Props",
    description: "Branded items and accessories"
  },
  animations: {
    name: "Animations",
    description: "Character movements and poses"
  }
};

export const customizationItems: Record<string, CustomizationItem[]> = {
  clothes: [
    {
      id: 'c1',
      name: 'Nike Hoodie',
      image: '/customization/outfits/Nike-hoodie.png',
      category: 'clothes',
      compatibility: ['Gamer', 'Athlete', 'Lifestyle', 'Artist', 'Fashion'],
      brands: ['Nike']
    },
    {
      id: 'c2',
      name: 'Adidas Sport Shirt',
      image: '/customization/outfits/White-shirt-Adidas.png',
      category: 'clothes',
      compatibility: ['Athlete', 'Lifestyle'],
      brands: ['Adidas']
    },
    {
      id: 'c3',
      name: 'Supreme T-Shirt',
      image: '/customization/outfits/White-Shirt-Supreme.png',
      category: 'clothes',
      compatibility: ['Lifestyle', 'Artist'],
      brands: ['Supreme']
    },
    {
      id: 'c4',
      name: 'Gucci Jacket',
      image: '/customization/outfits/Color-jacket-Gucci.png',
      category: 'clothes',
      compatibility: ['Fashion', 'Lifestyle'],
      brands: ['Gucci']
    }
  ],
  shoes: [
    {
      id: 's1',
      name: 'Dr. Martens Boots',
      image: '/customization/outfits/DrMartenBoots.png',
      category: 'shoes',
      compatibility: ['Artist', 'Fashion'],
      brands: ['Dr. Martens']
    },
    {
      id: 's2',
      name: 'Nike Air Max',
      image: '/customization/outfits/MixColor-Nike-AirMax.png',
      category: 'shoes',
      compatibility: ['Athlete', 'Lifestyle'],
      brands: ['Nike']
    },
    {
      id: 's3',
      name: 'Adidas Superstar',
      image: '/customization/outfits/Red-shoes-Adidas-Superstar.png',
      category: 'shoes',
      compatibility: ['Lifestyle', 'Fashion'],
      brands: ['Adidas']
    }
  ],
  items: [
    {
      id: 'i1',
      name: 'Coca-Cola Can',
      image: '/customization/items/CocaCola.png',
      category: 'items',
      brands: ['Coca-Cola']
    },
    {
      id: 'i2',
      name: 'Pepsi Bottle',
      image: '/customization/items/Pepsi.png',
      category: 'items',
      brands: ['Pepsi']
    },
    {
      id: 'i3',
      name: 'Red Bull Energy',
      image: '/customization/items/Redbull.png',
      category: 'items',
      brands: ['Red Bull']
    },
    {
      id: 'i4',
      name: 'Monster Energy',
      image: '/customization/items/MonsterEnergy.png',
      category: 'items',
      brands: ['Monster']
    }
  ],
  animations: [
    {
      id: 'a1',
      name: 'Dance Move',
      image: '/customization/animations/hiphop.png',
      category: 'animations',
      compatibility: ['Lifestyle', 'Artist']
    },
    {
      id: 'a2',
      name: 'Victory Pose',
      image: '/customization/animations/Victory.png',
      category: 'animations',
      compatibility: ['Athlete', 'Gamer']
    },
    {
      id: 'a3',
      name: 'Drink Animation',
      image: '/customization/animations/Drinking.png',
      category: 'animations'
    }
  ]
}; 