import { Search, User, Home, Bookmark, Heart } from "lucide-react";
import SearchBar from "../SearchBar/SearchBar";
import logo from "../../assets/img/logo/Glokal_white_logo.png"

const TopNavbar = () => {
  return (
    <div className="w-full bg-[#9b5de5] py-1 shadow-lg h-18 flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src={ logo } className="h-10 w-auto ml-1 md:ml-7"/>
        </div>

        {/* SearchBar centrata */}
          <div className="flex-grow flex justify-center"> 
            <SearchBar />
          </div>
          

        {/* Menu icons */}
        <div className="flex-shrink-0 flex space-x-6 items-center">
          <button className="md:hidden text-white opacity-70 hover:text-[#ffc300]">
            <Search size={24} />
          </button>
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
    </div>
  );
};

export default TopNavbar;
