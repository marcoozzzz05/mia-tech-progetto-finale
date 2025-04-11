import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ CORRETTO QUI
import { deletePost } from "../../services/postService";
import { EllipsisVertical } from "lucide-react";
import Avatar from "../../assets/img/Avatar.png";

const EventCard = ({ post, onPostDeleted }) => {
  const navigate = useNavigate();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const optionsRef = useRef(null);
  const [myPost, setMyPost] = useState(false);

  // 🔒 Controllo: se il post non è ancora pronto
  if (!post || !post.userId) {
    return <p>Caricamento...</p>;
  }

  const toggleOptions = () => {
    setIsOptionsOpen((prev) => !prev);
  };

  const handleOutsideClick = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setIsOptionsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    const glokalUser = JSON.parse(localStorage.getItem("glokal_user"));
    
    if (glokalUser && glokalUser._id === post.userId._id) {
      setMyPost(true);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [post]);

  const handleDeletePost = async () => {
    setIsOptionsOpen(false);
    try {
      await deletePost(post._id);
      if (onPostDeleted) {
        onPostDeleted(post._id);
      }
    } catch (error) {
      console.error("Errore durante l'eliminazione del post:", error);
    }
  };

  const fullName = `${post.userId.first_name} ${post.userId.last_name}`;

  return (
    <div className="w-80 rounded-2xl shadow-lg overflow-hidden bg-white border border-gray-200">
      <div
        onClick={() => navigate(`/post-detail/${post._id}`)}
        className="relative cursor-pointer"
      >
        <img
          src={`http://localhost:3000/assets/${post.image}`}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={
                post.userId.profile_image
                  ? `http://localhost:3000/assets/${post.userId.profile_image}`
                  : Avatar
              }
              alt="Organizer"
              className="w-10 h-10 rounded-full bg-gradient-to-l from-[#6a0572] to-[#ffc300] p-0.5 object-cover"
            />
            <span className="font-semibold text-sm">{fullName || "Utente sconosciuto"}</span>
          </div>
          <div className="relative">
            {myPost && (
              <button onClick={toggleOptions} className="focus:outline-none">
                <EllipsisVertical className="w-5 h-5 text-gray-500 cursor-pointer" />
              </button>
            )}
            {isOptionsOpen && (
              <div
                ref={optionsRef}
                className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                role="menu"
              >
                <div className="py-1">
                  <button
                    onClick={() => navigate(`/edit-post/${post._id}`)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Modifica
                  </button>
                  <button
                    onClick={handleDeletePost}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
