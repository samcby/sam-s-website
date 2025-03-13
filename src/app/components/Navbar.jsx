"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import Logo from "./Logo";
import GithubIcon from "../../../public/github-white-icon.png";
import LinkedinIcon from "../../../public/linkedin-app-white-icon.svg";
import InstagramIcon from "../../../public/instagram-white-icon.svg";
import { useTheme } from '../context/ThemeContext';
import Image from "next/image";

const navLinks = [
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Projects",
    path: "/projects",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Hobbies",
    path: "/hobbies",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300
                    ${isDarkMode 
                      ? 'bg-[#073642] border-[#586e75] bg-opacity-95' 
                      : 'bg-[#eee8d5] border-[#93a1a1] bg-opacity-95'}`}>
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-4">
        <Link
          href={"/"}
          className={`text-2xl md:text-5xl font-semibold transition-colors duration-300
                     ${isDarkMode ? 'text-white' : 'text-[#002b36]'}`}
        >
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <NavLink key={index} href={link.path} title={link.title} />
          ))}
        </div>

        {/* Socials */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="https://github.com/Rickyoung221" target="_blank">
            <Image 
              src={GithubIcon} 
              alt="Github Icon" 
              className={`w-8 h-8 transition-opacity duration-300 
                         ${isDarkMode ? 'opacity-100' : 'opacity-70 filter invert'}`} 
            />
          </Link>
          <Link href="https://www.linkedin.com/in/weikeng-yang" target="_blank">
            <Image 
              src={LinkedinIcon} 
              alt="Linkedin Icon" 
              className={`w-8 h-8 transition-opacity duration-300 
                         ${isDarkMode ? 'opacity-100' : 'opacity-70 filter invert'}`} 
            />
          </Link>
          <Link href="https://www.instagram.com/rick_young0221" target="_blank">
            <Image
              src={InstagramIcon}
              alt="Instagram Icon"
              className={`w-8 h-8 transition-opacity duration-300 
                         ${isDarkMode ? 'opacity-100' : 'opacity-70 filter invert'}`}
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className={`flex items-center px-3 py-2 border rounded transition-colors duration-300
                      ${isDarkMode 
                        ? 'border-[#93a1a1] text-[#93a1a1] hover:text-white hover:border-white' 
                        : 'border-[#586e75] text-[#586e75] hover:text-[#002b36] hover:border-[#002b36]'}`}
          >
            {navbarOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {navbarOpen && <MenuOverlay links={navLinks} />}
    </nav>
  );
};

export default Navbar;
