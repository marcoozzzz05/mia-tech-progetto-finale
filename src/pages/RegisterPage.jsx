import { useEffect, useState } from "react";
import Button1 from "../components/Buttons/Button1";
import { Link, useNavigate } from "react-router-dom";
import { createUser, uploadProfilePicture } from "../services/userService";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [role, setRole] = useState("USER");
  const [businessName, setBusinessName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("glokal_user")) {
      navigate("/");
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
    }
  };

  const validateForm = () => {
    if (![fullName, username, address, password, repeatPassword].every(Boolean)) {
      return "Compila tutti i campi!";
    }

    if (role === "BUSINESS" && !businessName) {
      return "Inserisci il nome dell'attività!";
    }

    const emailError = validateEmail(address);
    if (emailError) {
      return emailError;
    }

    const passwordError = validatePassword(password, repeatPassword);
    if (passwordError) {
      return passwordError;
    }

    return null;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return "L'email inserita non è valida!";
    }

    return null;
  };

  const validatePassword = (password, repeatPassword) => {
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
  };

  const handleButton = () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      setMessage(errorMessage);
      return;
    }
    
    setMessage("");
    
    // Create user data object
    const userData = {
      first_name: fullName.split(" ")[0],
      last_name: fullName.split(" ")[1],
      email: address,
      password: password,
      role: role,
      metadata: role === "BUSINESS" ? { business_name: businessName } : {}
    };

    // First create the user
    createUser(userData)
      .then((response) => {
        if (response.status === 201) {
          const userData = response.data;
          
          // If a profile picture was selected, upload it
          if (profilePicture) {
            return uploadProfilePicture(userData._id, profilePicture)
              .then((uploadResponse) => {
                // Update user data with the new profile picture URL
                userData.profile_image = uploadResponse.data.profile_image;
                // Store updated user data in localStorage
                localStorage.setItem("glokal_user", JSON.stringify(userData));
                return userData;
              })
              .catch((err) => {
                console.error('Error uploading profile picture:', err);
                // Store user data in localStorage even if profile picture upload fails
                localStorage.setItem("glokal_user", JSON.stringify(userData));
                return userData;
              });
          } else {
            // If no profile picture, store user data in localStorage
            localStorage.setItem("glokal_user", JSON.stringify(userData));
            return userData;
          }
        }
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setMessage(err.response?.data?.message || "Errore durante la registrazione");
      });
  };

  const handleChange = () => {
    if (message) {
      setMessage("");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4 w-full max-w-lg mb-28 mx-auto p-6 bg-white shadow-2xl rounded-2xl">
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
          onChange={(e) => {
            setFullName(e.target.value);
            handleChange();
          }}
          className="w-full p-4 border border-gray-400 rounded-lg mb-4"
        />

        <div className="text-lg font-semibold mb-1.5 w-full relative top-3 left-2">
          Username
        </div>
        <input
          type="text"
          placeholder="Inserisci il tuo username"
          onChange={(e) => {
            setUserName(e.target.value);
            handleChange();
          }}
          className="w-full p-4 border border-gray-400 rounded-lg mb-4"
        />

        <div className="text-lg font-semibold mb-1.5 w-full relative top-3 left-2">
          Indirizzo email
        </div>
        <input
          type="email"
          placeholder="name@example.com"
          onChange={(e) => {
            setAddress(e.target.value);
            handleChange();
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
            handleChange();
          }}
          className="w-full p-4 border border-gray-400 rounded-lg mb-4"
        >
          <option value="USER">Utente</option>
          <option value="BUSINESS">Attività Commerciale</option>
        </select>

        {role === "BUSINESS" && (
          <>
            <div className="text-lg font-semibold mb-1.5 w-full relative top-3 left-2">
              Nome Attività
            </div>
            <input
              type="text"
              placeholder="Inserisci il nome della tua attività"
              value={businessName}
              onChange={(e) => {
                setBusinessName(e.target.value);
                handleChange();
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
          onChange={(e) => {
            setPassword(e.target.value);
            handleChange();
          }}
          className="w-full p-4 border border-gray-400 rounded-lg mb-4"
        />

        <div className="text-lg font-semibold mb-1.5 w-full relative top-3 left-2">
          Ripeti Password
        </div>
        <input
          type="password"
          placeholder="Ripeti la nuova password"
          onChange={(e) => {
            setRepeatPassword(e.target.value);
            handleChange();
          }}
          className="w-full p-4 border border-gray-400 rounded-lg mb-6"
        />

        {message && <p className="text-red-500 mb-4">{message}</p>}
        <Button1 onClick={handleButton} text={"Registrati"} />
        <div className="font-semibold">
          Hai già un account? <Link to="/login">Accedi</Link>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
