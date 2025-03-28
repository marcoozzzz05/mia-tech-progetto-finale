import { useState } from 'react';
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
        {/* Card principale */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Immagine */}
          <div className="h-100 w-full overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
  
          {/* Contenuto principale */}
          <div className="p-6">
            {/* Titolo e luogo */}
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-[#2e2e2e]">{post.title}</h1>
              <span className="bg-gray-100 text-[#2e2e2e] text-xs font-semibold px-3 py-1 rounded-full">
                {post.place}
              </span>
            </div>
  
            {/* Descrizione */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2 text-[#2e2e2e]">Descrizione evento</h2>
              <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
            </div>
  
            {/* Interazioni */}
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
  
            {/* Form recensione */}
            <div className="mb-8">
              <ReviewForm 
                onSubmit={handleReviewSubmit} 
                userId="user123" 
                eventName={post.title} 
              />
            </div>
  
            {/* Sezione recensioni */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-[#2e2e2e]">Recensioni</h2>
              
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
  
  export default PostDetail;