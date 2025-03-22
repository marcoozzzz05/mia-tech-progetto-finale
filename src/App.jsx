import './App.css'
import Home from './pages/Home';

<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
=======
import Footer from './Footer'
import Button1 from './Button1'
import Button2 from './Button2'
import Button3 from './Button3'
import RegisterPage from './RegisterPage'
>>>>>>> 29-create-login-and-register-page

function App() {

  return (
    <>
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
=======
      <div className="flex flex-col min-h-screen">
        <SearchBar />
        <EventCard />
        <RegisterPage />
      </div>
      <Footer />
      <div className='mt-4'>
        <Button1 text={"Settings"}/>
      </div>
      <div className='mt-4'>
        <Button2 text={"Sign Up"}/>
      </div>
      <div className='mt-4'>
        <Button3 text={"See More"}/>
      </div>
>>>>>>> 29-create-login-and-register-page
    </>
  );
}

export default App