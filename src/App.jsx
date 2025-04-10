import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import RegisterPage from '../src/pages/RegisterPage';
import ProfileBusiness from './pages/ProfileBusiness/ProfileBusiness';
import FavoritePage from './pages/Favoritepage/FavoritePage';
import Layout from './components/Layout';
import LoginPage from './LoginPage';
import LandingPage from './pages/LandingPage';
import UserProfile from './pages/UserProfile/UserProfile';
import PostForm from "../src/components/Post/PostForm"
import Settings from './pages/Settings/Settings';
import EditProfile from './pages/Settings/EditProfile';
import User from './pages/User';
import SearchResultsPage from './pages/SearchResultsPage';
import EditCard from './components/EventCard/EditCard';

import PostDetailPage from './pages/PostDetailPage';

import ForgotPassword from './ForgotPassword';

function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/*" element={<ProfileBusiness />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/favorite" element={<FavoritePage />} />
          <Route path="/post-detail/:postId" element={<PostDetailPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/crea-post" element={<PostForm />} />
          <Route path="/edit-post/:postId" element={<EditCard />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
        </Route>        
        <Route path="/login" element={<LoginPage />} />          
        <Route path="/register-page" element={<RegisterPage />} />
        <Route path='/landing-page' element={<LandingPage />}/>
        <Route path='/login/forgot-password' element={<ForgotPassword />}/>
      </Routes>
    </>
  );
}

export default App