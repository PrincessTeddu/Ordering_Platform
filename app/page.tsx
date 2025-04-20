'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from './data/products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingBag, faLeaf, faCarrot, faAppleAlt, faTruck, faShoppingBasket, faChevronLeft, faChevronRight, faStar, faShieldAlt, faClock } from '@fortawesome/free-solid-svg-icons';

const featureItems = [
  {
    id: 1,
    icon: faLeaf,
    title: 'Fresh from the Farm',
    subtitle: 'Get the best organic produce delivered to your doorstep',
    bgColor: 'from-green-400 to-emerald-600'
  },
  {
    id: 2,
    icon: faTruck,
    title: 'Bulk Orders Made Easy',
    subtitle: 'Special discounts on wholesale purchases',
    bgColor: 'from-orange-400 to-red-600'
  },
  {
    id: 3,
    icon: faStar,
    title: 'Premium Quality',
    subtitle: 'Handpicked fresh vegetables and fruits',
    bgColor: 'from-purple-400 to-indigo-600'
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <header className="bg-white shadow-sm py-6 mb-8">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-600">Fresh Market</h1>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2">
                <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
                Home
              </Link>
              <Link href="/orders" className="text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2">
                <FontAwesomeIcon icon={faShoppingBag} className="w-4 h-4" />
                My Orders
              </Link>
            </div>
          </nav>
        </div>
      </header>
      
      <div className="mb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featureItems.map((item) => (
              <div
                key={item.id}
                className={`rounded-xl p-8 bg-gradient-to-r ${item.bgColor} shadow-lg transform hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="text-white mb-4">
                  <FontAwesomeIcon icon={item.icon} className="w-12 h-12" />
                </div>
                <div className="text-white">
                  <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                  <p className="text-lg opacity-90">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 space-y-8 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h2 className="text-4xl font-bold text-gray-800">Fresh Products</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full capitalize transition-all duration-300 ${selectedCategory === category
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white border border-green-200 text-gray-600 hover:bg-green-50 hover:border-green-300'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              <div className="flex justify-center items-center h-40 bg-gradient-to-br from-green-50 to-green-100 rounded-t-xl p-6">
                <FontAwesomeIcon
                  icon={product.category === 'Vegetables' ? faCarrot : product.category === 'Fruits' ? faAppleAlt : faLeaf}
                  className="w-20 h-20 text-green-600 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium flex items-center gap-2">
                    <FontAwesomeIcon icon={product.category === 'Vegetables' ? faCarrot : product.category === 'Fruits' ? faAppleAlt : faLeaf} className="w-3 h-3" />
                    {product.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                <div className="flex justify-between items-center py-3 border-t border-gray-100">
                  <p className="text-green-600 font-bold text-2xl">
                    ${product.price.toFixed(2)} per {product.unit}
                  </p>
                  <span className="text-sm font-medium text-gray-500">
                    Stock: {product.stock} {product.unit}
                  </span>
                </div>
                <Link 
                  href={`/order?productId=${product.id}`}
                  className="btn btn-primary block text-center w-full font-semibold tracking-wide flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faShoppingBasket} className="w-4 h-4" />
                  Place Bulk Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 Fresh Market. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}