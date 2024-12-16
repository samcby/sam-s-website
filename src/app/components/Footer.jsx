import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="footer border-t border-t-[#33353F] bg-[#121212] text-white">
      <div className="container mx-auto p-6 md:p-4 lg:p-5 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <div>
          <Logo />
        </div>
        {/* Footer Text */}
        <p className="text-sm text-slate-600 text-center md:text-left">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
