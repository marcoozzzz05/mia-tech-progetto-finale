import SearchBar from "../SearchBar/SearchBar";
import NavbarIcons from "./NavbarIcons";

const Navbar = ({ isSearchOpen, setIsSearchOpen, searchRef, logo }) => {
  return (
    <>
      {/* 📌 NAVBAR CHIUSA (Mostrata SOLO se la search NON è aperta) */}
      {!isSearchOpen && (
        <div className="w-full flex items-center justify-between">
          {/* 1️⃣ Logo */}
          <img src={logo} className="h-10 w-auto ml-1 md:ml-7" alt="Logo" />

          {/* 2️⃣ DESKTOP: SearchBar visibile sempre */}
          <div className="hidden md:flex flex-grow justify-center">
            <SearchBar />
          </div>

          {/* 3️⃣ Icone Menu (Search/X inclusa in mobile) */}
          <NavbarIcons isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
        </div>
      )}

      {/* 📌 NAVBAR APERTA (Mostrata SOLO se la search È aperta) */}
      {isSearchOpen && (
        <div className="w-full flex flex-col">
          {/* 🔹 Riga 1: Logo e SearchBar accanto (ora più lunga) */}
          <div ref={searchRef} className="w-full flex items-center justify-start">
            <img src={logo} className="h-10 w-auto ml-1" alt="Logo" />
            <div className="flex-grow ml-0 w-auto justify-end transition-all duration-300">
              <SearchBar />
            </div>
          </div>

          {/* 🔹 Riga 2: Icone allineate a destra sotto la SearchBar */}
          <div className="w-full flex justify-end mt-3">
            <NavbarIcons isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;