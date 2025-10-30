import React, { useState } from 'react';
import { ShoppingCart, Award, Users, TrendingUp, Star, Package } from 'lucide-react';

export default function About() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const values = [
    {
      title: "Quality First",
      description: "We source only the finest products from trusted manufacturers worldwide, ensuring every item meets our rigorous quality standards."
    },
    {
      title: "Customer Focus",
      description: "Your satisfaction drives everything we do. Our dedicated team is committed to providing exceptional service and support."
    },
    {
      title: "Innovation",
      description: "We constantly evolve our platform and product selection to bring you the latest trends and technologies in e-commerce."
    }
  ];

  const stats = [
    { number: "10K+", label: "Products", icon: Package },
    { number: "50K+", label: "Happy Customers", icon: Users },
    { number: "15+", label: "Countries", icon: TrendingUp },
    { number: "4.9", label: "Average Rating", icon: Star }
  ];

  const timeline = [
    { year: "2020", title: "Founded", description: "Medusa was born with a vision to revolutionize online shopping" },
    { year: "2021", title: "Growth", description: "Expanded to 10,000+ products across multiple categories" },
    { year: "2023", title: "Recognition", description: "Awarded Best E-commerce Platform by Industry Leaders" },
    { year: "2024", title: "Global", description: "Now serving customers in over 15 countries worldwide" }
  ];

  return (
    <div className="bg-white text-black min-h-screen">
    

      {/* Hero Section */}
      <section className=" m-[20px] bg-black text-white  py-24 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 tracking-wider">ABOUT MEDUSA</h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            We're redefining the shopping experience by combining premium quality products with exceptional customer service. Our mission is to make luxury accessible to everyone.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white text-white py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-black border-2 border-gray-800 p-8 text-center hover:border-gray-600 transition-all duration-300">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-white" />
                  <div className="text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-gray-500 uppercase tracking-widest text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-black mx-[40px]  text-white py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">OUR STORY</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Founded in 2020, Medusa emerged from a simple idea: everyone deserves access to quality products without compromise. What started as a small online shop has grown into a thriving marketplace serving customers across the globe.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Today, we're proud to offer thousands of carefully curated products across fashion, electronics, accessories, and home living. Every item in our collection is selected with the same care and attention to detail that defined our early days.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">OUR VALUES</h2>
          <p className="text-gray-500 text-center mb-12 text-lg">The principles that guide everything we do</p>
          
          <div className="grid grid-cols-1 text-white md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`bg-black border border-gray-800 p-10 transition-all duration-300 ${
                  hoveredCard === index ? 'bg-white text-black border-black transform -translate-y-2' : ''
                }`}
              >
                <h3 className="text-2xl font-bold mb-4 border-b-2 border-white  pb-2 inline-block">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl  font-bold text-center mb-16">OUR JOURNEY</h2>
          
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-8">
                  <div className="w-32 text-right flex-shrink-0">
                    <div className="text-3xl font-bold">{item.year}</div>
                  </div>
                  
                  <div className="relative flex-shrink-0">
                    <div className="w-4 h-4 bg-black rounded-full"></div>
                    {index !== timeline.length - 1 && (
                      <div className="absolute left-1/2 top-4 w-0.5 h-20 bg-gray-700 -translate-x-1/2"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 bg-gray-900 border border-gray-800 p-6">
                    <h3 className="text-2xl  text-white font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20 px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">JOIN OUR COMMUNITY</h2>
          <p className="text-gray-400 text-lg mb-8">
            Discover why thousands of customers trust Medusa for their shopping needs. Experience the difference today.
          </p>
          <button className="bg-black text-white px-12 py-4 text-lg font-bold hover:outline-1 hover:bg-white hover:text-black transition-all duration-300">
            START SHOPPING
          </button>
        </div>
      </section>

      {/* Footer */}
     
    </div>
  );
}