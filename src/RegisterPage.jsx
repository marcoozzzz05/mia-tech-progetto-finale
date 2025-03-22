import { useState } from "react"
import Button1 from "./Button1"


const RegisterPage = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [message, setMessage] = useState("")

    const validateForm = () => {
        if (![firstName, lastName, address, password, repeatPassword].every(Boolean)) {
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
        } else {
            setMessage("")
            const user = {
                firstName: firstName,
                lastName: lastName,
                address: address,
                password: password
            }
            console.log(user)
        }
    }

    const handleChange = () => {
        if (message) {
            setMessage("")
        } 
    };
    
    return (
        <>
            <div className="flex flex-col items-center gap-4 w-full max-w-lg mx-auto p-4 bg-white shadow-lg rounded-2xl">

                <div className="font-bold text-3xl p-4">Create New Account</div>
                <div className="text-lg font-semibold text-gray-700 mb-1.5 w-full text-left pl-2">First Name</div>
                <input type="text" placeholder="Enter your name" onChange={(e) => { setFirstName(e.target.value); handleChange() }}
                    className="w-full p-4 border border-gray-400 rounded-lg mb-4"/>

                <div className="text-lg font-semibold text-gray-700 mb-1.5 w-full text-left pl-2">Last Name</div>
                <input type="text" placeholder="Enter your name" onChange={(e) => { setLastName(e.target.value); handleChange() }}
                    className="w-full p-4 border border-gray-400 rounded-lg mb-4"/>

                <div className="text-lg font-semibold text-gray-700 mb-1.5 w-full text-left pl-2">Email address</div>
                <input type="email" placeholder="name@example.com" onChange={(e) => { setAddress(e.target.value); handleChange() }}
                    className="w-full p-4 border border-gray-400 rounded-lg mb-4"/>

                <div className="text-lg font-semibold text-gray-700 mb-1.5 w-full text-left pl-2">Create Password</div>
                <input type="password" placeholder="Enter your Password" onChange={(e) => { setPassword(e.target.value); handleChange() }}
                    className="w-full p-4 border border-gray-400 rounded-lg mb-4"/>

                <div className="text-lg font-semibold text-gray-700 mb-1.5 w-full text-left pl-2">Repeat Password</div>
                <input type="password" placeholder="Repeat new password" onChange={(e) => { setRepeatPassword(e.target.value); handleChange() }}
                    className="w-full p-4 border border-gray-400 rounded-lg mb-6"/>
                
                {message}
                <Button1 onClick={handleButton} text={"Sign Up"}/>
            </div>
        </>
    )
}

export default RegisterPage