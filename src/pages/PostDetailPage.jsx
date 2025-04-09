import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getPost, likePost } from "../services/postService";
import { updateUserProfile } from "../services/userService";
import { Heart } from "lucide-react";

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("glokal_user")) || {};

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:3000/assets/${imagePath}`;
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await getPost(postId);
        const postData = response.data;
        if (!postData) throw new Error("Post non trovato");

        setPost(postData);
        setLikeCount(postData.likesCount || postData.likes?.length || 0);
        setIsLiked(postData.likes?.includes(currentUser._id) || false);
      } catch (err) {
        console.error("Errore:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId, currentUser._id]);

  const handleLike = () => {

    updateLikePost();
    updateLikeUser();
    
    console.log(currentUser)
  }

  const updateLikeUser = async () => {
    try {
      if (!currentUser._id) throw new Error("Devi effettuare il login");

      // Calcola il nuovo stato del like
      const newLikeStatus = !isLiked;
    
      // Aggiorna localmente le informazioni del post (opzionale)
      const userLike = newLikeStatus
      ? [...(currentUser.likes || []), postId]
      : currentUser.likes?.filter((_id) => _id !==postId) || [];

        // Chiamata al backend per aggiornare il like
        await updateUserProfile( currentUser._id, userLike );

      // A questo punto, il DB è aggiornato e la pagina dei favoriti (che userà il backend)
      // mostrerà il post come favorito oppure non lo mostrerà.
    } catch (err) {
      console.error("Errore nel like:", err);
      // Puoi gestire eventuali rollback o notificare l'utente
    }

  }

  const updateLikePost = async () => {
    try {
      if (!currentUser._id) throw new Error("Devi effettuare il login");

      // Chiamata al backend per aggiornare il like
      await likePost(postId, currentUser._id);

      // Calcola il nuovo stato del like
      const newLikeStatus = !isLiked;
      setIsLiked(newLikeStatus);
      setLikeCount((prev) => (newLikeStatus ? prev + 1 : prev - 1));

      // Aggiorna localmente le informazioni del post (opzionale)
      const updatedLikes = newLikeStatus
        ? [...(post.likes || []), currentUser._id]
        : post.likes?.filter((id) => id !== currentUser._id) || [];
      setPost({ ...post, likes: updatedLikes });

      // A questo punto, il DB è aggiornato e la pagina dei favoriti (che userà il backend)
      // mostrerà il post come favorito oppure non lo mostrerà.
    } catch (err) {
      console.error("Errore nel like:", err);
      // Puoi gestire eventuali rollback o notificare l'utente
    }
  };

  if (loading)
    return <div className="text-center py-8">Caricamento...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Errore: {error}</div>;
  if (!post)
    return <div className="text-center py-8">Post non trovato</div>;

  return (
    <div className="max-w-4xl mx-auto mb-20 p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="w-full h-80 overflow-hidden">
          {post.image ? (
            <img
              src={getImageUrl(post.image)}
              alt={post.title || "Immagine post"}
              className="w-full h-full object-cover"
              onError={(e) => (e.target.src = "/placeholder.jpg")}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Nessuna immagine</span>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <a
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                navigate(`/user/${post.userId._id}`);
              }}
            >
              <div className="shrink-0 rounded-full p-0.5 bg-gradient-to-l from-[#6a0572] to-[#ffc300]">
                {post.userId?.profile_image ? (
                  <img
                    src={getImageUrl(post.userId.profile_image)}
                    alt={`${post.userId.first_name} ${post.userId.last_name}`}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) =>
                      (e.target.src = "/default-profile.jpg")
                    }
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 text-sm">
                      {post.userId?.first_name?.charAt(0)}
                      {post.userId?.last_name?.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="font-medium truncate">
                  {post.userId?.first_name || "Nome"}{" "}
                  {post.userId?.last_name || "Cognome"}
                </p>
              </div>
            </a>

            {post.place && (
              <span className="bg-[#F7F1F7] text-[#6a0572] px-3 py-1 rounded-full text-sm">
                {post.place}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold pt-2">
            {post.title || "Nessun titolo disponibile"}
          </h1>

          <p className="whitespace-pre-line text-gray-700 pb-4">
            {post.content || "Nessun contenuto disponibile"}
          </p>

          <div className="border-t pt-4 flex justify-between items-center">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isLiked
                  ? "bg-red-100 text-red-500"
                  : "bg-gray-100 text-gray-700"
                }`}
            >
              <Heart
                className="h-5 w-5"
                fill={isLiked ? "currentColor" : "none"}
                strokeWidth={2}
              />
              <span>Mi piace ({likeCount})</span>
            </button>

            {post.createdAt && (
              <span className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
