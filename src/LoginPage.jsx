import { useState, useEffect, useRef } from 'react';
import eyeIcon from './eye.svg';
import eyeOffIcon from './eye-off.svg';
import Button1 from './components/Buttons/Button1';
import { Link, useNavigate } from 'react-router-dom';
import { login } from './services/userService';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await login({
                email: emailValue,
                password: passwordValue,
            });
            localStorage.setItem('glokal_user', JSON.stringify(response.data.user));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Errore durante il login.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('glokal_user')) {
            navigate('/');
        }
    }, []);

    return (
        <>
            <div className="flex flex-col items-center gap-4 w-full max-w-lg m-50 mx-auto p-6 bg-white shadow-2xl rounded-2xl">
                <div className="font-bold text-4xl">Bentornato!</div>
                <div className="font-semibold text-xl p-4">Inserisci le tue credenziali per accedere al tuo account.</div>
                <div className="font-semibold text-lg flex relative self-start top-2 left-2">Email</div>
                <input
                    type="text"
                    placeholder="Inserisci la tua email"
                    className="input-with-icon w-full p-4 border border-gray-400 rounded-lg mb-4"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                />
                <div className="font-semibold text-lg flex relative self-start top-2 left-2">Password</div>
                <div className="relative w-full">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Inserisci la tua password"
                        className="w-full p-4 border border-gray-400 rounded-lg"
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <img src={showPassword ? eyeIcon : eyeOffIcon} alt="" className="w-6 h-6" />
                    </button>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <Button1 text={loading ? 'Caricamento...' : 'Accedi'} onClick={handleLogin} disabled={loading} />
                <div className="font-semibold ">
                    Non hai un account? <Link to="/register-page">Registrati</Link>
                </div>
            </div>
        </>
    );
};

export default LoginPage;