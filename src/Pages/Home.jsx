import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Star, ArrowRight, TrendingUp, Tag, Heart } from 'lucide-react';
import { IoPhonePortraitOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { PiShirtFolded } from "react-icons/pi";
import { ImAndroid } from "react-icons/im";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    { title: "Anh sure tha Tinh ot ?", subtitle: "Discover premium quality products at unbeatable prices", cta: "Shop Now", image:'https://i.pinimg.com/736x/b0/33/b7/b033b7764e15bc97b677ce6c8777d635.jpg' },
    { title: "Ah na ot tinh Ah ng thai !", subtitle: "Be the first to explore our latest products", cta: "Explore Now", image:'https://i.pinimg.com/736x/38/5f/81/385f8107fc5eff6c1050a41e5a620c77.jpg' },
    { title: "Mean luy Tuk Tver ey ?", subtitle: "Save up to 50% on selected items this week", cta: "View Deals", image:'https://i.pinimg.com/736x/72/16/b5/7216b5d26b3ee9c4792891c711ce8c9e.jpg' }
  ];

  const featuredProducts = [
    { id: 1, name: "Premium Wireless Headphones", price: "$199.99", image: "🎧", rating: 4.5, sales: 234 },
    { id: 2, name: "Smart Watch Pro", price: "$299.99", image: "⌚", rating: 4.8, sales: 189 },
    { id: 3, name: "Laptop Stand Ergonomic", price: "$79.99", image: "💻", rating: 4.3, sales: 456 },
    { id: 4, name: "Bluetooth Speaker", price: "$149.99", image: "🔊", rating: 4.6, sales: 321 }
  ];

  const categories = [
    { name: "Electronics", icon: <IoPhonePortraitOutline />, count: 150 },
    { name: "Accessories", icon: <ImAndroid />, count: 89 },
    { name: "Home & Living", icon: <AiOutlineHome />, count: 234 },
    { name: "Fashion", icon: <PiShirtFolded />, count: 178 }
  ];

  const testimonials = [
    { name: "Sarah Johnson", review: "Amazing quality products and fast shipping. Highly recommend!", rating: 5 },
    { name: "Mike Chen", review: "Great customer service and excellent product selection.", rating: 5 },
    { name: "Emma Davis", review: "Best online shopping experience I've had in years.", rating: 5 }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white text-black container mx-auto w-auto ">
      {/* Hero Section */}
      <section className="relative w-auto h-[60vh] sm:h-[70vh] md:h-[80vh] xl:h-[90vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="container p-6 mx-auto px-4 h-full flex flex-col sm:flex-row items-center justify-center sm:justify-between relative z-10 text-center sm:text-left">
          <div className="max-w-xl xl:max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-4 text-white animate-fade-in">{heroSlides[currentSlide].title}</h1>
            <p className="text-lg sm:text-xl xl:text-2xl mb-6 text-white">{heroSlides[currentSlide].subtitle}</p>
            <button className="bg-white text-black px-6 sm:px-8 py-2 sm:py-3 xl:px-10 xl:py-4 hover:bg-gray-200 transition flex items-center justify-center sm:justify-start space-x-2 mx-auto sm:mx-0">
              <span>{heroSlides[currentSlide].cta}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold mb-2">Featured Products</h2>
            <p className="text-gray-600 text-sm sm:text-base xl:text-lg">Discover our top-selling items</p>
          </div>
          <button className="border border-black px-4 sm:px-6 py-2 hover:bg-black hover:text-white transition text-sm sm:text-base xl:text-lg">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="border border-gray-300 p-4 sm:p-6 xl:p-8 hover:shadow-xl transition group">
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl sm:text-6xl xl:text-7xl">{product.image}</div>
                <button className="opacity-0 group-hover:opacity-100 transition">
                  <Heart size={20} />
                </button>
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base xl:text-lg">{product.name}</h3>
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "black" : "none"} stroke="black" />
                ))}
                <span className="text-xs sm:text-sm xl:text-base text-gray-600">({product.sales})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg sm:text-xl xl:text-2xl font-bold">{product.price}</span>
                <button className="bg-black text-white px-3 sm:px-4 py-1 sm:py-2 xl:px-5 xl:py-3 text-xs sm:text-sm xl:text-base hover:bg-gray-800 transition">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <div className="container mt-3 mx-auto px-4 mb-8">
          <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-center">Shop by Category</h2>
        </div>
      <section className="bg-gray-50 py-12 overflow-scroll sm:py-16 overflow-hidden">
        
        <div className="relative">
          <div className="flex animate-scroll space-x-2">
            {[...categories, ...categories, ...categories].map((cat, idx) => (
              <div key={idx} className="bg-white border border-gray-300 p-6 sm:p-8 xl:p-10 text-center hover:border-black hover:shadow-lg transition cursor-pointer min-w-[150px] sm:min-w-[200px] xl:min-w-[220px] flex-shrink-0">
                <div className="text-4xl sm:text-5xl xl:text-6xl mb-2 sm:mb-4 flex justify-center">{cat.icon}</div>
                <h3 className="font-semibold mb-1 text-sm sm:text-base xl:text-lg">{cat.name}</h3>
                <p className="text-xs sm:text-sm xl:text-base text-gray-600">{cat.count} items</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="bg-black text-white p-8 sm:p-12 xl:p-16 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl xl:max-w-3xl">
            <div className="flex items-center space-x-2 mb-4">
              <Tag size={20} />
              <span className="text-xs sm:text-sm xl:text-base font-semibold">LIMITED TIME OFFER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold mb-4">Get 50% Off on Premium Products</h2>
            <p className="text-gray-300 mb-6 text-sm sm:text-base xl:text-lg">Don't miss out on our biggest sale of the season. Use code: SAVE50</p>
            <button className="bg-white text-black px-6 sm:px-8 py-2 sm:py-3 xl:px-10 xl:py-4 hover:bg-gray-200 transition">Shop Sale</button>
          </div>
          <div className="absolute right-0 top-0 text-6xl sm:text-9xl xl:text-[12rem] opacity-10">💰</div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold mb-8 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="bg-white border border-gray-300 p-4 sm:p-6 xl:p-8">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="black" stroke="black" />
                  ))}
                </div>
                <p className="text-gray-700 mb-2 sm:mb-4 italic text-sm sm:text-base xl:text-lg">"{test.review}"</p>
                <p className="font-semibold text-xs sm:text-sm xl:text-base">— {test.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
