import React, { useState } from 'react';
import { ShoppingCart, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchApi = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const result = await res.json();
      console.log(result);

      if (!res.ok) {
        alert('Invalid email or password!');
        return;
      }

      if (result.token) {
        localStorage.setItem("token", result.token);
      }
      
      const userData = {
        id: result.user?.id || result.id,
        name: result.user?.name || result.name || result.username,
        email: result.user?.email || result.email
      };
      
      localStorage.setItem("user", JSON.stringify(userData));

      alert('Login success!');
      
      navigate('/');
      window.location.reload(); 

    } catch (e) {
      console.log(e);
      alert(e.error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto h-screen">
        {/* Header */}
        <div className="p-8">
          <div className="flex items-center space-x-2">
            <div className="w-20 h-20 flex items-center justify-center">
              <img src="/public/logo.png" alt="" />
            </div>
            <span className="text-3xl font-bold">Medusa</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
              <p className="text-gray-600">Please enter your details to sign in</p>
            </div>

            {/* Login Form */}
            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <label  className="block text-sm font-semibold mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    name='email'
                    onChange={handlechange}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label  className="block text-sm font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    onChange={handlechange}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 focus:border-black outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff size={20} className="text-gray-400 hover:text-black" />
                    ) : (
                      <Eye size={20} className="text-gray-400 hover:text-black" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-2 border-gray-300" />
                  <span className="text-sm">Remember me</span>
                </label>
                <a href="#" className="text-sm font-semibold hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button 
                type='submit'
                onClick={fetchApi}
                className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800 transition flex items-center justify-center space-x-2"
              >  
                <span>Sign In</span>
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-600">OR CONTINUE WITH</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Alternative Login Options */}
            <div className="space-y-3">
              <button className="w-full border-2 border-gray-300 py-3 font-semibold hover:border-black hover:bg-gray-50 transition flex items-center justify-center space-x-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <button className="w-full border-2 border-gray-300 py-3 font-semibold hover:border-black hover:bg-gray-50 transition flex items-center justify-center space-x-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Continue with Facebook</span>
              </button>

              <button className="w-full border-2 border-gray-300 py-3 font-semibold hover:border-black hover:bg-gray-50 transition flex items-center justify-center space-x-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <span>Continue with Apple</span>
              </button>
            </div>

            {/* Sign Up Prompt */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <a href="/register" className="font-semibold text-black hover:underline">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-black transition">Terms & Conditions</a>
            <a href="#" className="hover:text-black transition">Privacy Policy</a>
            <a href="#" className="hover:text-black transition">Help Center</a>
          </div>
        </div>
      </div>

      {/* Right Side - Visual/Design */}
      <div className="hidden lg:flex lg:w-1/2 bg-black text-white items-center justify-center p-12 relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-5xl font-bold mb-6">Start Your Shopping Journey</h2>
          <p className="text-xl text-gray-300 mb-8">
            Access exclusive deals, track your orders, and enjoy a personalized shopping experience.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white text-black flex items-center justify-center flex-shrink-0 font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-semibold mb-1">Fast & Secure Checkout</h3>
                <p className="text-gray-400">Save your preferences for a seamless experience</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white text-black flex items-center justify-center flex-shrink-0 font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-semibold mb-1">Order Tracking</h3>
                <p className="text-gray-400">Monitor your purchases in real-time</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white text-black flex items-center justify-center flex-shrink-0 font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-semibold mb-1">Exclusive Member Deals</h3>
                <p className="text-gray-400">Get special offers just for you</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 border-4 border-white opacity-10"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 border-4 border-white opacity-10"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white opacity-5"></div>
      </div>
    </div>
  );
}