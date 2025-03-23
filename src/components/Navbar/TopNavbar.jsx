import { Search, User } from "lucide-react";
import SearchBar from "../SearchBar/SearchBar";

const TopNavbar = () => {
  return (
    <div className="nav hidden md:flex top-0 left-0 w-full bg-[#9b5de5] py-1 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 max-w-6xl">
        {/* Logo */}
        <div className="text-white font-bold text-xl flex items-center">
          <span className="mr-2">Gruppo 4</span>
        </div>

        { <SearchBar />}

        {/* Menu Items */}
        <div className="flex space-x-6 gap-8">
          <button className="text-white opacity-70 hover:opacity-100">Home</button>
          <button className="text-white opacity-70 hover:opacity-100"> Favoriti</button>
        </div>

        {/* Icons */}
        <div className="flex space-x-4 gap-4">
          <button className="text-white opacity-70 hover:opacity-100">
            <Search size={24} />
          </button>
          <button className="text-white opacity-70 hover:opacity-100">
            <User size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
