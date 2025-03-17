import { useState, useEffect, useRef } from "react"


const SearchBar = () => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const categories = ["Intrattenimento", "Educazione&Formazione", "Eventi culturali&Arte", "Sport&Fitness", "Tecnologia&Innovazione", "Ristorazione"];

  const popupRef = useRef(null);

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
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

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
  
    if(loading) {
      return (
        <p>Caricamento in corso...</p>
      )
    }

  return (
    <div className="searchBar">
      <input type="text" placeholder="Cerca eventi, categorie, luoghi..." value={ query } onChange={ handleChange } onClick={ handleClick } onKeyDown={ handleKeyDown }/>
      { showPopup && (
        <div className="pop-up" ref={ popupRef }>
        <h3>Ricerche recenti</h3>
        <div>
          { recentSearches.length > 0 ? (recentSearches.map((item, index) => 
            <span key={ index }> { item } </span>)) : (<p>Ancora nessuna ricerca</p>)
          }
        </div>
        <h3>Categorie</h3>
        <div>
          { categories.map((category, index) => (
            <span key={ index }> { category }</span> 
          ))}
        </div>
      </div>
      )}
      { noResults && (
        <p>Nessun risultato trovato per { noResults }</p>
      )
      }
    </div>
  )
}

export default SearchBar
