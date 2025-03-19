import { useState, useEffect, useRef } from "react"
import { Search, MapPin, X } from "lucide-react"


const SearchBar = () => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [locationPopup, setLocationPopup] = useState(false);

  const categories = ["Intrattenimento", "Educazione&Formazione", "Eventi culturali&Arte", "Sport&Fitness", "Tecnologia&Innovazione", "Ristorazione"];
  const cities = ["Milano", "Bergamo", "Roma", "Cagliari", "Palermo"]

  const popupRef = useRef(null);
  const locationRef = useRef(null);

  useEffect(() => {
    const storedSearches = localStorage.getItem("search");

    if(storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    } else {
        localStorage.setItem("search", JSON.stringify([]));
      }

     setLoading(false);
  }, [])

  //Al click in qualunque punto della pagina il pop-up si chiude
  useEffect(() => {
    const handleClickOutside = (event) => {
      if(popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }

      if(locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationPopup(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, locationRef]);

useEffect(() => {
  console.log("selectedCity aggiornato: ", selectedCity);
}, [selectedCity]);

  const saveSearch = (newSearch) => {
    const updatedSearches = [newSearch, ...recentSearches.filter(item => item !== newSearch)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem("search", JSON.stringify(updatedSearches));
  };

  //Il campo di input si aggiorna quando l'utente digita
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  //Avvio la ricerca e chiudo il pop-up
  const executeSearch = (searchTerm) => {
    setNoResults(searchTerm);
    saveSearch(searchTerm);
    setQuery("");
    setShowPopup(false);
  }

  //Al premere il tasto invio l'elemento digitato viene salvato nel local storage (se non presente), e mostrato nelle ricerche recenti
  const handleKeyDown = (event) => {
    if(event.key === "Enter" && query.trim() !== "") {
      event.preventDefault();
      executeSearch(query.trim());
    }
  };

  //Al click sul campo di input appare una tendina (pop-up) con i suggerimenti dal localStorage e le categorie
  const handleClick = () => {
    setShowPopup(true);
  }

  const handleLocationClick = () => {
    setLocationPopup(true);
  }
  
  const handleCitySelect = (city) => {
    console.log("Città selezionata: ", city);
    setSelectedCity(city);
    setTimeout(() => setLocationPopup(false), 100);
  }
  
    if(loading) {
      return (
        <p>Caricamento in corso...</p>
      )
    }

  return (
    <>
    <div className="relative flex justify-center m-10 w-full bg-[#9b5de5] py-4">
      <div className="relative w-3/5 bg-white shadow-lg rounded-2xl flex items-center p-3 border border-gray-300 my-3">
        <Search className="text-[#6a0572] ml-3" />
        <input type="text" placeholder="Cerca eventi, categorie, luoghi..." value={ query } onChange={ handleChange } onClick={ handleClick } onKeyDown={ handleKeyDown } className="w-full px-3 py-2 text-gray-700 focus:outline-none"/>
      
      { query && (
        <X className="text-gray-500 cursor-pointer mr-3" onClick={ () => setQuery("")} />
      )}
      <div className="border-1 border-gray-300 h-6 mx-2"></div>
      <MapPin className="text-[#6a0572]" />
      <span ref={ locationRef } className="text-gray-700 m-4 cursor-pointer" onClick={ handleLocationClick}>
        { selectedCity ? selectedCity : "Luogo" }
      </span>

      { showPopup && (
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-full max-w-[calc(100%-24px)] sm:max-w-[calc(100%-24px)] bg-white shadow-lg rounded-lg p-4" ref={ popupRef }>
          <h3 className="text-gray-700 text-sm font-semibold m-4 !mb-2">Ricerche recenti</h3>
            <div className="flex flex-wrap m-4 !mt-2 gap-2">
              { recentSearches.length > 0 ? (recentSearches.map((item, index) => 
               <span key={ index } className="bg-[#F7F1F7] px-2 py-1 m-4 rounded-full text-sm cursor-pointer">
                { item } 
              </span>
            )) : (<p>Ancora nessuna ricerca</p>)
          }
            </div>
          <h3 className="text-gray-700 text-sm font-semibold m-4 !mt-2 !mb-2">Categorie</h3>
          <div className="grid grid-cols-2 gap-2 m-4 !mt-2">
            { categories.map((category, index) => (
              <span key={ index } className="bg-[#9b5de5] text-white justify text-center px-3 py-2 rounded-lg text-sm cursor-pointer">
                { category }
              </span> 
            ))}
          </div>
        </div>
      )}

      { locationPopup && (
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-full max-w-[calc(100%-24px)] sm:max-w-[calc(100%-24px)] bg-white shadow-lg rounded-lg p-4">
          <div className="grid grid-cols-2 gap-2 m-2">
            { cities.map((city, index) => (
              <span key={ index } className={`px-2 py-1 m-1 rounded-full text-sm cursor-pointer 
                ${selectedCity === city ? 'bg-[#9b5de5] text-white' : 'bg-[#F7F1F7] text-gray-700'}`}
                onClick={ () => {
                console.log("Cliccato su:", city);
                handleCitySelect(city); }}>
                  { city }
              </span>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
    <div>
      { noResults && 
      <p>Nessun risultato trovato per {noResults}</p>
      }
    </div>
    </>
  )
}


export default SearchBar
