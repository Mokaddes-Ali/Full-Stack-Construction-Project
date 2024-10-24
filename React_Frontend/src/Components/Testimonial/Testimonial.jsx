import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import { motion } from "framer-motion"; // Importing Framer Motion
import Card from "./Card";

const testimonialsData = [
  {
    testimonialText:
      "Wind-ui, is probably one of the best libraries I've come across. Good looking, easy to use and above all super accessible.",
    userName: "Bill Gates",
    userRole: "CEO, Microsoft",
    userImage: "https://i.pravatar.cc/40?img=11",
    userLink: "http://www.microsoft.com",
  },
  {
    testimonialText:
      "Wind-ui components come with proper attributes to ensure full accessibility with the WAI-ARIA standards.",
    userName: "Jane Smith",
    userRole: "WAI-ARIA, Representative",
    userImage: "https://i.pravatar.cc/40?img=25",
    userLink: "http://www.w3.org/WAI/ARIA/",
  },
  {
    testimonialText:
      "You can easily communicate with Wind-ui's team for support through their discord channel. They are responsive and ultra helpful guys!",
    userName: "Arnold Jones",
    userRole: "Software Engineer",
    userImage: "https://i.pravatar.cc/40?img=7",
    userLink: "https://discord.com/",
  },
];

const Testimonial = () => {
  useEffect(() => {
    const slider = new Glide(".glide-08", {
      type: "carousel",
      focusAt: 1,
      animationDuration: 4000,
      autoplay: 4500,
      autoplay: true,
      rewind: true,
      perView: 3,
      gap: 48,
      classes: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
      breakpoints: {
        1024: {
          perView: 2,
        },
        640: {
          perView: 1,
        },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);

  return (
    <>
    <div className="mx-auto max-w-7xl bg-blue-gray-300">
          <div className="mx-auto w-max-7xl relative overflow-hidden py-16">
      {/* Background Scrolling Text */}
      <motion.div
        className="absolute top-0 left-0 w-screen h-full flex flex-col items-center justify-center overflow-hidden space-y-10"
        animate={{ y: [100, -100] }} // Framer Motion animation
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        style={{ zIndex: 1, opacity: 0.3 }}
      >
        <span className="text-8xl font-bold text-gray-200">Testimonials</span>
      </motion.div>

      {/* Section Content */}
      <div className="relative z-10 text-center mb-12">
        <h2 className="text-3xl font-bold text-black mb-4">Testimonials</h2>
        <h3 className="text-xl font-medium text-gray-900 mb-4">
          What people are saying about us
        </h3>
        <p className="text-gray-900 max-w-xl mx-auto">
          We specialize in a wide range of construction services, including
          residential, commercial, and industrial projects.
        </p>
      </div>

      {/* Testimonial Carousel */}
      <div className="glide-08 relative w-screen z-10">
        <div data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0 pb-12">
            {testimonialsData.map((data, index) => (
              <li className="px-2" key={index}>
                <Card
                  testimonialText={data.testimonialText}
                  userName={data.userName}
                  userRole={data.userRole}
                  userImage={data.userImage}
                  userLink={data.userLink}
                />
              </li>
            ))}
          </ul>
        </div>
        {/* Indicators */}
        <div
          className="-mt-6 flex w-full items-center justify-center gap-2"
          data-glide-el="controls[nav]"
        >
          <button
            className="group p-4"
            data-glide-dir="=0"
            aria-label="goto slide 1"
          >
            <span className="block h-2 w-2 rounded-full bg-white/20 opacity-70 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
          </button>
          <button
            className="group p-4"
            data-glide-dir="=1"
            aria-label="goto slide 2"
          >
            <span className="block h-2 w-2 rounded-full bg-white/20 opacity-70 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
          </button>
          <button
            className="group p-4"
            data-glide-dir="=2"
            aria-label="goto slide 3"
          >
            <span className="block h-2 w-2 rounded-full bg-white/20 opacity-70 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
          </button>
        </div>
      </div>
    </div>
    </div>
    </>

  );
};

export default Testimonial;
