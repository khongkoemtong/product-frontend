import React, { useState } from 'react';
import { ShoppingCart, Mail, Phone, MapPin, Clock, Send, MessageSquare, Facebook, Twitter, Instagram, Linkedin, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      detail: "support@medusa.com",
      subdDetail: "We'll respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      detail: "+1 (555) 123-4567",
      subdDetail: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      detail: "123 Commerce Street",
      subdDetail: "New York, NY 10013"
    },
    {
      icon: Clock,
      title: "Business Hours",
      detail: "Mon - Fri: 8am - 6pm",
      subdDetail: "Sat - Sun: 10am - 4pm"
    }
  ];

  const departments = [
    { name: "Sales", description: "Product inquiries and orders" },
    { name: "Support", description: "Technical assistance" },
    { name: "Returns", description: "Return and refund requests" },
    { name: "Partnership", description: "Business collaborations" }
  ];

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all products in original condition."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days. Express shipping is 2-3 days."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 15 countries worldwide. Shipping times vary by location."
    },
    {
      question: "How can I track my order?",
      answer: "You'll receive a tracking number via email once your order ships."
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
    

      {/* Hero Section */}
      <section className="bg-white  text-black py-20 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <MessageSquare className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-6xl font-bold mb-6 tracking-wider">GET IN TOUCH</h1>
          <p className="text-xl leading-relaxed">
            Have a question or feedback? We'd love to hear from you. Our team is here to help you with anything you need.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-black   py-16 px-8">
        <div className="max-w-7xl  mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="bg-white text-black border-2 border-white p-8 hover:bg-black hover:text-white transition-all duration-300">
                  <Icon className="w-12 h-12 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                  <p className="mb-1 font-semibold">{info.detail}</p>
                  <p className="text-sm opacity-70">{info.subdDetail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="bg-white text-black py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold mb-4">SEND US A MESSAGE</h2>
              <p className="mb-8 opacity-70">Fill out the form below and we'll get back to you as soon as possible.</p>
              
              {submitted && (
                <div className="bg-black text-white border-2 border-black p-4 mb-6 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6" />
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white border-2 border-black px-4 py-3 focus:outline-none focus:border-opacity-50 transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border-2 border-black px-4 py-3 focus:outline-none focus:border-opacity-50 transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white border-2 border-black px-4 py-3 focus:outline-none focus:border-opacity-50 transition"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full bg-white border-2 border-black px-4 py-3 focus:outline-none focus:border-opacity-50 transition resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-black text-white py-4 font-bold text-lg hover:bg-white hover:text-black border-2 border-black transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Send className="w-5 h-5" />
                  SEND MESSAGE
                </button>
              </div>
            </div>

            {/* Departments & Additional Info */}
            <div className="space-y-8">
              {/* Departments */}
              <div>
                <h3 className="text-3xl font-bold mb-6">DEPARTMENTS</h3>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="bg-black text-white border-2 border-black p-6 hover:bg-white hover:text-black transition-all duration-300">
                      <h4 className="text-xl font-bold mb-2">{dept.name}</h4>
                      <p className="opacity-80">{dept.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-3xl font-bold mb-6">FOLLOW US</h3>
                <div className="flex gap-4">
                  <button className="bg-black text-white border-2 border-black p-4 hover:bg-white hover:text-black transition-all duration-300">
                    <Facebook className="w-6 h-6" />
                  </button>
                  <button className="bg-black text-white border-2 border-black p-4 hover:bg-white hover:text-black transition-all duration-300">
                    <Twitter className="w-6 h-6" />
                  </button>
                  <button className="bg-black text-white border-2 border-black p-4 hover:bg-white hover:text-black transition-all duration-300">
                    <Instagram className="w-6 h-6" />
                  </button>
                  <button className="bg-black text-white border-2 border-black p-4 hover:bg-white hover:text-black transition-all duration-300">
                    <Linkedin className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-black py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="text-center mb-12 opacity-70">Find quick answers to common questions</p>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white text-black border-2 border-white p-6 hover:bg-black hover:text-white transition-all duration-300">
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="leading-relaxed opacity-80">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white text-black py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">VISIT OUR OFFICE</h2>
          <div className="bg-black text-white border-4 border-black h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4" />
              <p className="text-2xl font-bold mb-2">123 Commerce Street</p>
              <p className="opacity-70">New York, NY 10013</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t-2 border-white py-8 px-8">
        <div className="max-w-7xl mx-auto text-center">
        </div>
      </footer>
    </div>
  );
}