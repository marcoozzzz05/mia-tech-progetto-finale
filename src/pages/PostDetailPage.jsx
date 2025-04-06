import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router";
import { getPost, likePost } from "../services/postService";
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
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:3000/assets/${imagePath}`;
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await getPost(postId);
        const postData = response.data;
        console.log(postData);
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

  const handleLike = async () => {
    try {
      if (!currentUser._id) throw new Error("Devi effettuare il login");

      await likePost(postId, currentUser._id);

      const newLikeStatus = !isLiked;
      setIsLiked(newLikeStatus);
      setLikeCount(prev => newLikeStatus ? prev + 1 : prev - 1);

      setPost(prev => ({
        ...prev,
        likes: newLikeStatus
          ? [...(prev.likes || []), currentUser._id]
          : prev.likes?.filter(id => id !== currentUser._id) || []
      }));
    } catch (err) {
      console.error("Errore nel like:", err);
      setIsLiked(!isLiked);
      setLikeCount(prev => isLiked ? prev + 1 : prev - 1);
    }
  };

  if (loading) return <div className="text-center py-8">Caricamento...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Errore: {error}</div>;
  if (!post) return <div className="text-center py-8">Post non trovato</div>;

  return (
    <div className="max-w-4xl mx-auto mb-20 p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="w-full h-80 overflow-hidden">
          {post.image ? (
            <img
              src={getImageUrl(post.image)}
              alt={post.title || "Immagine post"}
              className="w-full h-full object-cover"
              onError={(e) => e.target.src = '/placeholder.jpg'}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Nessuna immagine</span>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <a className="flex items-center gap-3 cursor-pointer" onClick={() => {navigate(`/user/${post.userId._id}`)}}>
              <div className="shrink-0 rounded-full p-0.5 bg-gradient-to-l from-[#6a0572] to-[#ffc300]">
                {post.userId?.profile_image ? (
                  <img
                    src={getImageUrl(post.userId.profile_image)}
                    alt={`${post.userId.first_name} ${post.userId.last_name}`}
                    className="w-16 h-16 rounded-full object-cover "
                    onError={(e) => e.target.src = '/default-profile.jpg'}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 text-sm">
                      {post.userId?.first_name?.charAt(0)}{post.userId?.last_name?.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="font-medium truncate">
                  {post.userId?.first_name || "Nome"} {post.userId?.last_name || "Cognome"}
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
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isLiked ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-700'
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

/*import { useState } from 'react';
import { Heart, Bookmark, Share2 } from 'lucide-react'
import ReviewForm from '../components/Reviews/ReviewForm';
import ReviewCard from '../components/Reviews/ReviewCard';

const PostDetail = () => {
    // Dati mock per il post
    const [post, setPost] = useState({
      _id: "mock123",
      title: "Festival Jazz Under the Stars",
      content: "Un'esperienza indimenticabile con i migliori artisti jazz internazionali sotto le stelle del Parco della Cittadella. Porta una coperta e goditi una serata di musica rilassante con cibo e bevande disponibili sul posto.\n\n• Data: 15 Luglio 2023\n• Orario: 20:00 - 02:00\n• Location: Parco della Cittadella, Milano\n• Prezzo: €35.00",
      place: "MILANO",
      image: "https://img.freepik.com/vettori-gratuito/jazz-club-con-banda-musicale-sul-palco_107791-13957.jpg?t=st=1743168083~exp=1743171683~hmac=9ce2bd67259f03b0e3f44644b2ecc97f3365fda341234df222dcd4e037f5c966&w=1800",
      likes: ["user123"],
      isSaved: false
    });
  
    // Dati mock per le recensioni
    const [reviews, setReviews] = useState([
      {
        eventId: "mock123",
        eventName: "Festival Jazz Under the Stars",
        rating: 5,
        comment: "Atmosfera magica e musica sublime! L'organizzazione era impeccabile e la location perfetta per un concerto jazz."
      },
      {
        eventId: "mock123",
        eventName: "Festival Jazz Under the Stars",
        rating: 4,
        comment: "Bellissima esperienza, anche se un po' affollata. I musicisti erano eccezionali, specialmente il quartetto francese."
      }
    ]);
  
    const handleLike = () => {
      setPost(prev => {
        const isLiked = prev.likes.includes("user123");
        return {
          ...prev,
          likes: isLiked 
            ? prev.likes.filter(id => id !== "user123") 
            : [...prev.likes, "user123"]
        };
      });
    };
  
    const handleSave = () => {
      setPost(prev => ({
        ...prev,
        isSaved: !prev.isSaved
      }));
    };
  
    const handleReviewSubmit = (newReview) => {
      setReviews([{
        eventId: post._id,
        eventName: post.title,
        rating: newReview.rating,
        comment: newReview.comment,
        createdAt: new Date().toISOString()
      }, ...reviews]);
    };
  
    const isLiked = post.likes.includes("user123");
  
    return (
      <div className="max-w-4xl mx-auto p-4 mb-20">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-100 w-full overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
  
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-[#2e2e2e]">{post.title}</h1>
              <span className="bg-gray-100 text-[#2e2e2e] text-xs font-semibold px-3 py-1 rounded-full">
                {post.place}
              </span>
            </div>
  
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 text-[#2e2e2e]">Descrizione evento</h2>
              <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
            </div>
  
            <div className="flex gap-4 mb-6 border-t border-b border-gray-100 py-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isLiked ? 'text-red-500 bg-red-50' : 'text-gray-700 bg-gray-100'}`}
              >
                <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
                <span>{isLiked ? 'Ti piace' : 'Mi piace'} ({post.likes.length})</span>
              </button>
  
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${post.isSaved ? 'text-blue-500 bg-blue-50' : 'text-gray-700 bg-gray-100'}`}
              >
                <Bookmark className="w-5 h-5" fill={post.isSaved ? 'currentColor' : 'none'} />
                <span>{post.isSaved ? 'Salvato' : 'Salva'}</span>
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 text-[#2e2e2e]">Recensioni</h2>
              
             <div className="m-6">
              <ReviewForm 
                onSubmit={handleReviewSubmit} 
                userId="user123" 
                eventName={post.title} 
              />
            </div>

              {reviews.length > 0 ? (
                <div className="flex flex-col md:flex-row md:flex-wrap gap-4 m-10 justify-center">
                  {reviews.map((review, index) => (
                    <div key={index}>
                        <ReviewCard review={review} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic py-4">
                  Questo evento non ha ancora ricevuto recensioni. Lascia tu la prima!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default PostDetail;*/