import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import background from '../../assets/Images/background image.jpg'

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

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
    {
      id: 4,
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
    <div className="w-full bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${background})`
      }}>
    <div className="lg:w-[90%] w-[95%] mx-auto px-4 py-12 flex flex-col justify-between items-center gap-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white">Our Stats</h2>
    <div
      ref={ref}>
      <div className="w-full h-[350px] grid lg:grid-cols-4 md:grid-cols-2 grid-col-1 justify-center items-start gap-[20px] mt-[30px]">
        {cardsData.map((card, index) => (
          <motion.div
            key={card.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex lg:flex-col justify-center items-start gap-5 p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg text-center transform transition-transform duration-300 hover:scale-105"
          >
            <div className="">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
              {isInView && <CountUp start={0} end={card.count} duration={2} />}
              {card.suffix}
            </h2>
            </div>
            <div className="">
            <p className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300 mt-2">{card.label}</p>
            <p className="text-gray-600 dark:text-gray-400">{card.description}</p>
            </div>
            <div className="absolute ml-36 w-16 h-16 bg-yellow-400 transform rotate-45 rounded"></div>
          </motion.div>
        ))}
      </div>
    </div>
    </div>
    </div>
    </>
  );
};

export default StatsSection;
