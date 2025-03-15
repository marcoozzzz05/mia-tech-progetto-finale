import { useState, useEffect, useRef } from "react"


const SearchBar = () => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const storedSearches = localStorage.getItem("search");

    if(storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    } else {
        localStorage.setItem("search", JSON.stringify([]));
      }

     setLoading(false);
  }, [])

  const saveSearch = (newSearch) => {
    const updatedSearches = [newSearch, ...recentSearches.filter(item => item !== newSearch)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem("search", JSON.stringify(updatedSearches));
  };

  //Al click su cerca si aggiorna il localStorage con il nuovo elemento digitato (se non esistente già) e si ripulisce il campo di input
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if(query.trim()) {
      saveSearch(query.trim());
      setQuery("");
    }
  }

  //Al click appare una tendina con i suggerimenti dal localStorage e le categorie
  const handleClick = () => {
    const popUp = document.getElementById("pop-up");
    popUp.classList.add("visible");
  }
  
    if(loading) {
      return (
        <p>Caricamento in corso...</p>
      )
    }

  return (
    <div>
      <input type="text" placeholder="Cerca eventi, categorie, luoghi..." value={ query } onChange={ handleChange } onClick={ handleClick } />
      <button onClick={ handleSearchClick }>Cerca</button>
      <div className="pop-up" id="pop-up">
        <h3>Ricerche recenti</h3>
        <div>
          { recentSearches.length > 0 ? (recentSearches.map((item, index) => 
            <span key={ index }> { item } </span>)) : (<p>Ancora nessuna ricerca</p>)
          }
        </div>
        <h3>Categorie</h3>
        <div>
          <div>Immagine1, testo1</div>
          <div>Immagine2, testo2</div>
          <div>Immagine3, testo3</div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
