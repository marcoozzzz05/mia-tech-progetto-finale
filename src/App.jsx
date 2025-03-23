import './App.css'
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom";
import Footer from './Footer'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-page" element={<RegisterPage />}/>
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App