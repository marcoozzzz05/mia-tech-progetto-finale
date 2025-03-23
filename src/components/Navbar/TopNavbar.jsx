import { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import logo from "../../assets/img/logo/Glokal_white_logo.png";

const TopNavbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  return (
    <div className="w-full bg-[#9b5de5] shadow-lg px-4 py-2 transition-all duration-300">
      <Navbar 
        isSearchOpen={isSearchOpen} 
        setIsSearchOpen={setIsSearchOpen} 
        searchRef={searchRef} 
        logo={logo} 
      />
    </div>
  );
};

export default TopNavbar;