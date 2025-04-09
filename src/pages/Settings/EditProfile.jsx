import { useState, useEffect } from "react";
import Button1 from "../../components/Buttons/Button1";
import { updateUserProfile } from "../../services/userService";

const EditProfile = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Funzione per validare l'email
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const handleSave = () => {
        if (!validateEmail(email)) {
            setError("Email non valida.");
            return;
        }

        setIsLoading(true);
        setError(""); // Resetta eventuali errori precedenti

        const userData = {
            first_name: fullName.split(" ")[0],  // Primo nome
            last_name: fullName.split(" ")[1] || "", // Cognome
            email: email,
        };

        // Recupera l'ID utente dal localStorage
        const userDataFromStorage = localStorage.getItem("glokal_user");
        if (!userDataFromStorage) {
            setError("User not found");
            setIsLoading(false);
            return;
        }

        // Parsing dell'oggetto utente salvato in precedenza
        const parsedUserData = JSON.parse(userDataFromStorage);

        // Ora modifichi i dati in base a quello che hai ricevuto
        parsedUserData.first_name = userData.first_name;
        parsedUserData.last_name = userData.last_name;
        parsedUserData.email = userData.email;

        // Chiamata alla funzione updateUserProfile
        updateUserProfile(parsedUserData._id, userData)
            .then((response) => {
                const updatedUser = response.data;

                if (updatedUser && updatedUser.email) {
                    localStorage.setItem("glokal_user", JSON.stringify(updatedUser));
                    setFullName(`${updatedUser.first_name} ${updatedUser.last_name}`);
                    setEmail(updatedUser.email);
                    alert("Profilo aggiornato!");
                } else {
                    setError("Errore nell'aggiornamento del profilo.");
                }

                setIsLoading(false);
            })
            .catch((err) => {
                // Gestione degli errori della risposta
                if (err.response) {
                    console.error("Errore del server:", err.response.data);
                    setError(`Errore: ${err.response.data.message || "Errore sconosciuto"}`);
                } else if (err.request) {
                    console.error("Errore nella richiesta:", err.request);
                    setError("Nessuna risposta dal server.");
                } else {
                    console.error("Errore nella configurazione della richiesta:", err.message);
                    setError("Errore sconosciuto.");
                }
                setIsLoading(false);
            });
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("glokal_user"));
        if (user) {
            setFullName(`${user.first_name} ${user.last_name}`);
            setEmail(user.email);
        }
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto bg-gray-100 rounded-xl mt-12 p-6 shadow-md">
            <h2 className="text-gray-700 text-xl font-semibold mb-6 text-center">Modifica Profilo</h2>
            <div className="space-y-4">
                <div>
                    <label className="text-gray-500 text-sm">Nome e Cognome</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>
                <div>
                    <label className="text-gray-500 text-sm">Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex justify-center pt-4">
                    <Button1
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                        text={isLoading ? "Salvataggio..." : "Salva"}
                        onClick={handleSave}
                        disabled={isLoading || !fullName || !email || error}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
