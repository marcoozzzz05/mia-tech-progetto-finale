import './App.css'
import Home from './pages/Home';
import Footer from './Footer'
import RegisterPage from './RegisterPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileBusiness from './pages/ProfileBusiness/ProfileBusiness';
import SearchBar from './components/SearchBar/SearchBar';
import FavoritePage from './pages/Favoritepage/FavoritePage';


function App() {

  return (
    <>

        <div className="flex flex-col min-h-screen m-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register-page" element={<RegisterPage />}/>
            <Route path="/profile/*" element={<ProfileBusiness />} />
            <Route path="/favorite" element={<FavoritePage />} />
            <Route path="/search" element={<SearchBar />} />
          </Routes>
          <Footer />
        </div>
      
    </>
  );
}

export default App