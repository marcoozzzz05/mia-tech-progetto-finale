import SearchBar from "../SearchBar/SearchBar";
import NavbarIcons from "./NavbarIcons";

const Navbar = ({ isSearchOpen, setIsSearchOpen, searchRef, logo, onSearch }) => {
  return (
    <div className="w-full h-14 flex items-center justify-between">
      <a href="/">
        <img src={logo} className="h-12 w-auto ml-1 md:ml-8" alt="Logo" />
      </a>

      {isSearchOpen ? (
        <div ref={searchRef} className="flex-grow mx-4 transition-all duration-300">
          <SearchBar onSearch={onSearch} />
        </div>
      ) : null}
      <div className="mg-1 md:mr-8">
        <NavbarIcons isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      </div>

    </div>
  );
};

export default Navbar;