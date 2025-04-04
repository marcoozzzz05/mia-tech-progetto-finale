import { useState } from "react";
import { createPost } from "../../services/postService";
import { useNavigate } from "react-router";
import Button1 from "../Buttons/Button1";

const PostForm = ({ onPostCreated }) => {
  const storedUser = localStorage.getItem("glokal_user");
  console.log("Dati presenti in localStorage:", storedUser);

  const userData = storedUser ? JSON.parse(storedUser) : null;
  const userId = userData ? userData._id : null;
  console.log("User ID dopo il parsing:", userId);
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "", place: "--", image: null });
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    console.log(formData);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    data.append("userId", userId);
    Object.keys(formData).forEach((key) => formData[key] && data.append(key, formData[key]));

    try {
      const response = await createPost(data);
      const newPost = response.data || response;
      console.log("Dati del post:", newPost);

      // Controlla se l'ID è presente in qualche campo
      const postId = newPost._id || newPost.id || newPost.userId;
      if (!postId) {
        throw new Error("ID del post non ricevuto dal server");
      }

      setSuccessMessage("Post creato con successo! Reindirizzamento...");
      setTimeout(() => {
        if (onPostCreated) onPostCreated(newPost);
        navigate(`/post-detail/${postId}`);
      }, 2000);
    } catch (error) {
      setError(error.message || "Errore nella creazione del post");
      console.error("Errore:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg m-30 mx-auto p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="font-bold text-3xl mb-4">Crea un nuovo post</h2>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <label className="font-semibold text-lg">Titolo</label>
        <input type="text" name="title" placeholder="Titolo" value={formData.title} onChange={handleChange} required
          className="w-full p-4 border border-gray-400 rounded-lg" />

        <label className="font-semibold text-lg">Contenuto</label>
        <textarea name="content" placeholder="Scrivi qualcosa..." value={formData.content} onChange={handleChange} required
          className="w-full p-4 border border-gray-400 rounded-lg" />

        <label className="font-semibold text-lg">Luogo</label>
        <select name="place" value={formData.place} onChange={handleChange}
          className="w-full p-4 border border-gray-400 rounded-lg">
          {["MILANO", "BERGAMO", "ROMA", "TORINO", "CAGLIARI", "PALERMO"].map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <label className="font-semibold text-lg">Immagine</label>
        <input type="file" accept="image/*" onChange={handleImageChange}
          className="w-full p-4 border border-gray-400 rounded-lg" />

        <div className='flex justify-center m-6'>
          <Button1 type="submit" disabled={loading} text={"Crea post"}/>
        </div>

        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PostForm;

/*import { useState } from 'react'
import { createPost } from '../../services/postService'
import Button1 from "../Buttons/Button1";

const PostForm = ({ userId, onPostCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    place: "MILANO",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const postData = new FormData();
    postData.append("userId", userId);
    postData.append("title", formData.title);
    postData.append("content", formData.content);
    postData.append("place", formData.place);
    if (formData.image) postData.append("image", formData.image);

    try {
      const newPost = await createPost(postData);
      onPostCreated(newPost);
      setFormData({ title: "", content: "", place: "MILANO", image: null });
    } catch (err) {
      setError("Errore nella creazione del post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg m-30 mx-auto p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="font-bold text-3xl mb-4">Crea un nuovo post</h2>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <label className="font-semibold text-lg">Titolo</label>
        <input type="text" name="title" placeholder="Titolo" value={formData.title} onChange={handleChange} required 
          className="w-full p-4 border border-gray-400 rounded-lg" />

        <label className="font-semibold text-lg">Contenuto</label>
        <textarea name="content" placeholder="Scrivi qualcosa..." value={formData.content} onChange={handleChange} required 
          className="w-full p-4 border border-gray-400 rounded-lg" />

        <label className="font-semibold text-lg">Luogo</label>
        <select name="place" value={formData.place} onChange={handleChange} 
          className="w-full p-4 border border-gray-400 rounded-lg">
          {["MILANO", "BERGAMO", "ROMA", "TORINO", "CAGLIARI", "PALERMO"].map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <label className="font-semibold text-lg">Immagine</label>
        <input type="file" accept="image/*" onChange={handleFileChange} 
          className="w-full p-4 border border-gray-400 rounded-lg" />
        <div className='flex justify-center m-6'>
            <Button1 text={loading ? "Caricamento..." : "Crea Post"} disabled={loading} />
        </div>
        
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PostForm*/
