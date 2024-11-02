import React from "react";
import { motion } from "framer-motion";
import FiveStarts from "./FiveStarts";

const Card = ({ testimonialText, userName, userRole, userImage, userLink }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="h-full overflow-hidden rounded-3xl bg-white text-slate-500 shadow-2xl shadow-slate-200"
    >
      <div className="relative p-6">
        <figure className="relative z-10">
          <blockquote className="p-6 text-lg leading-relaxed">
            <p>{testimonialText}</p>
          </blockquote>
          <figcaption className="flex flex-col items-start gap-2 p-6 pt-0 text-sm text-emerald-500">
            <FiveStarts />
            <div className="flex items-center gap-4 pt-4 text-sm text-emerald-500">
              <img
                src={userImage}
                alt={userName}
                title={userName}
                width="48"
                height="48"
                className="max-w-full shrink-0 rounded-full"
              />
              <div className="flex flex-col gap-1">
                <span className="font-bold uppercase">{userName}</span>
                <cite className="not-italic">
                  <a href={userLink}>{userRole}</a>
                </cite>
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </motion.div>
  );
};

export default Card;
