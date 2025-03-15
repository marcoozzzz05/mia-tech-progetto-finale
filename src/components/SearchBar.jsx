import { useState } from "react"
import { useEffect } from "react"


const SearchBar = () => {
  const [search, setSearch] = useState(["Non hai ancora fatto una ricerca"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const search = localStorage.getItem("search");

    if(search) {
      setSearch(JSON.parse(search))
      console.log(search);
    };
     setLoading(false);
  }, [])

  //Devono apparire i suggerimenti dal localStorage
  const handleClick = () => {
    const popUp = document.getElementById("pop-up");
    popUp.classList.add("visible");
  }

  //All'invio si aggiorna il localStorage con il nuovo elemento (se non esistente)
  const handleChange = () => {

  }
  
    if(loading) {
      return (
        <p>Caricamento in corso</p>
      )
    }

  return (
    <div>
      <input type="text" placeholder="Cerca" onChange={ handleChange } onClick={ handleClick }/>
      <div className="pop-up" id="pop-up">
        <h3>Titolo ricerche recenti</h3>
        <div>
          { search.map((list, index) => {
            return (
              <span key={ index }> { list } </span>
            )
          })}
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
