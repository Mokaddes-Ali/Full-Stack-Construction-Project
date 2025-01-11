import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaSignature } from 'react-icons/fa';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="w-full bg-cover bg-center bg-no-repeat py-16 sm:py-20 md:py-24 lg:py-32 px-6 md:px-8"
      style={{
        backgroundImage: "url('/path-to-your-background-image.jpg')", // Replace with actual path
      }}
    >
      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 md:gap-16 lg:gap-20 xl:gap-24">
        
        {/* Yellow Shape Design */}
        <div className="absolute w-56 sm:w-64 md:w-72 h-64 sm:h-72 md:h-80 bg-yellow-400 -z-10 transform -rotate-6 top-12 lg:top-16 left-6 md:left-8"></div>
        
        {/* Left Image Section */}
        <motion.div
          className="relative flex flex-col items-center lg:items-start space-y-4 md:space-y-6 lg:space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <img
            src="/path-to-your-main-image.jpg" // Replace with actual path
            alt="Main person"
            className="w-64 sm:w-72 md:w-80 h-80 sm:h-96 object-cover rounded-md shadow-lg"
          />
          <img
            src="/path-to-your-secondary-image.jpg" // Replace with actual path
            alt="Team at work"
            className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 object-cover rounded-md shadow-lg"
          />
        </motion.div>
        
        {/* Right Content Section */}
        <motion.div
          className="flex flex-col justify-start text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">WELCOME TO OUR COMPANY</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Constro Provides a Full Range of Services
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-lg mx-auto lg:mx-0">
            We successfully cope with tasks of varying complexity, provide long-term guarantees, and regularly master new
            technologies. Our portfolio includes dozens of successfully completed projects, from small houses to complex
            multi-story buildings. Building houses is our passion!
          </p>
          <div className="flex items-center justify-center lg:justify-start mt-4">
            <FaSignature className="text-3xl sm:text-4xl text-gray-700 dark:text-gray-300" />
            <p className="ml-2 text-gray-900 dark:text-white font-semibold text-lg sm:text-xl">Wallance Jennie</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
