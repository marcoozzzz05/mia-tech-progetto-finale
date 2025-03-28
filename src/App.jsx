import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import RegisterPage from '../src/pages/RegisterPage';
import ProfileBusiness from './pages/ProfileBusiness/ProfileBusiness';
import FavoritePage from './pages/Favoritepage/FavoritePage';
import SavedPostsPage from './pages/SavedPostsPage';
import Layout from './components/Layout';
import LoginPage from './LoginPage';
import UserProfile from './pages/UserProfile/UserProfile';
import ReviewForm from './components/Reviews/ReviewForm';
import PostForm from './components/Post/PostForm';
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
          <Route path="/post-form" element={<PostForm />} />
          <Route path="/post-detail" element={<PostDetailPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App