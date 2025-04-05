import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { getPost, deletePost } from "../../services/postService";
import { EllipsisVertical } from "lucide-react";

const EventCard = ({ post, onPostDeleted } ) => {
  const navigate = useNavigate();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const optionsRef = useRef(null);

  if (!post) {
    return <p>Caricamento...</p>;
  }

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleOutsideClick = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setIsOptionsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleDeletePost = async () => {
    setIsOptionsOpen(false);
    try {
      const response = await deletePost(post._id);
      if (onPostDeleted) {
        onPostDeleted(post._id);
      }
    } catch (error) {
      console.error("Errore durante l'eliminazione del post:", error);
      // Gestisci l'errore qui (es. mostrando un messaggio all'utente)
    }
  };

  const handleEditPost = () => {
    console.log("Modifica post:", post._id);
    setIsOptionsOpen(false);
    // Qui puoi implementare la logica per navigare alla pagina di modifica del post
  };

  return (
    <div className="w-80 rounded-2xl shadow-lg overflow-hidden bg-white border border-gray-200">
      <div onClick={() => navigate(`/post-detail/${post._id}`)} className="relative cursor-pointer">
        <img
          src={'http://localhost:3000/assets/' + post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={'http://localhost:3000/assets/' + (post.user?.profile_image || 'default-avatar.jpg')}
              alt="Organizer"
              className="w-10 h-10 rounded-full border"
            />
            <span className="font-semibold text-sm">{post.user?.name || "Utente sconosciuto"}</span>
          </div>
          <div className="relative">
            <button onClick={toggleOptions} className="focus:outline-none">
              <EllipsisVertical className="w-5 h-5 text-gray-500 cursor-pointer" />
            </button>
            {isOptionsOpen && (
              <div
                ref={optionsRef}
                className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu-button"
              >
                <div className="py-1" role="none">
                <button
                   onClick={() => navigate(`/edit-post/${post._id}`)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    role="menuitem"
                  >
                    Modifica
                  </button>
                  <button
                    onClick={handleDeletePost}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    role="menuitem"
                  >
                    Cancella
                  </button>                
                </div>
              </div>
            )}
          </div>
        </div>
        <h2 className="font-bold text-lg mt-2">{post.title}</h2>
        <p className="text-gray-500 text-sm mt-1">{post.place}</p>
        <p className="text-gray-500 text-sm mt-1">Like: {post.likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default EventCard;