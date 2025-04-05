import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getUserProfile, followUser } from "../services/userService";
import { getFollowedPosts, getUserPosts } from "../services/postService";
import { UserPlus, UserCheck, Heart, Star } from "lucide-react";
import Button1 from "../Button1";
import EventCard from "../components/EventCard/EventCard";
import ReviewCard from "../components/Reviews/ReviewCard";

const User = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("glokal_user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(storedUser);
    setCurrentUserId(user._id);

    const fetchUserData = async () => {
      try {
        const profileResponse = await getUserProfile(userId);
        const userData = profileResponse.data;
        setProfile(userData);
        setFollowerCount(userData.followerCount || 0);
        setIsFollowing(userData.followers?.includes(user._id) || false);

        if (userData.role === "USER") {
          const postsResponse = await getFollowedPosts(userId);
          setPosts(postsResponse.data);
        } else {
          const postsResponse = await getUserPosts(userId);
          setPosts(postsResponse.data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Errore nel fetching dei dati: ", error);
        navigate("/");
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  const handleFollow = async () => {
    if (!currentUserId || !profile) return;

    try {
      await followUser(profile._id, currentUserId);
      setIsFollowing(prev => !prev);
      setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
    } catch (error) {
      console.error("Errore nel following user: ", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6a0572]"></div>
      </div>
    );
  }

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">Utente non trovato</div>;
  }

  // BUSINESS PROFILE
  if (profile.role === "BUSINESS") {
    return (
      <div className="min-h-screen p-6 text-[#2e2e2e] flex justify-center mb-20">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6">
          <div className="relative text-center">
            <img
              src={'http://localhost:3000/assets/' + (profile.profile_image)}
              alt="Avatar"
              className="w-32 h-32 p-1 bg-gradient-to-l from-[#6a0572] to-[#ffc300] rounded-full mx-auto object-cover"
            />
            <h2 className="text-2xl font-bold mt-2">{profile.first_name} {profile.last_name}</h2>
          </div>

          <div className="flex justify-around py-4 mt-4">
            <div className="flex flex-col items-center">
              <p className="flex gap-1 items-center"><Heart className="w-4 h-4" /> {profile.likes || 0}</p>
              <span className="text-xs text-gray-500">Likes</span>
            </div>
            <div className="flex flex-col items-center">
              <p className="flex gap-1 items-center"><Star className="w-4 h-4" /> {profile.rating?.toFixed(1) || '0.0'}</p>
              <span className="text-xs text-gray-500">Rating</span>
            </div>
            <div className="flex flex-col items-center">
              <p>{posts.length}</p>
              <span className="text-xs text-gray-500">Post</span>
            </div>
            <div className="flex flex-col items-center">
              <p>{followerCount}</p>
              <span className="text-xs text-gray-500">Follower</span>
            </div>
          </div>

          {currentUserId !== userId && (
            <div className="flex justify-center p-6">
              <Button1
                icon={isFollowing ? <UserCheck className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                onClick={handleFollow}
                className={isFollowing ? "bg-gray-200" : "bg-[#6a0572] text-white"}
              />
            </div>
          )}

          <div className="flex justify-center mt-10 text-gray-700">
            <button
              className={`px-4 py-2 text-lg font-semibold ${activeTab === "posts" ? "border-b-4 border-[#ffc300] text-black" : "text-gray-500"}`}
              onClick={() => setActiveTab("posts")}
            >
              POST
            </button>
            <button
              className={`px-4 py-2 text-lg font-semibold ${activeTab === "reviews" ? "border-b-4 border-[#ffc300] text-black" : "text-gray-500"}`}
              onClick={() => setActiveTab("reviews")}
            >
              RECENSIONI
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-wrap justify-center text-center mt-10 mb-10 gap-12 md:gap-16 cursor-pointer max-w-full">
            {activeTab === "posts" ? (
              posts.length > 0 ? (
                posts.map((post) => (
                  <EventCard
                    key={post._id}
                    post={{
                      ...post,
                      title: post.title || "Titolo non disponibile",
                      image: post.image || "Immagine non disponibile",
                      user: {
                        name: `${profile.first_name} ${profile.last_name}`,
                        profile_image: profile.profile_image
                      },
                    }}
                  />
                ))
              ) : (
                <div className="w-full text-center py-10">
                  <p className="mb-4">Nessun post disponibile</p>
                </div>
              )
            ) : (
              <div className="w-full text-center py-10">
                <p>Recensioni verranno mostrate qui</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // USER PROFILE
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto p-4">
        <div className="relative mx-auto bg-white shadow-md rounded-2xl overflow-hidden min-h-[200px] md:min-h-[280px] flex flex-col justify-end p-4">
          <div className="absolute top-0 left-0 w-full h-1/3 md:h-1/3 bg-gray-300" />
          <div className="relative p-1 md:p-10 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center space-x-6">
              <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-l from-[#6a0572] to-[#ffc300]">
                <img
                  src={'http://localhost:3000/assets/' + (profile.profile_image)}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              <div className="flex flex-col items-start">
                <h2 className="text-xl md:text-2xl text-[#2e2e2e] font-bold">{profile.first_name} {profile.last_name}</h2>
                <p className="text-gray-600">{profile.email}</p>

                {currentUserId !== userId && (
                  <Button1
                    icon={
                      isFollowing ? (
                        <UserCheck className="w-5 h-5" />
                      ) : (
                        <UserPlus className="w-5 h-5" />
                      )
                    }
                    onClick={handleFollow}
                    className={isFollowing ? "bg-gray-200" : "bg-[#6a0572] text-white"}
                  />
                )}
              </div>
            </div>
            <div className="flex space-x-4 justify-end gap-3 sm:gap- text-sm sm:text-base text-[#2e2e2e]">
              <span>{posts.length} Post</span>
              <span>{followerCount} follower</span>
              <span>{profile.followingCount || 0} seguiti</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10 text-[#2e2e2e]">
        <button
          className={`px-4 py-2 text-lg font-semibold ${activeTab === "posts" ? "border-b-4 border-[#ffc300]" : "text-gray-500"}`}
          onClick={() => setActiveTab("posts")}
        >
          POST
        </button>
        <button
          className={`px-4 py-2 text-lg font-semibold ${activeTab === "reviews" ? "border-b-4 border-[#ffc300]" : "text-gray-500"}`}
          onClick={() => setActiveTab("reviews")}
        >
          RECENSIONI
        </button>
      </div>

      <div className="flex flex-wrap justify-center text-center mt-10 mb-10 gap-12 md:gap-16 cursor-pointer max-w-full">
        {activeTab === "posts" ? (
          posts.length > 0 ? (
            posts.map((post) => (
              <EventCard
                key={post._id}
                post={{
                  ...post,
                  title: post.title || "Titolo non disponibile",
                  image: post.image || "Immagine non disponibile",
                  user: {
                    name: `${profile.first_name} ${profile.last_name}`,
                    profile_image: profile.profile_image
                  },
                }}
              />
            ))
          ) : (
            <div className="w-full text-center py-10">
              <p className="mb-4">Nessun post disponibile</p>
            </div>
          )
        ) : (
          <div className="w-full text-center py-10">
            <p>Recensioni verranno mostrate qui</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default User