import SearchBar from "../SearchBar/SearchBar";
import NavbarIcons from "./NavbarIcons";

const Navbar = ({ isSearchOpen, setIsSearchOpen, searchRef, logo, onSearch }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <img src={logo} className="h-10 w-auto ml-1 md:ml-7" alt="Logo" />

      {isSearchOpen ? (
        <div ref={searchRef} className="flex-grow mx-4 transition-all duration-300">
          <SearchBar onSearch={onSearch} />
        </div>
      ) : null}

      <NavbarIcons isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
    </div>
  );
};

export default Navbar;