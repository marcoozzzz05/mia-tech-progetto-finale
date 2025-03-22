import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import Home from './pages/Home'
import Footer from './Footer'

import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';

function App() {

  return (
    <>
      <SearchBar />
      <Home />
      <Footer />

        <div className="flex flex-col min-h-screen m-0">

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>

        </div>
      
    </>
  );
}

export default App