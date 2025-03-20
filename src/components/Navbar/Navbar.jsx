import { Home, Search, Heart, Bookmark, User } from "lucide-react";

//md:hidden serve per gli smartphone
const Navbar = () => {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-gradient-to-b from-purple-500 to-purple-400 py-4 flex justify-around items-center shadow-lg border-t border-purple-300">
            <div className="container mx-auto flex justify-around items-center max-w-md">
                <button className="flex flex-col items-center text-white opacity-70 hover:opacity-100">
                    <Home size={24} />
                </button>
                <button className="flex flex-col items-center text-white opacity-70 hover:opacity-100">
                    <Search size={24} />
                </button>
                <button className="flex flex-col items-center text-white opacity-70 hover:opacity-100">
                    <Heart size={24} />
                    
                </button>
                <button className="flex flex-col items-center text-white opacity-70 hover:opacity-100">
                    <Bookmark size={24} />
                </button>
                <button className="flex flex-col items-center text-white opacity-70 hover:opacity-100">
                    <User size={24} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
