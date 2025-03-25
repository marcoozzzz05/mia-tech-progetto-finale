import { useState, useEffect } from "react"
import Button1 from "../components/Buttons/Button1"
import { Link, useNavigate } from "react-router-dom"
import { createUser } from "../services/userService";

const RegisterPage = () => {
    const [fullName, setFullName] = useState("")
    const [username, setUserName] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [message, setMessage] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("glokal_user")) {
            navigate("/")
        }
      }, [])

    const validateForm = () => {
        if (![fullName, username, address, password, repeatPassword].every(Boolean)) {
            return "Compila tutti i campi!";
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
        const errorMessage = validateForm()
        if (errorMessage) {
            setMessage(errorMessage)
            return;
        } 
        setMessage("")
        const user = {
            fullName: fullName,
            username: username,
            address: address,
            password: password
        }
    
    createUser(user)
    .then((response) => {
      if (response.status == 201) {
        // localStorage
        localStorage.setItem("glokal_user", JSON.stringify(user))
        // navigate
        navigate("/");
      }
    })
    .catch((err) => {
        console.error(err)
    })    
    console.log(user)
    };

    const handleChange = () => {
        if (message) {
            setMessage("")
        } 
    };
    
    return (
        <>  
                <div className="flex flex-col items-center gap-4 w-full max-w-lg mb-20 mx-auto p-6 bg-white shadow-2xl rounded-2xl">

                <div className="font-bold text-3xl p-4">Crea un nuovo Account</div>
                <div className="text-lg font-semibold mb-1.5 w-full relative top-3 left-2">Nome e Cognome</div>
                <input type="text" placeholder="Inserisci il tuo nome e cognome" onChange={(e) => { setFullName(e.target.value); handleChange() }}
                    className="w-full p-4 border border-gray-400 rounded-lg mb-4"/>

                <div className="text-lg font-semibold mb-1.5 w-full relative top-3 left-2">Username</div>
                <input type="text" placeholder="Inserisci il tuo username" onChange={(e) => { setUserName(e.target.value); handleChange() }}
                    className="w-full p-4 border border-gray-400 rounded-lg mb-4"/>

                <div className="text-lg font-semibold mb-1.5 w-full relative top-3 left-2">Indirizzo email</div>
                <input type="email" placeholder="name@example.com" onChange={(e) => { setAddress(e.target.value); handleChange() }}
                    className="w-full p-4 border border-gray-400 rounded-lg mb-4"/>

                <div className="text-lg font-semibold mb-1.5 w-full relative top-3 left-2">Crea Password</div>
                <input type="password" placeholder="Inserisci la tua password" onChange={(e) => { setPassword(e.target.value); handleChange() }}
                    className="w-full p-4 border border-gray-400 rounded-lg mb-4"/>

                <div className="text-lg font-semibold mb-1.5 w-full relative top-3 left-2">Ripeti Password</div>
                <input type="password" placeholder="Ripeti la nuova password" onChange={(e) => { setRepeatPassword(e.target.value); handleChange() }}
                    className="w-full p-4 border border-gray-400 rounded-lg mb-6"/>
                
                {message}
                <Button1 onClick={handleButton} text={"Registrati"}/>
                <div className="font-semibold ">Hai già un account? <Link to="/login">Accedi</Link></div>
            </div>      
        </>
    )
}

export default RegisterPage