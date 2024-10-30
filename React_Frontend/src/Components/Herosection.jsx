// import { useState } from "react";
// import { motion } from "framer-motion";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import hero1 from "../assets/Images/hero.jpg";
// import hero2 from "../assets/Images/hero2.jpg";
// import Sideimage1 from "../assets/Images/hero logo.png";
// import NavbarSection from "./Navbar/NavbarSection";



// const HeroSection = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     arrows: false,
//     beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
//   };

//   const cards = [
//     {
//       backgroundImage: hero1,
//       rightSideImage: Sideimage1,
//       cardImage: hero1,
//       title: "Card Title 1",
//       description: "Description for card 1.",
//       buttonText: "Button 1",
//       buttonColor: "bg-blue-600",
//       buttonHoverColor: "hover:bg-blue-700",
//     },
//     {
//       backgroundImage: hero2,
//       rightSideImage: Sideimage1,
//       cardImage: hero2,
//       title: "Card Title 2",
//       description: "Description for card 2.",
//       buttonText: "Button 2",
//       buttonColor: "bg-green-600",
//       buttonHoverColor: "hover:bg-green-700",
//     },
//   ];

//   return (
//     <>
//   <div className="h-[600px] bg-red-300  w-screen">
//     <div className="relative flex mx-auto  max-w-7xl h-[500px]">
//       <motion.div
//         className="absolute inset-0 bg-cover h-[450px] bg-center"
//         style={{
//           backgroundImage: `url(${cards[currentSlide].backgroundImage})`,
//           backgroundColor: "rgba(0, 0, 1, 0.5)", // Add black overlay with 50% opacity
//           backgroundBlendMode: "overlay", // Blend the black color with the background image
//         }}
//         initial={{ scale: 1 }}
//         animate={{ scale: currentSlide === 0 ? 1.1 : 1 }} // Only zoom when current slide is active
//         transition={{ duration: 1 }}
//       />
        
//       <div className="relative z-10 flex  items-start justify-center h-full p-8 lg:p-16">
//         <h1 className="text-4xl font-bold text-white lg:text-6xl">
//           {cards[currentSlide].title}
//         </h1>
//         <p className="mt-4 text-lg text-white lg:text-2xl">
//           {cards[currentSlide].description}
//         </p>
//         <button
//           className={`px-6 py-3 mt-8 text-lg font-semibold text-white ${cards[currentSlide].buttonColor} rounded-lg ${cards[currentSlide].buttonHoverColor}`}
//         >
//           {cards[currentSlide].buttonText}
//         </button>
//       </div>
//       <div className="absolute  bottom-0 left-0 right-0 flex justify-center items-center ml-60">
//         <Slider {...settings} className="w-full max-w-4xl">
//           {cards.map((card, index) => (
//             <div key={index} className="p-4">
//               <img
//                 src={card.cardImage}
//                 alt={`Card ${index + 1}`}
//                 className="w-[500px] h-48 -mb-14 bg-cover bg-center rounded-lg"
//               />
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//     </div>
//     </>
//   );
// };

// export default HeroSection;

// import React from 'react';
// import { BackgroundLines } from "../Components/Ui/background-lines";

// const Herosection = () => {
//   return (
//     <>
//       (<BackgroundLines
//         className="flex items-center justify-center w-full flex-col"
//       >
//         <h2
//           className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600
//            dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight"
//         >
//           Sanjana Airlines, <br /> Sajana Textiles.
//         </h2>
//         <p
//           className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center"
//         >
//           Get the best advices from our experts, including expert artists,
//           painters, marathon enthusiasts and RDX, totally free.
//         </p>
//       </BackgroundLines>)
//     </>
//   );
// };

// export default Herosection;



import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../Components/Ui/images-slider";

const Herosection = () => {
  const images = [
    "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p
          className="text-red-800 text-2xl md:text-4xl lg:text-6xl font-bold text-center"
        >
          The hero section slideshow <br /> nobody asked for
        </motion.p>
        <button
          className="px-4 py-2 bg-black border  text-white mx-auto text-center rounded-full relative mt-4"
        >
          <span>Join now →</span>
          <div
            className="absolute top-0 right-0 -mt-1 -mr-1 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center"
          />
        </button>
      </motion.div>
    </ImagesSlider>
  );
};

export default Herosection;

