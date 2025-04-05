import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { updatePost, getPost } from "../../services/postService";
import { useNavigate } from "react-router";
import Button1 from "../Buttons/Button1";

const EditCard = () => {
    const storedUser = localStorage.getItem("glokal_user");
  
    const userData = storedUser ? JSON.parse(storedUser) : null;
    const userId = userData ? userData._id : null;
    
    const navigate = useNavigate();
    const { postId } = useParams();
    const [successMessage, setSuccessMessage] = useState("");
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostData = async () => {
          try {
            const response = await getPost(postId);
            const postData = response.data;
    
            if (!postData) throw new Error("Post non trovato");
    
            setPost(postData);        
          } catch (err) {
            console.error("Errore:", err);
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchPostData();
      }, [postId]);
  
      const handleChange = (event) => {
        const { target } = event;
        setPost((prevState) => ({
          ...prevState,
          [target.name]: target.value,
        }));
      };
  
    const handleImageChange = (e) => {
      const { target } = e;
      const image = target.files[0];
      toBase64(image).then(imageData => {
        setPost((prevState) => ({
          ...prevState,
          ['image']: imageData,
        }));
      });
    };
  
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
  });
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
        const response = await updatePost(postId, {title: post.title, content: post.content, place: post.place, image: post.image});
        setSuccessMessage("Post modificato con successo! Reindirizzamento...");
        setTimeout(() => {
          navigate(`/post-detail/${postId}`);
        }, 100);
      } catch (error) {
        setError(error.message || "Errore nella modificazione del post");
        console.error("Errore:", error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="flex flex-col items-center gap-4 w-full max-w-lg m-30 mx-auto p-6 bg-white shadow-2xl rounded-2xl">
        <h2 className="font-bold text-3xl mb-4">Edit post</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <label className="font-semibold text-lg">Titolo</label>
          <input type="text" name="title" placeholder="Titolo" value={post.title} onChange={handleChange} required
            className="w-full p-4 border border-gray-400 rounded-lg" />
  
          <label className="font-semibold text-lg">Contenuto</label>
          <textarea name="content" placeholder="Scrivi qualcosa..." value={post.content} onChange={handleChange} required
            className="w-full p-4 border border-gray-400 rounded-lg" />
  
          <label className="font-semibold text-lg">Luogo</label>
          <select name="place" value={post.place} onChange={handleChange}
            className="w-full p-4 border border-gray-400 rounded-lg">
            {["MILANO", "BERGAMO", "ROMA", "TORINO", "CAGLIARI", "PALERMO"].map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
  
          <label className="font-semibold text-lg">Immagine</label>
          <input type="file" accept="image/*" onChange={handleImageChange}
            className="w-full p-4 border border-gray-400 rounded-lg" />
  
          <div className='flex justify-center m-6'>
            <Button1 type="submit" disabled={loading} text={"Modifica post"}/>
          </div>
  
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    );
};

export default EditCard;