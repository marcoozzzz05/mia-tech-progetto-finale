import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import EditProfile from "./EditProfile";
import LanguageCity from "./LanguageCity";
import Button1 from "../../components/Buttons/Button1";
import Terms from "./Terms";

const settingsOptions = [
  { name: "Lingua e Area Geografica", path: "/language" },
  { name: "Termini e Condizioni", path: "/terms" },
  { name: "Edita Profilo", path: "/edit-profile" },
];

export default function Settings() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    // Aggiungi la logica per il logout (ad esempio, rimuovendo un token)
    console.log("User logged out");
    navigate("/login");
  };

  const handleOptionClick = (path) => {
    if (isMobile) {
      navigate(path); // Naviga alla pagina per mobile
      setSelectedOption(path); // Salva l'opzione selezionata
    } else {
      setSelectedOption(path); // Solo per desktop, aggiorna il selezionato
    }
  };

  const renderContent = () => {
    if (selectedOption === "/edit-profile") {
      return <EditProfile />;
    } else if (selectedOption === "/language") {
      return <LanguageCity />;
    } else if (selectedOption === "/terms") {
      return <Terms />;
    }
    return (
      <div>
        <h2 className="text-xl font-semibold">Welcome to the Settings Page</h2>
        <p className="text-sm text-gray-300 mt-2">
          Select an option from the menu to see more details.
        </p>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen p-6 text-black">
      {/* Sidebar settings */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-opacity-20 p-6 rounded-lg">
        <div className="text-center">
          <img
            src="https://cdn.wallpapersafari.com/5/85/7SkDjy.jpg"
            alt="Avatar"
            className="w-24 h-24 border-4 border-purple-800 rounded-full mx-auto"
          />
          <h2 className="text-xl font-bold mt-2">Peter Parker</h2>
          <p className="text-sm text-gray-500">@spiderman2000</p>
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
            onClick={handleLogout} // Logout
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
