import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { searchPosts, getPostsByPlace } from "../services/postService";
import EventCard from "../components/EventCard/EventCard";

const SearchResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    const city = searchParams.get("city");

    // Normalizza i parametri (converte "null" string in null)
    const normalizedQuery = query && query !== "null" ? query : null;
    const normalizedCity = city && city !== "null" ? city : null;

    setSearchQuery(normalizedQuery || "");
    setSelectedCity(normalizedCity);
    fetchResults(normalizedQuery, normalizedCity);
  }, [location.search]);

  const fetchResults = async (query, city) => {
    try {
      setLoading(true);
      let response;

      const hasQuery = query && query.trim() !== "";
      const hasCity = city && city.trim() !== "";

      // Caso 1: Ricerca solo per città
      if (!hasQuery && hasCity) {
        response = await getPostsByPlace(city);
        response.data = response.data || [];
      }
      // Caso 2: Ricerca per query + città
      else if (hasQuery && hasCity) {
        response = await getPostsByPlace(city);
        response.data = (response.data || []).filter(post =>
          post.title?.toLowerCase().includes(query.toLowerCase()) ||
          post.content?.toLowerCase().includes(query.toLowerCase())
        );
      }
      // Caso 3: Ricerca solo per query
      else if (hasQuery && !hasCity) {
        response = await searchPosts(query);
        response.data = response.data || [];
      }
      // Caso 4: Nessun parametro valido
      else {
        response = { data: [] };
      }

      setResults(response.data);
    } catch (error) {
      console.error("Errore nel recupero risultati di ricerca: ", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getResultsTitle = () => {
    if (searchQuery && selectedCity) {
      return `Risultati della ricerca per "${searchQuery}" a ${selectedCity}`;
    }
    if (searchQuery) {
      return `Risultati della ricerca per "${searchQuery}"`;
    }
    if (selectedCity) {
      return `Eventi a ${selectedCity}`;
    }
    return "Tutti gli eventi";
  };

  const getNoResultsMessage = () => {
    if (searchQuery && selectedCity) {
      return `Nessun risultato trovato per "${searchQuery}" a ${selectedCity}`;
    }
    if (searchQuery) {
      return `Nessun risultato trovato per "${searchQuery}"`;
    }
    if (selectedCity) {
      return `Nessun evento trovato a ${selectedCity}`;
    }
    return "Nessun evento disponibile";
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 mt-8">
        <p>Caricamento risultati...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 mt-8 mb-20">
      <h2 className="text-2xl font-bold text-[#2e2e2e] mb-6">
        {getResultsTitle()}
      </h2>

      {results.length === 0 ? (
        <p>{getNoResultsMessage()}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((post) => (
            <EventCard
              key={post._id}
              post={{
                ...post,
                title: post.title || "Titolo non disponibile",
                image: post.image || "Immagine non disponibile",
                user: {
                  name: `${post.userId?.first_name || "Utente"} ${post.userId?.last_name || ""}`,
                  profile_image: post.userId?.profile_image
                },
                likes: post.likes || [],
              }}
              onClick={() => navigate(`/post-detail/${post._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;