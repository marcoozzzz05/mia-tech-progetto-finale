import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import RegisterPage from '../src/pages/RegisterPage';
import ProfileBusiness from './pages/ProfileBusiness/ProfileBusiness';
import FavoritePage from './pages/Favoritepage/FavoritePage';
import SavedPostsPage from './pages/SavedPostsPage';
import Layout from './components/Layout';
import LoginPage from './LoginPage';
import LandingPage from './pages/LandingPage';
import UserProfile from './pages/UserProfile/UserProfile';
import PostDetailPage from './pages/PostDetailPage';
import PostForm from "../src/components/Post/PostForm"
import Settings from './pages/Settings/Settings';
import LanguageCity from './pages/Settings/LanguageCity';
import Terms from './pages/Settings/Terms';
import EditProfile from './pages/Settings/EditProfile';

function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/*" element={<ProfileBusiness />} />
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path="/favorite" element={<FavoritePage />} />
          <Route path="/saved-posts" element={<SavedPostsPage />} />
          <Route path="/post-detail" element={<PostDetailPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/language" element={<LanguageCity />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/crea-post" element={<PostForm />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>        
        <Route path="/login" element={<LoginPage />} />          
        <Route path="/register-page" element={<RegisterPage />} />
        <Route path='/landing-page' element={<LandingPage />}/>
      </Routes>
    </>
  );
}

export default App