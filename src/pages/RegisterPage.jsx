import React, { useEffect, useState, useCallback } from "react";
import Button1 from "../components/Buttons/Button1";
import { Link, useNavigate } from "react-router-dom";
import { createUser, uploadProfilePicture } from "../services/userService";
import logo from "../assets/img/logo/Glokal_purple_logo.png";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [role, setRole] = useState("USER");
  const [businessName, setBusinessName] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Stato di caricamento
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("glokal_user")) {
      navigate("/");
    }
  }, [navigate]); // Aggiunta la dipendenza navigate

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Utilizzo di useCallback per le funzioni di validazione per evitare ricreazioni inutili
  const validateEmail = useCallback((email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return !emailRegex.test(email) ? "L'email inserita non è valida!" : null;
  }, []);

  const validatePassword = useCallback((password, repeatPassword) => {
    if (password.length < 8) {
      return "La password deve contenere almeno 8 caratteri!";
    }
    if (!/[A-Z]/.test(password)) {
      return "La password deve contenere almeno una lettera maiuscola!";
    }
    if (!/\d/.test(password)) {
      return "La password deve contenere almeno un numero!";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "La password deve contenere almeno un carattere speciale!";
    }
    if (password !== repeatPassword) {
      return "Le due password devono coincidere!";
    }
    return null;
  }, []);

  const validateForm = useCallback(() => {
    if (!fullName || !email || !password || !repeatPassword) {
      return "Compila tutti i campi!";
    }
    if (role === "BUSINESS" && !businessName) {
      return "Inserisci il nome dell'attività!";
    }
    const emailError = validateEmail(email);
    if (emailError) {
      return emailError;
    }
    const passwordError = validatePassword(password, repeatPassword);
    if (passwordError) {
      return passwordError;
    }
    return null;
  }, [fullName, email, password, repeatPassword, role, businessName, validateEmail, validatePassword]);

  const handleRegistration = async () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      setMessage(errorMessage);
      return;
    }

    setMessage("");
    setIsLoading(true); // Imposta lo stato di caricamento

    const [firstName, ...lastNameParts] = fullName.split(" ");
    const lastName = lastNameParts.join(" ");

    const userData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      role: role,
      metadata: role === "BUSINESS" ? { business_name: businessName } : {},
    };

    try {
      const createUserResponse = await createUser(userData);

      if (createUserResponse.status === 201) {
        const newUser = createUserResponse.data;

        if (profilePicture) {
          const profilePictureData = new FormData();
          profilePictureData.append("profile_picture", profilePicture);
          console.log(profilePictureData.get("profile_picture"));
          const uploadResponse = await uploadProfilePicture(newUser._id, profilePictureData);
          newUser.profile_image = uploadResponse.data.profile_image;
        }

        localStorage.setItem("glokal_user", JSON.stringify(newUser));
        navigate("/");
      } else {
        setMessage("Errore durante la registrazione");
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Errore durante la registrazione");
    } finally {
      setIsLoading(false); // Resetta lo stato di caricamento
    }
  };

  const handleInputChange = () => {
    if (message) {
      setMessage("");
    }
  };

  return (
    <>
      <img src={logo} alt="" className="w-sm flex flex-col items-center mx-auto relative top-16 right-6" />
      <div className="flex flex-col items-center gap-4 w-full max-w-lg m-20 mx-auto p-6 bg-white shadow-2xl rounded-2xl">
        <div className="font-bold text-3xl p-4">Crea un nuovo Account</div>

        {/* Profile Picture Upload */}
        <div className="w-full flex flex-col items-center gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="profile-picture"
          />
          <label
            htmlFor="profile-picture"
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Seleziona Foto Profilo
          </label>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full"
            />
          )}
        </div>

        <div className="text-lg font-semibold mb-1.5 w-full relative top-3 left-2">
          Nome e Cognome
        </div>
        <input
          type="text"
          placeholder="Inserisci il tuo nome e cognome"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            handleInputChange();
          }}
          className="w-full p-4 border border-gray-400 rounded-lg mb-4"
        />

        <div className="text-lg font-semibold mb-1.5 w-full relative top-3 left-2">
          Indirizzo email
        </div>
        <input
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            handleInputChange();
          }}
          className="w-full p-4 border border-gray-400 rounded-lg mb-4"
        />

        <div className="text-lg font-semibold mb-1.5 w-full relative top-3 left-2">
          Tipo di Account
        </div>
        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            handleInputChange();
          }}
          className="w-full p-4 border border-gray-400 rounded-lg mb-4"
        >
          <option value="USER">Utente</option>
          <option value="BUSINESS">Attività Commerciale</option>
        </select>

        {role === "USER" && (
          <div className="text-gray-500 m-1 -mt-4">Un utente normale può scoprire, partecipare agli eventi, salvare nei preferiti, lasciare recensioni e seguire gli organizzatori per non perdere nulla!</div>
        )}

        {role === "BUSINESS" && (
          <>
            <div className="text-gray-500 m-1 -mt-4">Un utente business può creare, promuovere e gestire i suoi eventi, interagire con il pubblico e aumentare la sua visibilità con recensioni e iscrizioni!</div>
            <div className="text-lg font-semibold mb-1.5 w-full relative top-3 left-2">
              Nome Attività
            </div>
            <input
              type="text"
              placeholder="Inserisci il nome della tua attività"
              value={businessName}
              onChange={(e) => {
                setBusinessName(e.target.value);
                handleInputChange();
              }}
              className="w-full p-4 border border-gray-400 rounded-lg mb-4"
            />
          </>
        )}

        <div className="text-lg font-semibold mb-1.5 w-full relative top-3 left-2">
          Crea Password
        </div>
        <input
          type="password"
          placeholder="Inserisci la tua password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            handleInputChange();
          }}
          className="w-full p-4 border border-gray-400 rounded-lg mb-4"
        />

        <div className="text-lg font-semibold mb-1.5 w-full relative top-3 left-2">
          Ripeti Password
        </div>
        <input
          type="password"
          placeholder="Ripeti la nuova password"
          value={repeatPassword}
          onChange={(e) => {
            setRepeatPassword(e.target.value);
            handleInputChange();
          }}
          className="w-full p-4 border border-gray-400 rounded-lg mb-6"
        />

        {message && <p className="text-red-500 mb-4">{message}</p>}
        <Button1 onClick={handleRegistration} text={isLoading ? "Registrazione..." : "Registrati"} disabled={isLoading} />
        <div className="font-semibold">
          Hai già un account? <Link to="/login" className="hover:underline">Accedi</Link>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;