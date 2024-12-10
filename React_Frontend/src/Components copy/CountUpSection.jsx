import { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Fade, Zoom } from "react-awesome-reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate, faSmile, faBook, faChalkboardTeacher, faHeart, faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const CountUpSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const stats = [
    { icon: faUserGraduate, count: 550, suffix: "+", label: "STUDENTS ENROLLED" },
    { icon: faSmile, count: 100, suffix: "%", label: "SATISFACTION RATE" },
    { icon: faBook, count: 300, suffix: "+", label: "Academic Programs" },
    { icon: faChalkboardTeacher, count: 150, suffix: "+", label: "ONLINE INSTRUCTOR" },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className="relative w-full min-h-screen p-8 bg-cover bg-center dark:bg-gray-900"
      style={{
        backgroundImage: `url(${
          document.documentElement.classList.contains('dark')
            ? '/path/to/your/dark-background-image.jpg'
            : '/path/to/your/light-background-image.jpg'
        })`,
      }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            document.documentElement.classList.contains('dark')
              ? '/path/to/your/dark-shape-image.png'
              : '/path/to/your/light-shape-image.png'
          })`,
        }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <Fade cascade>
          <h2 className="text-4xl font-bold text-white dark:text-gray-200 mb-8">Our Achievements</h2>
        </Fade>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Zoom cascade key={index} triggerOnce={true} delay={index * 100}>
              <div
                className={`flex flex-col items-center p-6 rounded-lg shadow-lg transition-all duration-300 ${
                  hoveredIndex === index
                    ? "bg-blue-600 text-white dark:bg-blue-800"
                    : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <FontAwesomeIcon
                  icon={stat.icon}
                  className={`text-4xl mb-4 transition-colors duration-300 ${
                    hoveredIndex === index ? "text-yellow-400" : "text-blue-600 dark:text-blue-400"
                  }`}
                />
                {inView && (
                  <CountUp
                    start={0}
                    end={stat.count}
                    duration={2.5}
                    suffix={stat.suffix}
                    className={`text-4xl font-bold transition-colors duration-300 ${
                      hoveredIndex === index ? "text-yellow-400" : "text-blue-600 dark:text-blue-400"
                    }`}
                  />
                )}
                <p className="mt-2 text-lg font-semibold">{stat.label}</p>
                {hoveredIndex === index && (
                  <div className="flex space-x-4 mt-4">
                    <FontAwesomeIcon icon={faHeart} className="text-red-500 text-2xl cursor-pointer" />
                    <FontAwesomeIcon icon={faThumbsUp} className="text-green-500 text-2xl cursor-pointer" />
                    <FontAwesomeIcon icon={faThumbsDown} className="text-red-500 text-2xl cursor-pointer" />
                  </div>
                )}
              </div>
            </Zoom>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountUpSection;