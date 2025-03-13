"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from '../context/ThemeContext';

const Logo = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full max-w-[300px] h-auto">
        <Image
          src="/images/RICK_logo_vaporwave.png"
          alt="Logo"
          width={200}
          height={200}
          style={{ objectFit: "contain" }}
          className={`transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-90'}`}
          priority
        />
      </div>
    </div>
  );
};

export default Logo;
