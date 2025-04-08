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

<<<<<<< HEAD
const HandleLogout = () => {
  localStorage.clear();
  navigate("/landing-page")
}
=======
  // Funzione per il logout
  const handleLogout = () => {
    localStorage.removeItem("glokal_user"); // Rimuovi l'utente dal localStorage
    navigate("/login"); // Redirigi alla pagina di login
  };
>>>>>>> settings

  return (
<<<<<<< HEAD
    <div className="flex min-h-screen p-6 text-black">
      {/* Sidebar settings */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-opacity-20 p-6 rounded-lg">
        <div className="text-center">
          <img
            src={'http://localhost:3000/assets/' + profilo.profile_image }
            alt="Avatar"
            className="w-24 h-24 border-4 rounded-full mx-auto object-cover"
          />
          <h2 className="text-xl font-bold mt-2">{profilo.first_name} {profilo.last_name}</h2>
          <p className="text-sm text-gray-500">{profilo.email}</p>
        </div>

        <h3 className="mt-6 text-lg font-semibold text-center">SETTINGS</h3>
        <ul className="mt-4 space-y-4">
          {settingsOptions.map((option, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-opacity-10 rounded-lg cursor-pointer hover:bg-opacity-20"
              onClick={() => handleOptionClick(option.path)} // Naviga alla pagina
            >
              {option.name}
            </li>
          ))}
        </ul>

        <div className="flex justify-center mt-4">
          <Button1
            className="w-full md:w-auto bg-purple-500 py-2 rounded-full text-center text-white font-bold hover:bg-purple-600"
            text={"LOGOUT"}
            onClick={HandleLogout} // Logout
          />
        </div>
      </div>

      {/* Content panel per Desktop */}
      {!isMobile && selectedOption && (
        <div className="w-2/3 p-6 text-black rounded-lg ml-6">
          {renderContent()} {/* Renderizza il contenuto in base all'opzione */}
        </div>
      )}

      {/* Content panel per Mobile */}
      {isMobile && selectedOption && ( // Mostra solo se un'opzione è selezionata
        <div className="w-full p-6 text-black rounded-lg ml-6">
=======
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
  
>>>>>>> settings
          <div>
            <EditProfile />
          </div>
        </div>
      </div>
    );
  }  
