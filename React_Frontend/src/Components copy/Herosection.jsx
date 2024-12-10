import { useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hero1 from "../assets/Images/hero.jpg";
import hero2 from "../assets/Images/hero2.jpg";
import Sideimage1 from "../assets/Images/hero logo.png";



const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  const cards = [
    {
      backgroundImage: hero1,
      rightSideImage: Sideimage1,
      cardImage: hero1,
      title: "Card Title 1",
      description: "Description for card 1.",
      buttonText: "Button 1",
      buttonColor: "bg-blue-600",
      buttonHoverColor: "hover:bg-blue-700",
    },
    {
      backgroundImage: hero2,
      rightSideImage: Sideimage1,
      cardImage: hero2,
      title: "Card Title 2",
      description: "Description for card 2.",
      buttonText: "Button 2",
      buttonColor: "bg-green-600",
      buttonHoverColor: "hover:bg-green-700",
    },
  ];

  return (
    <div className="relative w-screen h-[450px] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover h-96 bg-center"
        style={{
          backgroundImage: `url(${cards[currentSlide].backgroundImage})`,
          backgroundColor: "rgba(0, 0, 1, 0.5)", // Add black overlay with 50% opacity
          backgroundBlendMode: "overlay", // Blend the black color with the background image
        }}
        initial={{ scale: 1 }}
        animate={{ scale: currentSlide === 0 ? 1.1 : 1 }} // Only zoom when current slide is active
        transition={{ duration: 2 }}
      />
        
      <div className="relative z-10 flex flex-col items-start justify-center h-full p-8 lg:p-16">
        <h1 className="text-4xl font-bold text-white lg:text-6xl">
          {cards[currentSlide].title}
        </h1>
        <p className="mt-4 text-lg text-white lg:text-2xl">
          {cards[currentSlide].description}
        </p>
        <button
          className={`px-6 py-3 mt-8 text-lg font-semibold text-white ${cards[currentSlide].buttonColor} rounded-lg ${cards[currentSlide].buttonHoverColor}`}
        >
          {cards[currentSlide].buttonText}
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center justify-center w-full lg:w-1/2">
        <img
          src={cards[currentSlide].rightSideImage}
          alt={`Right Side ${currentSlide + 1}`}
        className="w-60 h-60 object-cover rounded-full animate-imgRotate "
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4">
        <Slider {...settings} className="w-full max-w-4xl">
          {cards.map((card, index) => (
            <div key={index} className="p-4 -mb-44 bg-black">
              <img
                src={card.cardImage}
                alt={`Card ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg bg-black"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HeroSection;

