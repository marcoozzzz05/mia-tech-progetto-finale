import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { getPostsByPlace } from "../services/postService";
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

    //Normalizza i parametri (converte "null" string in null)
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

      //Solo città
      if (!hasQuery && hasCity) {
        response = await getPostsByPlace(city);
        response.data = response.data || [];
      }

      //Città + query
      else if (hasQuery && hasCity) {
        const res = await getPostsByPlace(city);
        const lowerQuery = query.toLowerCase();
        const filtered = (res.data || []).filter(post =>
          post.title?.toLowerCase().includes(lowerQuery) ||
          post.content?.toLowerCase().includes(lowerQuery)
        );
        response = { data: filtered };
      }

      //Solo query
      else if (hasQuery && !hasCity) {
        const cities = ["MILANO", "BERGAMO", "ROMA", "TORINO", "CAGLIARI", "PALERMO"];
        let allPosts = [];

        for (const city of cities) {
          try {
            const res = await getPostsByPlace(city);
            allPosts = allPosts.concat(res.data || []);
          } catch (e) {
            console.warn(`Errore nel recupero post da ${city}:`, e);
          }
        }

        const lowerQuery = query.toLowerCase();
        const filtered = allPosts.filter(post =>
          post.title?.toLowerCase().includes(lowerQuery) ||
          post.content?.toLowerCase().includes(lowerQuery)
        );

        response = { data: filtered };
      }

      //Nessun parametro valido
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
      return `Ecco i risultati per "${searchQuery}" a ${selectedCity}`;
    }
    if (searchQuery) {
      return `Risultati per "${searchQuery}"`;
    }
    if (selectedCity) {
      return `Tutti gli eventi a ${selectedCity}`;
    }
    return "Tutti gli eventi disponibili";
  };

  const getNoResultsMessage = () => {
    if (searchQuery && selectedCity) {
      return `Nessun risultato per "${searchQuery}" a ${selectedCity}.`;
    }
    if (searchQuery) {
      return `Nessun contenuto trovato per "${searchQuery}".`;
    }
    if (selectedCity) {
      return `Nessun evento trovato a ${selectedCity}.`;
    }
    return "Al momento non ci sono eventi disponibili.";
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