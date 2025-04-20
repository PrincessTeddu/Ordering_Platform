export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  unit: string;
  stock: number;
  icon: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Fresh Red Tomatoes',
    price: 2.99,
    description: 'Vine-ripened, juicy red tomatoes perfect for salads and cooking. Locally sourced from organic farms.',
    category: 'Vegetables',
    unit: 'kg',
    stock: 500,
    icon: 'faTomato'
  },
  {
    id: '2',
    name: 'Premium Russet Potatoes',
    price: 1.99,
    description: 'High-quality russet potatoes, perfect for baking, mashing, or frying. Clean and ready to cook.',
    category: 'Vegetables',
    unit: 'kg',
    stock: 1000,
    icon: 'faCarrot'
  },
  {
    id: '3',
    name: 'Sweet Yellow Onions',
    price: 1.49,
    description: 'Fresh, crisp yellow onions with a mild, sweet flavor. Essential for everyday cooking.',
    category: 'Vegetables',
    unit: 'kg',
    stock: 750,
    icon: 'faLeaf'
  },
  {
    id: '4',
    name: 'Organic Carrots',
    price: 2.49,
    description: 'Sweet and crunchy organic carrots. Rich in vitamins and perfect for snacking or cooking.',
    category: 'Vegetables',
    unit: 'kg',
    stock: 800,
    icon: 'faCarrot'
  },
  {
    id: '5',
    name: 'Fresh Spinach',
    price: 3.99,
    description: 'Organic baby spinach leaves, perfect for salads and cooking. Rich in iron and vitamins.',
    category: 'Vegetables',
    unit: 'kg',
    stock: 300,
    icon: 'faLeaf'
  },
  {
    id: '6',
    name: 'Red Apples',
    price: 4.99,
    description: 'Sweet and crispy red apples. Perfect for snacking or baking.',
    category: 'Fruits',
    unit: 'kg',
    stock: 400,
    icon: 'faAppleAlt'
  },
  {
    id: '7',
    name: 'Ripe Bananas',
    price: 2.99,
    description: 'Fresh yellow bananas. Rich in potassium and perfect for smoothies.',
    category: 'Fruits',
    unit: 'kg',
    stock: 600,
    icon: 'faLeaf'
  },
  {
    id: '8',
    name: 'Sweet Oranges',
    price: 3.99,
    description: 'Juicy oranges packed with vitamin C. Great for juicing or eating fresh.',
    category: 'Fruits',
    unit: 'kg',
    stock: 450,
    icon: 'faAppleAlt'
  },
  {
    id: '9',
    name: 'Fresh Strawberries',
    price: 5.99,
    description: 'Sweet and juicy strawberries. Perfect for desserts or fresh eating.',
    category: 'Fruits',
    unit: 'kg',
    stock: 200,
    icon: 'faAppleAlt'
  },
  {
    id: '10',
    name: 'Organic Herbs Mix',
    price: 4.99,
    description: 'Fresh mixed herbs including basil, parsley, and cilantro. Perfect for cooking.',
    category: 'Herbs',
    unit: 'bunch',
    stock: 150,
    icon: 'faLeaf'
  }
];