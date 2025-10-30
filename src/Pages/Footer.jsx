import React from 'react'

function Footer() {
  return (
    <div>
       <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">STOREFRONT</h3>
              <p className="text-gray-400 text-sm">Your trusted online shopping destination for quality products.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Shipping Info</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: support@storefront.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Shop St, City</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-4">Subscribe for exclusive deals</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="flex-1 px-4 py-2 bg-white text-black outline-none" />
                <button className="bg-gray-800 px-4 py-2 hover:bg-gray-700 transition">→</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2024 STOREFRONT. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
