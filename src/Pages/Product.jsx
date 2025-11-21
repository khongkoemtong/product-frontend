import React, { useState } from 'react';
import { ShoppingCart, User, Search } from 'lucide-react';

const Product = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const products = [
    { id: 1, name: 'Classic T-Shirt', price: 29.99, category: 'fashion', icon: '👕', rating: 4.5, reviews: 234 },
    { id: 2, name: 'Denim Jacket', price: 89.99, category: 'fashion', icon: '🧥', rating: 4.8, reviews: 156 },
    { id: 3, name: 'Sneakers Pro', price: 119.99, category: 'fashion', icon: '👟', rating: 4.6, reviews: 445 },
    { id: 4, name: 'Wireless Headphones', price: 199.99, category: 'electronics', icon: '🎧', rating: 4.7, reviews: 567 },
    { id: 5, name: 'Smart Watch Ultra', price: 399.99, category: 'electronics', icon: '⌚', rating: 4.9, reviews: 892 },
    { id: 6, name: 'Laptop Stand Pro', price: 79.99, category: 'electronics', icon: '💻', rating: 4.4, reviews: 234 },
    { id: 7, name: 'Leather Backpack', price: 149.99, category: 'accessories', icon: '🎒', rating: 4.6, reviews: 321 },
    { id: 8, name: 'Sunglasses Classic', price: 59.99, category: 'accessories', icon: '🕶️', rating: 4.3, reviews: 178 },
    { id: 9, name: 'Luxury Watch', price: 299.99, category: 'accessories', icon: '⌚', rating: 4.8, reviews: 445 },
    { id: 10, name: 'Coffee Maker Deluxe', price: 129.99, category: 'home', icon: '☕', rating: 4.7, reviews: 523 },
    { id: 11, name: 'Designer Lamp', price: 89.99, category: 'home', icon: '💡', rating: 4.5, reviews: 267 },
    { id: 12, name: 'Cozy Blanket', price: 49.99, category: 'home', icon: '🛋️', rating: 4.6, reviews: 398 }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'home', name: 'Home & Living' }
  ];

  const filteredProducts = products
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-white">
     

      {/* Main Content */}
      <div className="max-w-[90%] mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative  w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-black text-lg focus:outline-none focus:shadow-[4px_4px_0_0_#000]"
            />
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8 pb-6 border-b-4 border-black">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 border-2 border-black font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-black hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            
           
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 text-lg font-medium">
          {filteredProducts.length} Products Found
        </div>

        {/* Products Horizontal Scroll */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 w-max">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="border-2 border-black bg-white hover:shadow-[8px_8px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all flex flex-col w-72 flex-shrink-0"
              >
                {/* Product Image */}
                <div className="relative w-full aspect-square bg-gray-100 border-b-2 border-black flex items-center justify-center text-7xl">
                  {product.icon}
                  <div className="absolute top-3 right-3 bg-black text-white px-3 py-1 text-xs font-bold uppercase">
                    {product.category}
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                  
                  <div className="mb-3 text-sm">
                    <span className="text-black">{'★'.repeat(Math.floor(product.rating))}</span>
                    <span className="text-gray-400">{'★'.repeat(5 - Math.floor(product.rating))}</span>
                    <span className="ml-2 text-gray-600">({product.reviews})</span>
                  </div>
                  
                  <div className="text-2xl font-bold mb-4">
                    ${product.price}
                  </div>
                  
                  <button className="w-full mt-auto py-3 bg-black text-white border-2 border-black font-bold hover:bg-white hover:text-black transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;