import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import logo from "../../assets/img/logo/Glokal_white_logo.png";

const TopNavbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

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

  const handleSearch = (query, city) => {
    navigate(`/search-results?query=${encodeURIComponent(query)}${city ? `&city=${city}` : ''}`);
  };

  return (
    <>
      <div className="w-full bg-[#9b5de5] shadow-lg px-4 py-2 transition-all duration-300 fixed top-0 left-0 right-0 z-50">
        <Navbar 
          isSearchOpen={isSearchOpen} 
          setIsSearchOpen={setIsSearchOpen} 
          searchRef={searchRef} 
          logo={logo} 
          onSearch={handleSearch}
        />
      </div>
      <div className="h-20"></div>
    </>
  );
};

export default TopNavbar;