import { ChevronRight, Cpu, Box, Truck, BarChart3, Shield, CheckCircle2, Globe2, Clock, Users, ArrowRight, Mail, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const features = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Electronics Focused",
      description: "Specialized tracking and handling for sensitive electronic components with temperature and humidity monitoring.",
    },
    {
      icon: <Box className="w-6 h-6" />,
      title: "Smart Inventory",
      description: "AI-powered inventory management with predictive reordering and real-time stock alerts.",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "End-to-End Tracking",
      description: "Complete supply chain visibility with IoT integration and blockchain verification.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Machine learning-driven insights and customizable dashboards for informed decision-making.",
    },
  ];

  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
    { value: "150+", label: "Partners" },
    { value: "50M+", label: "Shipments Tracked" },
  ];

  const benefits = [
    "Real-time inventory tracking and alerts",
    "Automated supplier management",
    "Custom reporting and analytics",
    "Integration with existing ERP systems",
    "Mobile app for on-the-go management",
    "24/7 technical support",
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10"></div>
        <div className="container mx-auto px-6 py-32 relative">
          <motion.div 
            className="flex flex-col items-center text-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.h1 
              className="text-6xl font-bold mb-6 tracking-tight"
              variants={fadeInUpVariants}
            >
              Transform Your Supply Chain
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 max-w-2xl text-blue-100"
              variants={fadeInUpVariants}
            >
              Next-generation supply chain management platform built specifically for the electronics industry.
              Streamline operations, reduce costs, and gain real-time insights.
            </motion.p>
            <motion.div 
              className="flex gap-4"
              variants={fadeInUpVariants}
            >
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold
                         flex items-center gap-2 hover:bg-blue-50 transition-colors"
              >
                Get Started <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold
                         flex items-center gap-2 hover:bg-white/10 transition-colors"
              >
                Watch Demo <Play className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Stats Section */}
        <div className="bg-white/10 backdrop-blur-lg border-t border-white/20">
          <div className="container mx-auto px-6 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-4">Why Choose NexChain?</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Our platform combines cutting-edge technology with industry expertise to deliver
          a comprehensive supply chain solution.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="p-6 border rounded-lg hover:shadow-lg transition-all hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-6">Everything You Need</h2>
              <p className="text-gray-600 mb-8">
                NexChain provides a complete suite of tools to manage your entire supply chain
                process, from procurement to delivery.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle2 className="text-green-500 w-5 h-5" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Platform Interface" 
                  className="rounded-lg w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-6">Trusted by Industry Leaders</h2>
              <p className="text-gray-600 mb-8">
                Join hundreds of electronics manufacturers and distributors who trust
                NexChain for their supply chain management needs.
              </p>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Shield className="text-blue-600 w-6 h-6" />
                  <span className="text-gray-700">Enterprise-grade security</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Globe2 className="text-blue-600 w-6 h-6" />
                  <span className="text-gray-700">Global infrastructure</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Clock className="text-blue-600 w-6 h-6" />
                  <span className="text-gray-700">99.9% uptime guaranteed</span>
                </motion.div>
              </div>
            </motion.div>
            <div className="md:w-1/2 grid grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <motion.div 
                  key={i} 
                  className="bg-white p-8 rounded-lg shadow-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of companies already modernizing their supply chain with NexChain.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-6 py-3 rounded-lg text-gray-900 w-full sm:w-auto"
              />
              <button
                onClick={() => navigate('/signup')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold
                         flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
              >
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-blue-100">
              Free 14-day trial · No credit card required
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
<div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 NexChain. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full">
            <div className="flex justify-end">
              <button onClick={() => setIsVideoModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

