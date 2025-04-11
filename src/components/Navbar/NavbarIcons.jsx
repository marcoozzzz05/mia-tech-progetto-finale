import { useState, useRef, useEffect } from "react";
import { Search, User, Home, Heart, X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ usa react-router-dom

const NavbarIcons = ({ isSearchOpen, setIsSearchOpen }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("glokal_user"));
  const profilePage = user?.role === "USER" ? "/user-profile" : "/profile";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("glokal_user");
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleLogout = () => {
    localStorage.clear();
    setSelectedItem("logout");
    navigate("/landing-page");
  };

  return (
    <div className="flex space-x-6 items-center">
      {isSearchOpen ? (
        <button className="text-white opacity-70 hover:text-[#ffc300] cursor-pointer" onClick={() => setIsSearchOpen(false)}>
          <X size={24} />
        </button>
      ) : (
        <button className="text-white opacity-70 hover:text-[#ffc300] cursor-pointer" onClick={() => setIsSearchOpen(true)}>
          <Search size={24} />
        </button>
      )}

      <a href="/">
        <button className="text-white opacity-70 hover:text-[#ffc300] cursor-pointer">
          <Home size={24} />
        </button>
      </a>

      <a href="/favorite">
        <button className="text-white opacity-70 hover:text-[#ffc300] cursor-pointer">
          <Heart size={24} />
        </button>
      </a>

      <div className="relative" ref={userMenuRef}>
        <button className="text-white opacity-70 hover:text-[#ffc300] cursor-pointer" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
          <User size={24} />
        </button>

        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
            <div className="p-4">
              {!isLoggedIn && (
                <a href="/register-page">
                  <span
                    className={`block bg-[#F7F1F7] px-1 py-1 m-4 rounded-full text-sm cursor-pointer ${
                      selectedItem === "register" ? "text-[#ffc300]" : "text-gray-800"
                    }`}
                    onClick={() => handleItemClick("register")}
                  >
                    Registrati
                  </span>
                </a>
              )}
              {!isLoggedIn && (
                <a href="/login">
                  <span
                    className={`block bg-[#F7F1F7] px-1 py-1 m-4 rounded-full text-sm cursor-pointer ${
                      selectedItem === "login" ? "text-[#ffc300]" : "text-gray-800"
                    }`}
                    onClick={() => handleItemClick("login")}
                  >
                    Login
                  </span>
                </a>
              )}
              {isLoggedIn && (
                <a href={profilePage}>
                  <span
                    className={`block bg-[#F7F1F7] px-1 py-1 m-4 rounded-full text-sm cursor-pointer ${
                      selectedItem === "profile" ? "text-[#ffc300]" : "text-gray-800"
                    }`}
                    onClick={() => handleItemClick("profile")}
                  >
                    Profilo
                  </span>
                </a>
              )}
              {isLoggedIn && (
                <span
                  className={`block bg-[#F7F1F7] px-1 py-1 m-4 rounded-full text-sm cursor-pointer ${
                    selectedItem === "logout" ? "text-[#ffc300]" : "text-gray-800"
                  }`}
                  onClick={handleLogout}
                >
                  Logout
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarIcons;