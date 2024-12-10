import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'tailwindcss/tailwind.css';

const services = [
  {
    title: "Residential Construction",
    text: "We provide top-notch residential construction services.",
    image: "https://via.placeholder.com/300"
  },
  {
    title: "Commercial Construction",
    text: "Our commercial construction services are second to none.",
    image: "https://via.placeholder.com/300"
  },
  {
    title: "Industrial Construction",
    text: "We specialize in industrial construction projects.",
    image: "https://via.placeholder.com/300"
  },
  {
    title: "Interior Design",
    text: "Our interior design services will transform your space.",
    image: "https://via.placeholder.com/300"
  },
  {
    title: "Project Management",
    text: "We offer comprehensive project management services.",
    image: "https://via.placeholder.com/300"
  },
  {
    title: "Logistics Coordination",
    text: "Our logistics coordination ensures smooth project execution.",
    image: "https://via.placeholder.com/300"
  }
];

const ServiceCard = ({ service }) => (
  <motion.div
    className="relative group"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <img src={service.image} alt={service.title} className="w-full h-64 object-cover" />
    <motion.div
      className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3 className="text-white text-xl font-bold mb-2">{service.title}</h3>
      <p className="text-white mb-4">{service.text}</p>
      <button className="bg-white text-black py-2 px-4 rounded">Read More</button>
    </motion.div>
  </motion.div>
);

const NextArrow = ({ onClick }) => (
  <button
    className="text-orange-500 absolute top-1/2 right-0 transform -translate-y-1/2 z-10"
    onClick={onClick}
  >
    Next
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="text-orange-500 absolute top-1/2 left-0 transform -translate-y-1/2 z-10"
    onClick={onClick}
  >
    Previous
  </button>
);

const ServicesSection = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
          Our Services
        </h2>
        <Slider {...settings}>
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ServicesSection;