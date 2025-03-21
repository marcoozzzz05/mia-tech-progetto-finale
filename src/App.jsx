import './App.css'
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom";
import Footer from './Footer'
import RegisterPage from './RegisterPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-page" element={<RegisterPage />}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App