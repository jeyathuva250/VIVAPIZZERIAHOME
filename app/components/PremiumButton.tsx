"use client";
 
import { motion } from "framer-motion";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
 
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
  const [isHovered, setIsHovered] = useState(false);
 
  const variants = {
    primary: "bg-[#E53E3E] text-white border-transparent",
    outline: "bg-transparent text-white border-white",
    dark: "bg-[#1A1A1A] text-white border-transparent",
  };
 
  const content = (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group ${className}`}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
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
 
        {/* Text/Children with color swap and icon */}
        <div className={`relative z-20 flex items-center gap-3 transition-colors duration-500 ${
          isHovered 
            ? (variant === "primary" || variant === "outline" ? "text-[#E53E3E]" : "text-white") 
            : "text-inherit"
        }`}>
          <span className="relative">{children}</span>
          
          <div className={`relative flex items-center transition-all duration-500 ${
            isHovered ? "w-5 opacity-100 translate-x-0" : "w-0 opacity-0 -translate-x-2"
          }`}>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
 
        {/* Glossy overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full" />
      </motion.div>
 
      {/* Outer subtle shadow/glow ring */}
      <motion.div
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.3 : 0,
        }}
        className="absolute inset-0 z-0 bg-[#E53E3E] rounded-[2rem] blur-2xl transition-all duration-500"
      />
    </div>
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
