import './App.css'
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom";
import RegisterPage from './pages/RegisterPage'
import ProfileBusiness from './pages/ProfileBusiness/ProfileBusiness';
import FavoritePage from './pages/Favoritepage/FavoritePage';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-page" element={<RegisterPage />}/>
        <Route path="/profile/*" element={<ProfileBusiness />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Routes>
      
    </>
  );
}

export default App