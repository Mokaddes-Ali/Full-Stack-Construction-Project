
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const AboutSection = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/contact'); // Navigate to contact page or any other page
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-gradient-to-r from-blue-400 to-pink-500">
      <motion.div
        className="md:w-1/2 p-4"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="https://via.placeholder.com/400"
          alt="About Us"
          className="rounded shadow-lg"
        />
      </motion.div>
      <motion.div
        className="md:w-1/2 p-4"
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-white mb-4">About Us</h2>
        <h3 className="text-2xl font-semibold text-white mb-4">Crafting structures that last a lifetime</h3>
        <p className="text-white mb-4">
          Crafting structures that last a lifetime requires a holistic approach that integrates advanced materials, resilient design, regular maintenance, and sustainability practices. By learning from historical examples and leveraging modern technology.
        </p>
        <div className="bg-white text-blue-500 p-4 rounded shadow-lg hover:bg-blue-500 hover:text-white transition duration-300 mb-4">
          <p>Comprehensive Services, Advanced Technology, and Transparent Communication.</p>
        </div>
        <button
          onClick={handleButtonClick}
          className="bg-white text-blue-500 font-semibold py-2 px-4 rounded shadow hover:bg-blue-500 hover:text-white transition duration-300"
        >
          Get Free Quote
        </button>
        <p className="text-white mt-4">Call support center 24X7</p>
        <p className="text-white">+1 809 120 6705</p>
      </motion.div>
    </div>
  );
};

export default AboutSection;
