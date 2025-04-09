import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import EditProfile from "./EditProfile";
import LanguageCity from "./LanguageCity";
import Button1 from "../../components/Buttons/Button1";
import Terms from "./Terms";

const settingsOptions = [
  { name: "Edita Profilo", path: "/edit-profile" },
  { name: "Lingua e Area Geografica", path: "/language" },
];

export default function Settings() {
  const [selectedOption, setSelectedOption] = useState("/edit-profile");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [profilo, setProfilo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  useEffect(() => {
    const storedUser = localStorage.getItem("glokal_user");
    if (storedUser) {
        const user = JSON.parse(storedUser);
        setProfilo(user);
    } else {
        console.warn("Nessun utente loggato trovato in localStorage");
        navigate("/");
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
              className="w-24 h-24 rounded-full object-cover border-4"
            />
            <h2 className="mt-4 text-xl font-semibold">{profilo.first_name} {profilo.last_name}</h2>
            <p className="text-gray-500">{profilo.email}</p>
  
            <Button1
              text="Logout"
              onClick={handleLogout}
            />
          </div>
  
          <div>
            {renderContent()}
            <button
              onClick={() => navigate("/settings")} // Torna al menu delle impostazioni
              className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-full"
            >
              Torna al Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
