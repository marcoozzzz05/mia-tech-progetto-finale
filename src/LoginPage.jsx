import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./services/userService"; // Assumo che 'api' sia già configurato nel tuo userService
import Button1 from "./components/Buttons/Button1";
import eyeIcon from "./eye.svg";
import eyeOffIcon from "./eye-off.svg";
import logo from "./assets/img/logo/Glokal_purple_logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("glokal_user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    if (errorMessage) {
      setErrorMessage("");
    }
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await login({ email, password });
      // La funzione 'login' ora dovrebbe restituire un oggetto con token e dati utente
      if (response && response.data && response.data.token && response.data.user) {
        localStorage.setItem("glokal_token", response.data.token); // Salva il token (importante per future richieste)
        localStorage.setItem("glokal_user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        console.error("Risposta di login inattesa:", response);
        setErrorMessage("Errore inatteso durante il login.");
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      // Mantieni il messaggio di errore generico per non rivelare troppo
      setErrorMessage("Credenziali errate. Per favore, riprova.");
      // Puoi aggiungere log più specifici per il debug se necessario
      // if (error.response && error.response.data && error.response.data.message) {
      //   setErrorMessage(error.response.data.message);
      // }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <img src={logo} alt="" className="w-sm flex flex-col items-center mx-auto relative top-44 right-6" />
      <div className="flex flex-col items-center gap-4 w-full max-w-lg m-50 mx-auto p-6 bg-white shadow-2xl rounded-2xl">
        <div className="font-bold text-4xl">Bentornato!</div>
        <div className="font-semibold text-xl p-4 text-center">Inserisci le tue credenziali per accedere al tuo account.</div>
        <div className="font-semibold text-lg flex relative self-start top-2 left-2">Email</div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Inserisci la tua email"
          className="input-with-icon w-full p-4 border border-gray-400 rounded-lg mb-4"
        />
        <div className="w-full flex justify-between relative top-2 left-2">
          <span className="font-semibold text-lg">Password</span>
          <div className="text-blue-500 hover:underline">
            <Link to="/login/forgot-password">password dimenticata?</Link>
          </div>
        </div>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleInputChange}
            placeholder="Inserisci la tua password"
            className="lock w-full p-4 border mb-2.5 border-gray-400 rounded-lg"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Nascondi password" : "Mostra password"}
          >
            <img src={showPassword ? eyeIcon : eyeOffIcon} alt={showPassword ? "Nascondi password" : "Mostra password"} className="w-6 h-6" />
          </button>
        </div>
        {errorMessage && <div className="text-red-500 -mt-6 mb-2 text-center">{errorMessage}</div>}
        <Button1 text={isLoading ? "Accesso..." : "Accedi"} onClick={handleLogin} disabled={isLoading} />
        <div className="font-semibold ">
          Non hai un account? <Link to="/register-page" className="hover:underline">Registrati</Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;