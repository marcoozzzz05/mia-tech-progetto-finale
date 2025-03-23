import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import ProfileBusiness from './pages/ProfileBusiness/ProfileBusiness';
import SearchBar from './components/SearchBar/SearchBar';


function App() {

  return (
    <>

        <div className="flex flex-col min-h-screen m-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/*" element={<ProfileBusiness />} />
            <Route path="/search" element={<SearchBar />} />
          </Routes>
        </div>
      
    </>
  );
}

export default App