import { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import logo from "../../assets/img/logo/Glokal_white_logo.png";
import SearchResults from "../SearchBar/SearchResults";

const TopNavbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  const handleSearch = (results, noResults) => {
    setSearchResults(results);
    setNoResults(noResults);
  };

  return (
    <>
      <div className="w-full bg-[#9b5de5] shadow-lg px-4 py-2 transition-all duration-300 fixed top-0 left-0 right-0 z-50">
        <Navbar 
          isSearchOpen={isSearchOpen} 
          setIsSearchOpen={setIsSearchOpen} 
          searchRef={searchRef} 
          logo={logo} 
          onSearch={handleSearch}
        />
      </div>
      <div className="h-20"></div>

      {/* Risultati della ricerca - ora fuori dalla navbar */}
      {searchResults && <SearchResults results={searchResults} />}
      {noResults && (
        <div className="container mx-auto px-6 mt-4 text-[#2e2e2e]">
          <p>Nessun risultato trovato per "{noResults}"</p>
        </div>
      )}
    </>
  );
};

export default TopNavbar;