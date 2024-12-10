import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">



<div className="area">
	<ul className="circles">
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>
</div>


     <button className="inline-flex h-12 hover:animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
  Shimmer
</button>
<a href="#_" className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
<span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">Button Text</span>
<span className="relative invisible">Button Text</span>
</a>
<button className="btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-indigo-100 rounded hover:bg-white group py-1.5 px-2.5">
      <span className="w-56 h-48 rounded bg-indigo-600 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
      <span className="relative w-full text-left text-indigo-600 transition-colors duration-300 ease-in-out group-hover:text-white">Button Hover</span>
      </button>

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