import { Search, User, Home, Bookmark, Heart, X } from "lucide-react";

const NavbarIcons = ({ isSearchOpen, setIsSearchOpen }) => {
  return (
    <div className="flex space-x-6 items-center">
      {/* MOBILE: Icona Search (diventa X se aperta) */}
      {isSearchOpen ? (
        <button className="text-white opacity-70 hover:text-[#ffc300]" onClick={() => setIsSearchOpen(false)}>
          <X size={24} />
        </button>
      ) : (
        <button className="md:hidden text-white opacity-70 hover:text-[#ffc300]" onClick={() => setIsSearchOpen(true)}>
          <Search size={24} />
        </button>
      )}

      {/* Icone comuni (mostrate sempre) */}
      <button className="text-white opacity-70 hover:text-[#ffc300]">
        <Home size={24} />
      </button>
      <button className="text-white opacity-70 hover:text-[#ffc300]">
        <Heart size={24} />
      </button>
      <button className="text-white opacity-70 hover:text-[#ffc300]">
        <Bookmark size={24} />
      </button>
      <button className="text-white opacity-70 hover:text-[#ffc300]">
        <User size={24} />
      </button>
    </div>
  );
};

export default NavbarIcons;