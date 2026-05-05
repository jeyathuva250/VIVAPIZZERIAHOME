"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";
import Link from "next/link";

interface PremiumButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline" | "dark";
}

export const PremiumButton = ({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
}: PremiumButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the magnetic movement
  const springConfig = { stiffness: 100, damping: 25 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Magnetic intensity (0.15 means it moves 15% of the distance to the mouse)
    mouseX.set(x * 0.15);
    mouseY.set(y * 0.15);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const variants = {
    primary: "bg-[#E53E3E] text-white border-transparent",
    outline: "bg-transparent text-white border-white",
    dark: "bg-[#1A1A1A] text-white border-transparent",
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      className={`relative group ${className}`}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className={`
          relative z-10 flex items-center justify-center px-12 py-5 
          text-[11px] font-black uppercase tracking-[0.3em] overflow-hidden
          transition-all duration-500 rounded-[2rem]
          ${variant === "outline" ? "border-2" : "border"}
          ${variants[variant]}
          shadow-[0_10px_30px_rgba(0,0,0,0.1)]
          hover:shadow-[0_15px_45px_rgba(229,62,62,0.3)]
        `}
      >
        {/* Liquid background fill effect */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className={`absolute inset-0 z-[-1] rounded-[2rem] ${
            variant === "primary" ? "bg-white" : variant === "outline" ? "bg-white" : "bg-[#E53E3E]"
          }`}
        />

        {/* Text/Children with color swap */}
        <span className={`relative z-20 transition-colors duration-500 ${
          isHovered 
            ? (variant === "primary" || variant === "outline" ? "text-[#E53E3E]" : "text-white") 
            : "text-inherit"
        }`}>
          {children}
        </span>

        {/* Glossy overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full" />
      </motion.div>

      {/* Outer subtle shadow/glow ring */}
      <motion.div
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.3 : 0,
        }}
        className="absolute inset-0 z-0 bg-[#E53E3E] rounded-[2rem] blur-2xl"
      />
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="inline-block">
      {content}
    </button>
  );
};
