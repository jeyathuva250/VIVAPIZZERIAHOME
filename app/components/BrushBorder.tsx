"use client";

import React from "react";

interface BrushBorderProps {
  position: "top" | "bottom";
  color?: string;
  className?: string;
  isMask?: boolean;
}

export const BrushBorder: React.FC<BrushBorderProps> = ({ 
  position, 
  color = "white", 
  className = ""
}) => {
  const isTop = position === "top";
  
  return (
    <div 
      className={`absolute ${isTop ? "top-0" : "bottom-0"} left-0 w-full h-40 pointer-events-none z-20 ${className}`}
      style={{
        backgroundColor: color,
        WebkitMaskImage: "url('/premium-brush.svg')",
        maskImage: "url('/premium-brush.svg')",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        transform: `${isTop ? "rotate(180deg)" : "none"} translateY(${isTop ? "1px" : "-1px"})`,
      }}
    />
  );
};
