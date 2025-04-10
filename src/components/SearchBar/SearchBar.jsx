import { useState, useEffect, useRef } from "react";
import { Search, MapPin, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { searchPosts, getPostsByPlace } from "../../services/postService";

const SearchBar = ({ onSearch }) => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [locationPopup, setLocationPopup] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const popupRef = useRef(null);
  const locationRef = useRef(null);
  const navigate = useNavigate();

  const cities = [
    { value: "MILANO", label: "Milano" },
    { value: "BERGAMO", label: "Bergamo" },
    { value: "ROMA", label: "Roma" },
    { value: "TORINO", label: "Torino" },
    { value: "CAGLIARI", label: "Cagliari" },
    { value: "PALERMO", label: "Palermo" }
  ];

  useEffect(() => {
    const storedSearches = localStorage.getItem("glokal_search");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    } else {
      localStorage.setItem("glokal_search", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popupRef, locationRef]);

  useEffect(() => {
    // Carica suggerimenti basati su query
    if (query.length > 3) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const fetchSuggestions = async () => {
    try {
      const encodeQuery = encodeURIComponent(query);
      const response = await searchPosts(encodeQuery);
      const uniqueTitles = [...new Set(response.data.map(post => post.title))];
      setSuggestions(uniqueTitles.slice(0, 5));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      console.error(error.response ? error.response.data : error.message);
    }
  };

  const saveSearch = (newSearch) => {
    const updatedSearches = [
      newSearch,
      ...recentSearches.filter(item => item !== newSearch)
    ].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem("glokal_search", JSON.stringify(updatedSearches));
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const executeSearch = async (searchTerm) => {
    try {
      let results;
      const hasQuery = searchTerm.trim() !== "";
      const hasCity = selectedCity !== null;
  
      //Solo città
      if (!hasQuery && hasCity) {
        results = await getPostsByPlace(selectedCity);
        results = results.data;
      } 
      //Query + città
      else if (hasQuery && hasCity) {
        results = await getPostsByPlace(selectedCity);
        results = results.data.filter(post =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      //Solo query
      else if (hasQuery && !hasCity) {
        results = await searchPosts(searchTerm);
        results = results.data;
      }
      //Nessun parametro (non dovrebbe accadere)
      else {
        results = [];
      }
  
      let queryString = "";
      if (hasQuery) queryString += `query=${encodeURIComponent(searchTerm)}`;
      if (hasCity) queryString += `${hasQuery ? '&' : ''}city=${selectedCity}`;
  
      navigate(`/search-results?${queryString}`);
      saveSearch(searchTerm);
      setQuery("");
      setShowPopup(false);
    } catch (error) {
      console.error("Search error:", error);
      // Naviga comunque alla pagina risultati con i parametri
      let queryString = `query=${encodeURIComponent(searchTerm)}`;
      if (selectedCity) queryString += `&city=${selectedCity}`;
      navigate(`/search-results?${queryString}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && query.trim() !== "") {
      event.preventDefault();
      executeSearch(query.trim());
    }
  };

  const handleClick = () => {
    setShowPopup(true);
  };

  const handleLocationClick = () => {
    setLocationPopup(prev => !prev);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setTimeout(() => setLocationPopup(false), 100);
  };

  const handleRecentSearchClick = (searchTerm) => {
    setQuery(searchTerm);
    executeSearch(searchTerm);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    executeSearch(suggestion);
  };

  return (
    <div className="flex justify-end md:justify-center w-full">
      <div className="relative w-4/5 md:w-3/5 bg-white shadow-lg rounded-2xl flex items-center p-2 border border-gray-300 my-3 h-10">
        <Search className="text-[#6a0572]" />
        <input
          type="text"
          placeholder="Cerca eventi, categorie, luoghi..."
          value={query}
          onChange={handleChange}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-2 text-gray-700 focus:outline-none"
        />

        {query && (
          <X className="text-gray-500 cursor-pointer mr-3" onClick={() => setQuery("")} />
        )}

        <div className="border-1 border-gray-300 h-6 mx-2"></div>
        <MapPin className="text-[#6a0572]" />
        <span ref={locationRef} className="text-gray-700 m-4 cursor-pointer" onClick={handleLocationClick}>
          {selectedCity ? cities.find(c => c.value === selectedCity)?.label : "Città"}
        </span>

        {showPopup && (
          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-full max-w-[calc(100%-24px)] sm:max-w-[calc(100%-24px)] bg-white shadow-lg rounded-lg p-4" ref={popupRef}>
            {query.length > 0 && suggestions.length > 0 && (
              <>
                <h3 className="text-gray-700 text-sm font-semibold m-4 !mb-2">Suggerimenti</h3>
                <div className="flex flex-wrap m-4 !mt-2 gap-2 justify-center">
                  {suggestions.map((item, index) => (
                    <span
                      key={`suggestion-${index}`}
                      className="bg-[#F7F1F7] px-1 py-1 m-4 rounded-full text-sm cursor-pointer"
                      onClick={() => handleSuggestionClick(item)}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </>
            )}

            <h3 className="text-gray-700 text-sm font-semibold m-4 !mb-2">Ricerche recenti</h3>
            <div className="flex flex-wrap m-4 !mt-2 gap-2 justify-center">
              {recentSearches.length > 0 ? (
                recentSearches.map((item, index) => (
                  <span
                    key={`recent-${index}`}
                    className="bg-[#F7F1F7] px-1 py-1 m-4 rounded-full text-sm cursor-pointer"
                    onClick={() => handleRecentSearchClick(item)}
                  >
                    {item}
                  </span>
                ))
              ) : (
                <p>Ancora nessuna ricerca</p>
              )}
            </div>
          </div>
        )}

        {locationPopup && (
          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-full max-w-[calc(100%-24px)] sm:max-w-[calc(100%-24px)] bg-white shadow-lg rounded-lg p-4">
            <div className="grid grid-cols-2 gap-2 m-2">
              {cities.map((city, index) => (
                <span
                  key={`city-${index}`}
                  className={`px-2 py-1 m-1 rounded-lg text-sm cursor-pointer 
                    ${selectedCity === city.value ? 'bg-[#ffc300] text-white' : 'bg-[#F7F1F7] text-gray-700'}`}
                  onClick={() => handleCitySelect(city.value)}
                >
                  {city.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;