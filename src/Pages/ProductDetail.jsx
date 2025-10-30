import React, { useState } from 'react';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Plus, Minus, Check, Truck, Shield, RefreshCw } from 'lucide-react';

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');

  const images = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&h=800&fit=crop'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
  const reviews = [
    { name: 'Sarah Johnson', rating: 5, date: 'Oct 20, 2025', comment: 'Excellent quality and perfect fit. Highly recommended!' },
    { name: 'Mike Chen', rating: 4, date: 'Oct 18, 2025', comment: 'Great product, fast shipping. Very satisfied with my purchase.' },
    { name: 'Emma Wilson', rating: 5, date: 'Oct 15, 2025', comment: 'Love this! Exactly as described and arrived quickly.' }
  ];

  const features = [
    'Premium quality materials',
    'Sustainable production',
    'Handcrafted with care',
    'Limited edition design',
    '2-year warranty included',
    'Free returns within 30 days'
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 hover:text-gray-600 transition-colors">
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Products</span>
            </button>
            <div className="flex items-center gap-4">
              <button className="p-2 border border-black hover:bg-black hover:text-white transition-colors">
                <Heart size={20} />
              </button>
              <button className="p-2 border border-black hover:bg-black hover:text-white transition-colors">
                <Share2 size={20} />
              </button>
              <button className="bg-black text-white px-4 py-2 flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <ShoppingCart size={18} />
                Cart (0)
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="border border-black mb-4 bg-gray-50 aspect-square">
              <img 
                src={images[selectedImage]} 
                alt="Product" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border aspect-square bg-gray-50 hover:border-black transition-colors ${
                    selectedImage === index ? 'border-black border-2' : 'border-gray-300'
                  }`}
                >
                  <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-3">Premium Wireless Headphones</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="black" className="text-black" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.8 (324 reviews)</span>
              </div>
              <div className="text-3xl font-bold mb-2">$299.00</div>
              <p className="text-gray-600">Tax included. Shipping calculated at checkout.</p>
            </div>

            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <p className="leading-relaxed">
                Experience superior sound quality with our premium wireless headphones. 
                Featuring advanced noise cancellation, 30-hour battery life, and premium 
                comfort design. Perfect for music lovers and professionals alike.
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Size</span>
                <button className="text-sm underline hover:no-underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border text-center font-medium transition-colors ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'border-black hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <span className="font-medium block mb-3">Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-black">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-6 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <button className="flex-1 bg-black text-white py-3 px-6 font-medium hover:bg-gray-800 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-bold mb-4">Product Features</h3>
              <div className="grid grid-cols-1 gap-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check size={16} className="text-black" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck size={24} className="mx-auto mb-2" />
                <div className="text-xs font-medium mb-1">Free Shipping</div>
                <div className="text-xs text-gray-600">On orders over $50</div>
              </div>
              <div className="text-center">
                <Shield size={24} className="mx-auto mb-2" />
                <div className="text-xs font-medium mb-1">Secure Payment</div>
                <div className="text-xs text-gray-600">100% protected</div>
              </div>
              <div className="text-center">
                <RefreshCw size={24} className="mx-auto mb-2" />
                <div className="text-xs font-medium mb-1">Easy Returns</div>
                <div className="text-xs text-gray-600">30-day policy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-black pt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <button className="border border-black px-6 py-2 font-medium hover:bg-black hover:text-white transition-colors">
              Write a Review
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="border border-black p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="black" className="text-black" />
                  ))}
                </div>
                <p className="text-sm mb-4">{review.comment}</p>
                <div className="text-xs text-gray-600">
                  <div className="font-medium text-black">{review.name}</div>
                  <div>{review.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}