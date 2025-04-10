import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button1 from "../../components/Buttons/Button1";
import { getFavoritePosts } from "../../services/postService";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("glokal_user")) || {};

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!currentUser._id) throw new Error("Utente non autenticato");
        const response = await getFavoritePosts(currentUser._id);
        setFavorites(response.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [currentUser._id]);

  if (loading)
    return <div className="text-center py-8">Caricamento...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Errore: {error}</div>;

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <div className="flex flex-col items-center text-center">
          <div className="bg-white p-4 rounded-full shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-16 h-16 text-pink-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h2 className="text-[#2e2e2e] font-semibold text-lg mt-4">
            Non hai ancora nessun preferito
          </h2>
          <p className="text-[#2e2e2e] text-sm mt-2 mb-2">
            Scopri gli eventi più interessanti vicino a te!
          </p>
          <a href="/">
            <Button1 text={"Esplora"} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mb-20">
      <h1 className="text-2xl font-bold mb-4">I tuoi preferiti</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {favorites.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
            onClick={() => navigate(`/post-detail/${post._id}`)}
          >
            {post.image && (
              <img
                src={
                  post.image.startsWith("http")
                    ? post.image
                    : `http://localhost:3000/assets/${post.image}`
                }
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="font-semibold text-lg">{post.title}</h2>
              <p className="text-gray-600 text-sm">{post.place}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;
