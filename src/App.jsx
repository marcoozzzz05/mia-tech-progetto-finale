import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';

function App() {

  return (
    <>

        <div className="flex flex-col min-h-screen m-0">

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>

        </div>
      
    </>
  );
}

export default App