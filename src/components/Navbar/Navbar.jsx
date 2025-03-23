import SearchBar from "../SearchBar/SearchBar";
import NavbarIcons from "./NavbarIcons";

const Navbar = ({ isSearchOpen, setIsSearchOpen, searchRef, logo }) => {
  return (
    <>
      {/*Navbar quando la search è chiusa*/}
      {!isSearchOpen && (
        <div className="w-full flex items-center justify-between">
          <img src={logo} className="h-10 w-auto ml-1 md:ml-7" alt="Logo" />
          <div className="hidden md:flex flex-grow justify-center">
            <SearchBar />
          </div>
          <NavbarIcons isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
        </div>
      )}

      {/*Navbar quando la search è aperta*/}
      {isSearchOpen && (
        <div className="w-full flex flex-col">
          <div ref={searchRef} className="w-full flex items-center justify-start">
            <img src={logo} className="h-10 w-auto ml-1" alt="Logo" />
            <div className="flex-grow ml-0 w-auto justify-end transition-all duration-300">
              <SearchBar />
            </div>
          </div>
          <div className="w-full flex justify-end mt-3">
            <NavbarIcons isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;