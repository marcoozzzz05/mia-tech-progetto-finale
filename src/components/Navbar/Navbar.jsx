import SearchBar from "../SearchBar/SearchBar";
import NavbarIcons from "./NavbarIcons";

const Navbar = ({ isSearchOpen, setIsSearchOpen, searchRef, logo, onSearch }) => {
  return (
    <>
      {!isSearchOpen && (
        <div className="w-full flex items-center justify-between">
          <img src={logo} className="h-10 w-auto ml-1 md:ml-7" alt="Logo" />
          <div className="hidden md:flex flex-grow justify-center">
            <SearchBar onSearch={onSearch} />
          </div>
          <NavbarIcons isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
        </div>
      )}

      {isSearchOpen && (
        <div className="w-full flex flex-col">
          <div ref={searchRef} className="w-full flex items-center justify-start">
            <img src={logo} className="h-10 w-auto ml-1" alt="Logo" />
            <div className="flex-grow ml-0 w-auto justify-end transition-all duration-300">
              <SearchBar onSearch={onSearch} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;