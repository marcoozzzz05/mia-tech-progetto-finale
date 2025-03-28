import { useState } from "react";
import { Star } from "lucide-react";
import Button1 from "../Buttons/Button1";

const ReviewForm = ({ onSubmit, userId, eventName }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (rating === 0) {
      setError("Devi assegnare almeno una stella per inviare la recensione!");
      return;
    }
    if (comment.trim() === "") {
      setError("Il campo commento non può essere vuoto.");
      return;
    }
  
    setError("");
    setSuccess("Recensione inviata con successo!");
    setRating(0);
    setComment("");
  
    setTimeout(() => {
      setSuccess(""); // Nasconde il messaggio dopo 5 secondi
    }, 5000);
  
    // Simula l'invio della recensione
    onSubmit({ rating, comment, userId, eventName });
  };

  // Gestisce la selezione delle stelle e rimuove eventuali errori
  const handleStarClick = (i) => {
    setRating(i + 1);
    if (rating === 0 && error) {
      setError(""); // Rimuove il messaggio di errore se viene selezionata almeno una stella
    }
  };

  return (
    <div className="flex justify-center items-center py-6 mb-20">
      <div className="w-80 p-6 bg-white shadow-lg rounded-2xl border border-gray-200 text-center">
        <h3 className="font-bold text-lg text-[#2e2e2e]">Lascia una Recensione</h3>
        
        <div className="flex justify-center mt-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 cursor-pointer ${i < rating ? 'text-[#ffc300]' : 'text-gray-300'}`}
              fill={i < rating ? 'currentColor' : 'none'}
              onClick={() => handleStarClick(i)}
            />
          ))}
        </div>
        
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        
        <textarea
          className="w-full mt-4 p-2 border rounded-md text-sm"
          rows="10"
          placeholder="Scrivi la tua recensione..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        
        <div className="mt-4 flex justify-center">
          <Button1 onClick={handleSubmit} text={"Invia recensione"} />
        </div>

        {success && (
            <p className="text-green-500 text-sm mt-2 flex items-center">
                ✅ {success}
            </p>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
