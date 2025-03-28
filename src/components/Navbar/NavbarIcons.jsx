import { useState, useRef, useEffect } from "react";
import { Search, User, Home, Bookmark, Heart, X } from "lucide-react";

const NavbarIcons = ({ isSearchOpen, setIsSearchOpen }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex space-x-6 items-center">
      {isSearchOpen ? (
        <button className="text-white opacity-70 hover:text-[#ffc300]" onClick={() => setIsSearchOpen(false)}>
          <X size={24} />
        </button>
      ) : (
        <button className="md:hidden text-white opacity-70 hover:text-[#ffc300]" onClick={() => setIsSearchOpen(true)}>
          <Search size={24} />
        </button>
      )}

      <a href="/">
        <button className="text-white opacity-70 hover:text-[#ffc300]">
          <Home size={24} />
        </button>
      </a>
      <a href="/favorite">
        <button className="text-white opacity-70 hover:text-[#ffc300]">
          <Heart size={24} />
        </button>
      </a>
      <a href="/saved-posts">
        <button className="text-white opacity-70 hover:text-[#ffc300]">
          <Bookmark size={24} />
        </button>
      </a>

      <div className="relative" ref={userMenuRef}>
        <button className="text-white opacity-70 hover:text-[#ffc300]" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
          <User size={24} />
        </button>

        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
            <div className="p-4">
              <a href="/register-page">
              <span className={`block bg-[#F7F1F7] px-1 py-1 m-4 rounded-full text-sm cursor-pointer ${selectedItem === "register" ? "text-[#ffc300]" : "text-gray-800"
                }`} onClick={() => handleItemClick("register")}>
                Registrati
              </span>
              </a>
              <a href="/login">
              <span className={`block bg-[#F7F1F7] px-1 py-1 m-4 rounded-full text-sm cursor-pointer ${selectedItem === "login" ? "text-[#ffc300]" : "text-gray-800"}`} onClick={() => handleItemClick("login")}>
                Login
              </span>   
              </a >
              <a href="/profile">
              <span className={`block bg-[#F7F1F7] px-1 py-1 m-4 rounded-full text-sm cursor-pointer ${selectedItem === "profile" ? "text-[#ffc300]" : "text-gray-800"}`} onClick={() => handleItemClick("profile")}>
                Profilo
              </span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarIcons;