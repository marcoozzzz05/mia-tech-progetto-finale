import './App.css'
import EventCard from "./components/EventCard/EventCard"
import SearchBar from './components/SearchBar/Searchbar'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home/Home';
import Footer from './Footer'
import Button1 from './Button1'
import Button2 from './Button2'
import Button3 from './Button3'

function App() {

  return (
    
      <div className="flex flex-col min-h-screen m-0">

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
     
      <div className='mt-4'>
        <Link to="/settings"><Button1 text={"Settings"} /></Link>
      </div>
      <div className='mt-4'>
        <Link to="/signup"><Button2 text={"Sign Up"} /></Link>
      </div>
      <div className='mt-4'>
        <Link to="/seemore"><Button3 text={"See More"} /></Link>
      </div>

      <Footer />
      </div>
  );
}

export default App
