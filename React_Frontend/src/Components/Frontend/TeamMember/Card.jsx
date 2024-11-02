import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Card = ({ image, name, designation }) => {
  return (
    <>

    <div className="bg-white rounded-lg shadow-lg h-80 hover:h-[350px] overflow-hidden relative group transition-all duration-300">
      {/* Image Container */}
      <motion.div className="relative" whileHover={{ scale: 1.1 }}>
        {/* Image */}
        <div className="flex justify-center items-center">
          <div className="w-56 h-56 border-4 border-white rounded-full overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
            />
          </div>
        </div>
      </motion.div>

      {/* Text Container */}
      <div className="text-center py-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-500">{designation}</p>
      </div>

      {/* Icons - shown only on hover */}
      <motion.div
        className="absolute inset-x-0 -bottom-12 flex justify-center items-center bg-white shadow-lg transition-all duration-300 
        opacity-0 group-hover:opacity-100 h-0 group-hover:h-12 p-2"
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex space-x-4 text-gray-600">
          <a href="#" className="text-lg bg-primary rounded-full h-12 w-11 hover:text-blue-600">
            <FaFacebookF className="h-16 w-8 text-white pl-3" />
          </a>
          <a href="#" className="text-lg bg-primary rounded-full h-12 w-11 hover:text-blue-400">
            <FaTwitter className="h-16 w-8 text-white pl-3" />
          </a>
          <a href="#" className="text-lg bg-primary rounded-full h-12 w-11 hover:text-pink-500">
            <FaInstagram className="h-16 w-8 text-white pl-3" />
          </a>
        </div>
      </motion.div>
    </div>

    </>
  )
}

export default Card