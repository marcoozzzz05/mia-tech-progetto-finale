import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { searchPosts, getPostsByPlace } from "../services/postService";
import EventCard from "../components/EventCard/EventCard";

const SearchResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    const city = searchParams.get("city");

    if (!query) {
      navigate("/");
      return;
    }

    setSearchQuery(query);
    setSelectedCity(city || null);
    fetchResults(query, city);
  }, [location.search]);

  const fetchResults = async (query, city) => {
    try {
      setLoading(true);
      let response;

      if (city) {
        response = await getPostsByPlace(city);
        response.data = response.data.filter(post =>
          post.title?.toLowerCase().includes(query.toLowerCase()) ||
          post.content?.toLowerCase().includes(query.toLowerCase())
        );
      } else {
        response = await searchPosts(query);
      }

      if (!response.data || response.data.length === 0) {
        setNoResults(true);
        setResults([]);
      } else {
        setResults(response.data);
        setNoResults(false);
      }
    } catch (error) {
      console.error("Errore nel recupero risultati di ricerca: ", error);
      setNoResults(true);
      setResults([]);
    } finally {
      setLoading(false);
    }
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
        Risultati della ricerca per "{searchQuery}"
        {selectedCity && ` a ${selectedCity}`}
      </h2>

      {noResults ? (
        <p>Nessun risultato trovato per "{searchQuery}"{selectedCity && ` a ${selectedCity}`}</p>
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