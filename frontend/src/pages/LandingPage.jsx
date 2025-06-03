import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaBriefcase, FaPalette, FaChartLine } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Your Professional
            <span style={{ color: '#4F3B78' }}> Portfolio</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Showcase your work, attract clients, and grow your freelance business with our powerful portfolio builder.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
              style={{ backgroundColor: '#4F3B78', hover: { backgroundColor: '#6B4F9E' } }}
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white px-8 py-3 rounded-lg font-semibold border-2 transition duration-300"
              style={{ color: '#4F3B78', borderColor: '#4F3B78', hover: { backgroundColor: '#F5F3FF' } }}
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Everything You Need to Succeed
          </motion.h2>
          <div className="flex flex-col gap-12">
            {/* 1st Card: Card left, Image right */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <Feature
                  icon={<FaBriefcase className="w-6 h-6" />}
                  title="Project Showcase"
                  description="Display your best work with beautiful project cards and detailed descriptions."
                />
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <img src="/images/L1.jpg" alt="Showcase" className="rounded-2xl shadow-lg max-h-72 object-cover" />
              </div>
            </div>
            {/* 2nd Card: Image left, Card right */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="w-full md:w-1/2">
                <Feature
                  icon={<FaPalette className="w-6 h-6" />}
                  title="Customizable Design"
                  description="Choose from multiple themes and customize colors to match your personal brand."
                />
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <img src="/images/L2.jpg" alt="Customizable Design" className="rounded-2xl shadow-lg max-h-72 object-cover" />
              </div>
            </div>
            {/* 3rd Card: Card left, Image right */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <Feature
                  icon={<FaChartLine className="w-6 h-6" />}
                  title="Analytics"
                  description="Track portfolio views and engagement to optimize your online presence."
                />
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <img src="/images/L3.jpg" alt="Analytics" className="rounded-2xl shadow-lg max-h-72 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-purple-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Freelancers
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful freelancers who've built their online presence with us.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <Testimonial
                key={review._id}
                quote={review.quote}
                author={review.user.name}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white rounded-2xl p-12 text-center max-w-4xl mx-auto"
            style={{ backgroundColor: '#4F3B78' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Showcase Your Work?
            </h2>
            <p className="text-xl mb-8">
              Create your professional portfolio in minutes and start attracting clients today.
            </p>
            <Link
              to="/register"
              className="bg-white px-8 py-3 rounded-lg font-semibold transition duration-300 inline-block"
              style={{ color: '#4F3B78', hover: { backgroundColor: '#F5F3FF' } }}
            >
              Get Started for Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Portfolio Builder</h3>
              <p className="text-gray-400">Build your professional presence online</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-purple-400 transition duration-300">
                <FaGithub className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-purple-400 transition duration-300">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Portfolio Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature Component
function Feature({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
    >
      <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#F5F3FF', color: '#4F3B78' }}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

// Testimonial Component
function Testimonial({ quote, author }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <p className="text-gray-600 mb-4 italic">"{quote}"</p>
      <div>
        <p className="font-semibold text-gray-900">{author}</p>
      </div>
    </motion.div>
  );
}

export default LandingPage; 