import React, { useState } from 'react';
import { Package, TrendingUp, Users, AlertCircle, ChevronRight, Search, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Products', value: '248', change: '+12%', icon: Package },
    { label: 'Active Users', value: '12.4K', change: '+8%', icon: Users },
    { label: 'Revenue', value: '$94.2K', change: '+23%', icon: TrendingUp },
    { label: 'Issues', value: '17', change: '-5%', icon: AlertCircle },
  ];

  const products = [
    { name: 'Dashboard Pro', status: 'Active', users: 3420, revenue: '$24.5K', progress: 85 },
    { name: 'Analytics Suite', status: 'Active', users: 2890, revenue: '$19.8K', progress: 72 },
    { name: 'Mobile App', status: 'Beta', users: 1240, revenue: '$8.2K', progress: 45 },
    { name: 'API Gateway', status: 'Active', users: 4120, revenue: '$31.4K', progress: 92 },
    { name: 'Cloud Storage', status: 'Pending', users: 890, revenue: '$5.1K', progress: 28 },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentActivity = [
    { action: 'Product launch', product: 'Dashboard Pro v2.0', time: '2 hours ago' },
    { action: 'Feature update', product: 'Analytics Suite', time: '5 hours ago' },
    { action: 'Bug fix deployed', product: 'Mobile App', time: '1 day ago' },
    { action: 'New integration', product: 'API Gateway', time: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-black">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Product Management</h1>
            <p className="text-sm mt-1 text-black/60">Monitor and manage your product portfolio</p>
          </div>
          <button className="bg-black text-white px-4 py-2 flex items-center gap-2 hover:bg-gray-800 transition-colors">
            <Plus size={18} />
            New Product
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {['overview', 'products', 'analytics', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-black'
                    : 'text-black/60 hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="border border-black p-6 bg-white hover:bg-black/5 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <stat.icon size={24} className="text-black" />
                <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-black' : 'text-black/60'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-black/60">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Table */}
          <div className="lg:col-span-2 border border-black">
            <div className="p-6 border-b border-black flex items-center justify-between">
              <h2 className="text-lg font-bold">Products</h2>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-black text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-medium">Product</th>
                    <th className="text-left py-3 px-6 text-sm font-medium">Status</th>
                    <th className="text-left py-3 px-6 text-sm font-medium">Users</th>
                    <th className="text-left py-3 px-6 text-sm font-medium">Revenue</th>
                    <th className="text-left py-3 px-6 text-sm font-medium">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr key={index} className="border-t border-black hover:bg-black/5 cursor-pointer transition-colors"
                        onClick={() => navigate(`/product/${product.name.replace(/\s+/g, '-').toLowerCase()}`)}>
                      <td className="py-4 px-6 font-medium underline">{product.name}</td>
                      <td className="py-4 px-6">
                        <span className={`text-xs px-2 py-1 border ${
                          product.status === 'Active' ? 'bg-black text-white border-black' :
                          product.status === 'Beta' ? 'bg-white text-black border-black' :
                          'bg-black/10 text-black/60 border-black/20'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm">{product.users.toLocaleString()}</td>
                      <td className="py-4 px-6 text-sm font-medium">{product.revenue}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-black/10">
                            <div className="h-full bg-black" style={{ width: `${product.progress}%` }} />
                          </div>
                          <span className="text-xs text-black/60 w-8">{product.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="border border-black">
            <div className="p-6 border-b border-black">
              <h2 className="text-lg font-bold">Recent Activity</h2>
            </div>
            <div className="divide-y divide-black/20">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-6 hover:bg-black/5 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-sm mb-1">{activity.action}</div>
                      <div className="text-sm text-black/60">{activity.product}</div>
                    </div>
                    <ChevronRight size={18} className="text-black/40 group-hover:text-black transition-colors" />
                  </div>
                  <div className="text-xs text-black/40 mt-2">{activity.time}</div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-black/20">
              <button className="w-full text-center text-sm font-medium hover:text-black/60 transition-colors">
                View All Activity
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
