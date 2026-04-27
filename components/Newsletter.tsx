// components/Newsletter.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="bg-cream px-[48px] py-[120px] w-full flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center text-center w-full max-w-2xl"
      >
        <div className="text-gold text-[10px] tracking-[0.25em] uppercase mb-6">
          Stay in the know
        </div>
        
        <h2 className="font-display font-light text-[clamp(36px,5vw,64px)] text-black leading-tight mb-4">
          Join the <span className="italic">Inner Circle</span>
        </h2>
        
        <p className="text-[14px] text-muted mb-10">
          Early access. Exclusive drops. No spam, ever.
        </p>

        {isSubmitted ? (
          <div className="text-[15px] text-black font-medium py-[14px]">
            ✓ Welcome to the Inner Circle!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center w-full justify-center gap-4 sm:gap-0"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full sm:w-[320px] bg-transparent border-[0.5px] border-[rgba(0,0,0,0.15)] px-[24px] py-[14px] text-[13px] text-black placeholder:text-muted focus:outline-none focus:border-black transition-colors rounded-none"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-black text-white px-[32px] py-[14px] text-[12px] uppercase tracking-[0.12em] hover:bg-gold hover:text-black transition-colors rounded-none border-[0.5px] border-black hover:border-gold"
            >
              Subscribe
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}