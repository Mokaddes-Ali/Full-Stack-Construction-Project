import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBuilding, FaCity, FaCertificate } from 'react-icons/fa';

const features = [
  {
    id: 1,
    icon: <FaBuilding size={40} />,
    title: 'Core Planning',
    description: 'Lorem ipsum dolor sit amet, consectne auctor aliquet. Aenean sollicitudi bibendum auctor.',
  },
  {
    id: 2,
    icon: <FaCity size={40} />,
    title: 'Traditional Designs',
    description: 'Lorem ipsum dolor sit amet, consectne auctor aliquet. Aenean sollicitudi bibendum auctor.',
  },
  {
    id: 3,
    icon: <FaCertificate size={40} />,
    title: 'Quality Materials',
    description: 'Lorem ipsum dolor sit amet, consectne auctor aliquet. Aenean sollicitudi bibendum auctor.',
  },
];

const InnerAbout = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  return (
    <div ref={ref} className="w-screen bg-black">
        <div className="flex flex-col mx-auto max-w-7xl items-center justify-center py-12 bg-white dark:bg-gray-900">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl px-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-yellow-400 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="text-yellow-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{feature.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default InnerAbout;
