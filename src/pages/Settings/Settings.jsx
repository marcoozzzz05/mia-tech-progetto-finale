import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import EditProfile from "./EditProfile";
import Button1 from "../../components/Buttons/Button1";

export default function Settings() {
  const [profilo, setProfilo] = useState({});
  const navigate = useNavigate();

  // Recupera l'utente dal localStorage e mostra i dati
  useEffect(() => {
    const storedUser = localStorage.getItem("glokal_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setProfilo(user);
    } else {
      console.warn("Nessun utente loggato trovato in localStorage");
      navigate("/login");
    }
  }, [navigate]);

  // Funzione per il logout
  const handleLogout = () => {
    localStorage.removeItem("glokal_user"); // Rimuovi l'utente dal localStorage
    navigate("/login"); // Redirigi alla pagina di login
  };

  return (
      <div className="min-h-screen p-40">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-10">Impostazioni</h1>
  
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6">
          <div className="flex flex-col items-center mb-10">
            <img
              src={profilo.profile_image ? `http://localhost:3000/assets/${profilo.profile_image}` : "/default-avatar.png"}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover bg-gradient-to-l from-[#6a0572] to-[#ffc300] p-1"
            />
            <h2 className="mt-4 text-xl font-semibold">{profilo.first_name} {profilo.last_name}</h2>
            <p className="text-gray-500">{profilo.email}</p>
  
            <Button1
              text="Logout"
              onClick={handleLogout}
            />
          </div>
  
          <div>
            <EditProfile />
          </div>
        </div>
      </div>
    );
  }  
