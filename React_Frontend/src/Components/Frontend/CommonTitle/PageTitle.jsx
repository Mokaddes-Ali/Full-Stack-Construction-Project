// import { Component, Fragment } from 'react';
// import { motion } from 'framer-motion';

// class PageTitle extends Component {
//     render() {
//         return (
//             <Fragment>
//                 <div className="relative w-[90%] lg:w-[80%] min-h-[300px] bg-fixed bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://themewagon.github.io/restoran/img/bg-hero.jpg')" }}>
//                     <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center">
//                         <motion.h1
//                             className="text-white text-4xl font-bold tracking-wide mb-4"
//                             initial={{ opacity: 0, y: -100 }}   
//                             animate={{ opacity: 1, y: 0 }}   
//                             transition={{ duration: 1.25 }}     
//                         >
//                             {this.props.PageTitle}
//                         </motion.h1>
//                         <motion.h1
//                             className="text-white text-4xl font-bold tracking-wide"
//                             initial={{ opacity: 0, x: -100 }}  // Change y to x for left entrance
//                             animate={{ opacity: 1, x: 0 }}     
//                             transition={{ duration: 1.25 }}     
//                         >
//                             Home/About {this.props.PageTitle1}
//                         </motion.h1>
//                     </div>
//                 </div>
//             </Fragment>
//         );
//     }
// }

// export default PageTitle;
import { Fragment } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";

export default function PageTitle({ PageTitle, PageTitle1, bgImage }) {
  const location = useLocation(); 

  return (
    <>
      <div
        className="relative min-h-[300px] bg-fixed bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="container">
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center">
          {/* Title 1 */}
          <motion.h1
            className="text-white text-4xl font-bold tracking-wide mb-4"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.25 }}
          >
            {PageTitle}
          </motion.h1>

          {/* Title 2 */}
          <motion.h1
            className="text-white text-3xl font-semibold tracking-wide mb-2"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.25 }}
          >
            {PageTitle1}
          </motion.h1>

          {/* Home + Current Page URL */}
          <motion.h1
            className="text-white text-2xl font-medium tracking-wide flex items-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.25 }}
          >
            <Link to="/" className="hover:text-gray-400 transition-all duration-300">
              Home
            </Link>
            <span className="mx-2">/</span> 
            {location.pathname.replace("/", "") || "Home"}
          </motion.h1>
        </div>
      </div>
      </div>
    </>
  );
}
