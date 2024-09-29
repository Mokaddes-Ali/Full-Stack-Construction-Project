import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <p>Our post-construction services gives you peace of mind knowing that we are still here for you even after.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <h3 className="font-bold mb-2">Our Services</h3>
            <ul>
              <li><Link to="/services/building-construction" className="hover:text-orange-500 hover:underline">Building Construction</Link></li>
              <li><Link to="/services/architecture-design" className="hover:text-orange-500 hover:underline">Architecture Design</Link></li>
              <li><Link to="/services/building-renovation" className="hover:text-orange-500 hover:underline">Building Renovation</Link></li>
              <li><Link to="/services/flooring-roofing" className="hover:text-orange-500 hover:underline">Flooring & Roofing</Link></li>
              <li><Link to="/services/building-maintenance" className="hover:text-orange-500 hover:underline">Building Maintenance</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Company</h3>
            <ul>
              <li><Link to="/about" className="hover:text-orange-500 hover:underline">About Us</Link></li>
              <li><Link to="/services" className="hover:text-orange-500 hover:underline">Services</Link></li>
              <li><Link to="/blog" className="hover:text-orange-500 hover:underline">Blog</Link></li>
              <li><Link to="/faqs" className="hover:text-orange-500 hover:underline">Faqs</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 hover:underline">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Contact</h3>
            <p>+1 809 120 6705</p>
            <p>info@domain.com</p>
            <p>37 San Juan Lane Graaf Florisstraat 22A, 3021 CH</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="hover:text-orange-500"><FaInstagram /></a>
              <a href="https://facebook.com" className="hover:text-orange-500"><FaFacebookF /></a>
              <a href="https://twitter.com" className="hover:text-orange-500"><FaTwitter /></a>
              <a href="https://github.com" className="hover:text-orange-500"><FaGithub /></a>
              <a href="https://linkedin.com" className="hover:text-orange-500"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>Copyright © 2024 BuiltUp. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;