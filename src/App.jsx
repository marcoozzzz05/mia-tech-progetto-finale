import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import RegisterPage from '../src/pages/RegisterPage';
import ProfileBusiness from './pages/ProfileBusiness/ProfileBusiness';
import FavoritePage from './pages/Favoritepage/FavoritePage';
import SavedPostsPage from './pages/SavedPostsPage';
import Layout from './components/Layout';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/register-page" element={<Layout><RegisterPage /></Layout>}/>
        <Route path="/profile/*" element={<Layout><ProfileBusiness /></Layout>} />
        <Route path="/favorite" element={<Layout><FavoritePage /></Layout>} />
        <Route path="/saved-posts" element={<Layout><SavedPostsPage /></Layout>} />
      </Routes>
    </>
  );
}

export default App