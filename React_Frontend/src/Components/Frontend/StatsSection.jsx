import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Card data array
  const cardsData = [
    {
      id: 1,
      count: 10,
      suffix: '+',
      label: 'YEARS',
      description: 'Professional Experience',
    },
    {
      id: 2,
      count: 300,
      suffix: '',
      label: 'PEOPLE',
      description: 'Employees in team',
    },
    {
      id: 3,
      count: 21,
      suffix: '',
      label: 'LOCATIONS',
      description: 'Sites in development',
    },
  ];

  // Framer Motion Variants for Animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6 },
    }),
  };

  return (
    <>
    <div className="flex justify-center items-center w-[90%] lg:w-[90%] ">
    <div
      ref={ref}
      className="bg-cover bg-center bg-no-repeat dark:bg-gray-900"
      style={{
        backgroundImage: "url('/path-to-your-background-image.jpg')", // Replace with actual path
      }}
    >
      <div className="flex justify-center items-center gap-5 lg:gap-12">
        {cardsData.map((card, index) => (
          <motion.div
            key={card.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative w-[400px] p-8 md:p-6 lg:p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
              {isInView && <CountUp start={0} end={card.count} duration={2} />}
              {card.suffix}
            </h2>
            <p className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300 mt-2">{card.label}</p>
            <p className="text-gray-600 dark:text-gray-400">{card.description}</p>
            <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-yellow-400 transform rotate-45 rounded"></div>
          </motion.div>
        ))}
      </div>
    </div>
    </div>
    </>
  );
};

export default StatsSection;
