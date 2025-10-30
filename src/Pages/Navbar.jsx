import React, { useEffect, useState, useRef } from 'react';
import { ShoppingCart, Search, Menu, X, User, LogOut, UserCircle, Package, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [account, setAccount] = useState(null);
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [mobileAccountDropdown, setMobileAccountDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load user account
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) setAccount(JSON.parse(user));
    else setAccount(null);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAccount(null);
    setAccountDropdown(false);
    setMobileAccountDropdown(false);
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* Fixed Navbar */}
      <header className={`fixed top-3 left-1/2 transform -translate-x-1/2 w-[90%] z-50 rounded-4xl bg-white transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/public/logo.png" alt="Storefront Logo" className="w-[80px] h-[80px] object-contain" />
            <span className="text-2xl font-bold text-black">Medusa</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-[18px]">
            <Link to="/" className="text-gray-700 hover:text-black transition font-medium">Home</Link>
            <Link to="/product" className="text-gray-700 hover:text-black transition font-medium">Products</Link>
            <Link to="/about" className="text-gray-700 hover:text-black transition font-medium">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-black transition font-medium">Contact</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="flex items-center space-x-4">

            {/* Mobile Search */}
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition" onClick={() => setSearchOpen(!searchOpen)}>
              <Search size={20} className="text-black" />
            </button>

            {/* Account / Auth Buttons */}
            {account ? (
              <div className="hidden md:block " ref={dropdownRef}>
                <button
                  onClick={() => setAccountDropdown(!accountDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-black bg-white hover:bg-gray-50 transition"
                >
                  <UserCircle size={20} />
                  <span className="text-md font-medium">{account.name || account.email}</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${accountDropdown ? 'rotate-180' : ''}`} />
                </button>

                {accountDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-fadeIn">
                    <Link to="/profile" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition" onClick={() => setAccountDropdown(false)}>
                      <User size={18} /><span>My Profile</span>
                    </Link>
                    <Link to="/orders" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition" onClick={() => setAccountDropdown(false)}>
                      <Package size={18} /><span>My Orders</span>
                    </Link>
                    <hr className="my-2 border-gray-200" />
                    <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition w-full text-left text-red-600">
                      <LogOut size={18} /><span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg border border-black bg-white hover:bg-black hover:text-white transition">
                    <User size={18} /><span className="text-md font-medium">Login</span>
                  </button>
                </Link>
                <Link to="/register">
                  <button className="hidden md:block bg-black text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black border border-black transition">
                    <span className="text-md font-medium">Register</span>
                  </button>
                </Link>
              </>
            )}

            {/* Cart */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
              <ShoppingCart size={30} className="text-black" />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">0</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="lg:hidden px-4 pb-2">
            <div className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-3 focus-within:border-black focus-within:ring-2 focus-within:ring-gray-200 transition">
              <Search size={18} className="text-gray-500 mr-2" />
              <input type="text" placeholder="Search products..." className="outline-none bg-transparent flex-1 text-sm" autoFocus />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden px-4 pb-4 space-y-2 border-t border-gray-300 pt-4">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition">Home</Link>
            <Link to="/product" onClick={() => setMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition">Products</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition">About</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition">Contact</Link>

            {/* Mobile Account */}
            <div className="pt-4 border-t border-gray-300 mt-4">
              {account ? (
                <div className="space-y-2">
                  <button onClick={() => setMobileAccountDropdown(!mobileAccountDropdown)} className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="flex items-center space-x-2">
                      <UserCircle size={20} />
                      <span className="font-medium">{account.name || account.email}</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${mobileAccountDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileAccountDropdown && (
                    <div className="space-y-1 pl-2 animate-fadeIn">
                      <Link to="/profile" onClick={() => { setMobileAccountDropdown(false); setMenuOpen(false); }} className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                        <User size={18} /><span>My Profile</span>
                      </Link>
                      <Link to="/orders" onClick={() => { setMobileAccountDropdown(false); setMenuOpen(false); }} className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                        <Package size={18} /><span>My Orders</span>
                      </Link>
                      <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition w-full text-left text-red-600">
                        <LogOut size={18} /><span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login">
                    <button className="w-full flex items-center justify-center space-x-2 border border-black bg-white px-4 py-2 rounded-lg hover:bg-black hover:text-white transition">
                      <User size={18} /><span className="font-medium">Login</span>
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black border border-black transition font-medium">
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </header>

      {/* Spacer so content doesn't hide under navbar */}
      <div className="h-[120px]"></div>
    </>
  );
}

export default Navbar;
