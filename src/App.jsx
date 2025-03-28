import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import RegisterPage from '../src/pages/RegisterPage';
import ProfileBusiness from './pages/ProfileBusiness/ProfileBusiness';
import FavoritePage from './pages/Favoritepage/FavoritePage';
import SavedPostsPage from './pages/SavedPostsPage';
import Layout from './components/Layout';
import LoginPage from './LoginPage';
<<<<<<< HEAD
import LandingPage from './pages/LandingPage';
=======
import UserProfile from './pages/UserProfile/UserProfile';
>>>>>>> 94f5ecaa4d3aa4fd0ed5fa98881ace0e9ba7fcda
import PostDetailPage from './pages/PostDetailPage';


function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register-page" element={<RegisterPage />} />
          <Route path="/profile/*" element={<ProfileBusiness />} />
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path="/favorite" element={<FavoritePage />} />
          <Route path="/saved-posts" element={<SavedPostsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/post-detail" element={<PostDetailPage />} />
        </Route>
        <Route path='/landing-page' element={<LandingPage />}/>
      </Routes>
    </>
  );
}

export default App