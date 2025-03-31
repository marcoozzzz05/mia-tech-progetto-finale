import { useState, useEffect, useRef } from "react"
import eyeIcon from "./eye.svg"
import eyeOffIcon from "./eye-off.svg"
import Button1 from "./components/Buttons/Button1"
import { Link, useNavigate } from "react-router-dom"
import { login } from "./services/userService"


const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const email = useRef()
    const password = useRef()

    const navigate = useNavigate()

    const handleLogin = () => {
        const emailValue = email.current.value
        const passwordValue = password.current.value
        console.log(emailValue)
        login({
            email: emailValue,
            password: passwordValue
        }).then((response) => {
            localStorage.setItem("glokal_user", JSON.stringify(response.data.user))
            
            navigate("/")
        }).catch((err) => {
            console.error(err);
        })
    }


    useEffect(() => {
        if (localStorage.getItem("glokal_user")) {
            navigate("/");
        }
    }, []);



    return (
        <>
            <div className="flex flex-col items-center gap-4 w-full max-w-lg m-30 mx-auto p-6 bg-white shadow-2xl rounded-2xl">
                <div className="font-bold text-4xl">Bentornato!</div>
                <div className="font-semibold text-xl p-4">Inserisci le tue credenziali per accedere al tuo account.</div>
                <div className="font-semibold text-lg flex relative self-start top-2 left-2">Email</div>
                <input ref={email} type="text" placeholder="Inserisci la tua email"
                    className="input-with-icon w-full p-4 border border-gray-400 rounded-lg mb-4" />
                <div className="font-semibold text-lg flex relative self-start top-2 left-2">Password</div>
                <input ref={password} type={showPassword ? "text" : "password"} placeholder="Inserisci la tua password"
                    className="lock w-full p-4 border border-gray-400 rounded-lg" />
                <button type="button" className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    <img src={showPassword ? eyeIcon : eyeOffIcon} alt="" className="relative bottom-15 left-50" />
                </button>
                <Button1 text={"Accedi"} onClick={handleLogin} />
                <div className="font-semibold ">Non hai un account? <Link to="/register-page">Registrati</Link></div>
            </div>
        </>
    )
}

export default LoginPage