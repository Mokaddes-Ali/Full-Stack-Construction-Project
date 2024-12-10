import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import 'tailwindcss/tailwind.css';

const projects = [
  {
    title: "Aspen Heights",
    description: "A luxurious residential project located in the heart of the city.",
    image: "https://via.placeholder.com/300",
    hoverImage: "https://via.placeholder.com/300/FF0000"
  },
  {
    title: "Forest Hill Towers",
    description: "A modern commercial building with state-of-the-art facilities.",
    image: "https://via.placeholder.com/300",
    hoverImage: "https://via.placeholder.com/300/00FF00"
  },
  {
    title: "Bayside Residences",
    description: "Beautiful waterfront apartments with stunning views.",
    image: "https://via.placeholder.com/300",
    hoverImage: "https://via.placeholder.com/300/0000FF"
  },
  {
    title: "Parkview Plaza",
    description: "An industrial complex with advanced infrastructure.",
    image: "https://via.placeholder.com/300",
    hoverImage: "https://via.placeholder.com/300/FFFF00"
  }
];

const ProjectCard = ({ project }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2, // Adjusts how much of the card needs to be in view to trigger the animation
    triggerOnce: true, // Ensures the animation runs only once when the card first comes into view
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      className="relative group overflow-hidden rounded-lg shadow-lg"
      ref={ref} // Ref to track if the element is in view
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 }, // Hidden state before scrolling
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Visible state after scrolling into view
      }}
    >
      {/* Default image */}
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:opacity-0"
      />
      {/* Hover image */}
      <img
        src={project.hoverImage}
        alt={`${project.title} hover`}
        className="absolute inset-0 w-full h-64 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {/* Color overlay and content */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-white mb-4">{project.description}</p>
        <button className="bg-white text-black py-2 px-4 rounded flex items-center">
          Read More <span className="ml-2">→</span>
        </button>
      </motion.div>
    </motion.div>
  );
};

const OurProjects = () => {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Our Projects</h2>
          <p className="text-gray-700 dark:text-gray-300">Explore our diverse range of projects</p>
          <p className="text-gray-700 dark:text-gray-300">
            We specialize in a wide range of construction services, including residential, commercial, and industrial projects.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurProjects;
