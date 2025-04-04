import logo from "./assets/img/logo/Glokal_purple_logo.png";
import Button1 from "./components/Buttons/Button1"
import { useState } from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
          return "L'email inserita non è valida!";
        }
        return null;
    }; 

    const handleSubmit = () => {
        const error = validateEmail(email);
        if (error) {
            setErrorMessage(error);
        } else {
            setErrorMessage("");
            alert("L'email per il reset della password è stata inviata!");
            setEmail("")
        }
    };

    return (
        <>
            <img src={logo} alt="" className="w-sm flex flex-col items-center mx-auto relative top-64 right-6" />
            <div className="flex flex-col items-center gap-4 w-full max-w-lg mt-70 mx-auto p-6 bg-white shadow-2xl rounded-2xl">
                <div className="font-bold text-4xl">Modifica Password</div>
                <div className="font-semibold text-xl p-4">Inserisci la tua email per modificare la tua password</div>
                <div className="font-semibold text-lg flex relative self-start top-2 left-2">Email</div>
                <input type="text" placeholder="Inserisci la tua email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="input-with-icon w-full p-4 border border-gray-400 rounded-lg mb-4" />
                {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
                <Button1 text={"Invia Email"} onClick={handleSubmit}/>           
                <div className="text-blue-500 hover:underline -mb-4 flex items-center gap-2"><FaArrowLeft className="text-xl cursor-pointer" onClick={() => navigate(-1)} /><span className="text-xl cursor-pointer" onClick={() => navigate(-1)}>torna indietro</span></div>
            </div>
        </>
    )
}

export default ForgotPassword