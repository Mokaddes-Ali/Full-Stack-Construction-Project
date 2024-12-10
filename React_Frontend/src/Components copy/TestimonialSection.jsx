import React, { useState } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'tailwindcss/tailwind.css';

const testimonials = [
  {
    id: 1,
    text: "I love the fitness apparel and gear I purchased from this site. The quality is exceptional and the prices are unbeatable.",
    name: "Sheryl Berge",
    image: "https://randomuser.me/api/portraits/men/15.jpg"
  },
  {
    id: 2,
    text: "As a professional athlete, I rely on high-performance gear for my training. This site offers a great selection of top-notch products.",
    name: "Leland Kiehn",
    image: "https://randomuser.me/api/portraits/women/15.jpg"
  },
  {
    id: 3,
    text: "The fitness apparel I bought here fits perfectly and feels amazing. I highly recommend this store to anyone looking for quality gear.",
    name: "Peter Renolds",
    image: "https://randomuser.me/api/portraits/men/10.jpg"
  },
];

const TestimonialCard = ({ testimonial, isSecondPosition }) => (
  <motion.div
    id={`testimonial-${testimonial.id}`}
    className={`relative group p-6 rounded-2xl shadow-xl transition-all duration-300 
    ${isSecondPosition ? 'bg-orange-500 border-red-500 text-white' : 'bg-white text-slate-900'}`}
    whileHover={{ backgroundColor: isSecondPosition ? '#ffed4a' : '#f3f4f6', color: isSecondPosition ? '#000' : '#1f2937' }}
  >
    <blockquote className="relative">
      <p className="text-lg tracking-tight">{testimonial.text}</p>
    </blockquote>
    <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
      <div>
        <div className="font-display text-base">{testimonial.name}</div>
      </div>
      <div className="overflow-hidden rounded-full bg-slate-50">
        <img alt="" className="h-14 w-14 object-cover" src={testimonial.image} />
      </div>
    </figcaption>
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

const TestimonialSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setActiveSlide(next), // Update active slide
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
    <section id="testimonials" aria-label="What our customers are saying" className="bg-slate-50 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">What Our Customers Are Saying</h2>
        </div>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              isSecondPosition={(index + activeSlide) % 3 === 1}  // Check if it's in 2nd position
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialSection;
