import React, { useState } from 'react';
import { ShoppingCart, Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const [form, setform] = useState({
    username: '',
    email: '',
    password: '',
    confirm_pass: '',
  });
  const navigate = useNavigate();

  const handleChange1 = (e) => { // Removed async (not needed)
    setform({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handlefetch = async (e) => {
    e.preventDefault();

    // Basic validation
    if (form.password !== form.confirm_pass) {
      alert('Passwords do not match!');
      return;
    }

    if (form.password.length < 6) {
      alert('Password must be at least 6 characters!');
      return;
    }

    setLoading(true); // Start loading
    
    try {
      const res = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      // Try reading JSON safely
      let data;
      try {
        data = await res.json();
      } catch {
        const text = await res.text(); // Laravel returned HTML (like error page)
        console.error("Server returned HTML instead of JSON:", text);
        alert("Server error — check Laravel route or API URL!");
        return;
      }

      console.log('Response data:', data);

      if (!res.ok) {
        if (data.errors) {
          const firstError = Object.values(data.errors)[0][0];
          alert(firstError);
        } else {
          alert(data.message || 'Registration failed!');
        }
        return;
      }

      if (data.token) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user || form));
          localStorage.setItem("id", JSON.stringify(data.id || form));
          navigate('/');
          alert('Registration successful!');
        }
      } else {
        alert(data.message || 'Something went wrong!');
      }

    } catch (error) {
      console.error("Fetch error:", error);
      alert("Network error — maybe Laravel server is not running?");
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className="min-h-screen bg-white flex">
      <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto h-screen">

        <div className="p-8">
          <div className="flex items-center space-x-2">
            <div className="w-20 h-20 flex items-center justify-center">
              <img src="/logo.png" alt="" />
            </div>
            <span className="text-4xl font-bold">Medusa</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Create Account</h1>
              <p className="text-gray-600">Join us and start your shopping journey</p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handlefetch} className="space-y-6">
              {/* Username Input */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    name='username'
                    value={form.username}
                    onChange={handleChange1}
                    placeholder="Enter your username"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
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
                    value={form.email}
                    onChange={handleChange1}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold mb-2">
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
                    value={form.password}
                    onChange={handleChange1}
                    placeholder="Create a password (min 6 characters)"
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

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirm_pass'
                    onChange={handleChange1}
                    placeholder="Confirm your password"
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 focus:border-black outline-none transition"

                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} className="text-gray-400 hover:text-black" />
                    ) : (
                      <Eye size={20} className="text-gray-400 hover:text-black" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex mt-3 items-start space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-1 border-2 border-gray-300"

                  disabled={loading}
                />
                <label className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="font-semibold text-black hover:underline">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-semibold text-black hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Register Button */}
              <button
                type='submit'
                disabled={loading}
                className={`w-full mt-4 bg-black text-white py-3 font-semibold hover:bg-gray-800 transition flex items-center justify-center space-x-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                {!loading && <ArrowRight size={20} />}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-600">OR SIGN UP WITH</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Alternative Sign Up Options */}
            <div className="space-y-3">
              <button className="w-full border-2 border-gray-300 py-3 font-semibold hover:border-black hover:bg-gray-50 transition flex items-center justify-center space-x-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button className="w-full border-2 border-gray-300 py-3 font-semibold hover:border-black hover:bg-gray-50 transition flex items-center justify-center space-x-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Continue with Facebook</span>
              </button>

              <button className="w-full border-2 border-gray-300 py-3 font-semibold hover:border-black hover:bg-gray-50 transition flex items-center justify-center space-x-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span>Continue with Apple</span>
              </button>
            </div>

            {/* Sign In Prompt */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="font-semibold text-black hover:underline">
                  Sign In
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
          <div className="text-8xl mb-8">🎁</div>
          <h2 className="text-5xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-300 mb-8">
            Create your account today and unlock exclusive benefits, personalized recommendations, and more.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white text-black flex items-center justify-center flex-shrink-0 font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-semibold mb-1">Personalized Experience</h3>
                <p className="text-gray-400">Get recommendations tailored just for you</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white text-black flex items-center justify-center flex-shrink-0 font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-semibold mb-1">Early Access to Sales</h3>
                <p className="text-gray-400">Be the first to know about special offers</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white text-black flex items-center justify-center flex-shrink-0 font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-semibold mb-1">Loyalty Rewards</h3>
                <p className="text-gray-400">Earn points with every purchase</p>
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