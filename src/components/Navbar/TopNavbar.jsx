import { Search, User } from "lucide-react";
import { Link } from "react-router-dom"

const TopNavbar = () => {
  return (
    <div className="nav hidden md:flex fixed top-0 left-0 w-full bg-gradient-to-b from-purple-500 to-purple-400 py-4 shadow-lg border-b border-purple-300 rounded-b-3xl">
      <div className="container mx-auto flex justify-between items-center px-6 max-w-6xl">
        {/* Logo */}
        <div className="text-white font-bold text-xl flex items-center">
          <span className="mr-2">Gruppo 4</span>
        </div>

        {/* Menu Items */}
        <div className="flex space-x-6 gap-8">
        <Link to="/">  <button className="text-white opacity-70 hover:opacity-100">Home</button></Link>
          <button className="text-white opacity-70 hover:opacity-100"> Favoriti</button>
        </div>

        {/* Icons */}
        <div className="flex space-x-4 gap-4">
          <button className="text-white opacity-70 hover:opacity-100">
          <Link to="/search">   <Search size={24} /> </Link>
          </button>
          <button className="text-white opacity-70 hover:opacity-100">
          <Link to="/profile"> <User size={24} /></Link> 
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
