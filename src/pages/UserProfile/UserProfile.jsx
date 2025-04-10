import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router";
import EventCard from "../../components/EventCard/EventCard"
import bgImage from "../../assets/img/bg-profile.png"
import ReviewCard from "../../components/Reviews/ReviewCard";
import { getUserProfile } from "../../services/userService";
import { getFollowedPosts } from "../../services/postService";
import { Settings } from "lucide-react";
import UserProfileCounters from "../../components/UserProfileCounter";
import UserProfileTabSection from "../../components/UserProfileTabSection";

const UserProfile = () => {
  const [profilo, setProfilo] = useState(null);
  const [activeTab, setActiveTab] = useState("saved");
  const [followedPosts, setFollowedPosts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [followerCount, setFollowerCount] = useState(0);
  const navigate = useNavigate();

  const [followingCount, setFollowingCount] = useState(() => {
    const stored = localStorage.getItem("glokal_user");
    if (stored) {
      const user = JSON.parse(stored);
      return user.followingCount || 0;
    }
    return 0;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("glokal_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setProfilo(user);

      getUserProfile(user._id)
        .then(response => {
          const localUser = JSON.parse(localStorage.getItem("glokal_user"));
          const responseUser = response.data;

          // Preserva following e followingCount da localStorage
          responseUser.following = localUser.following || [];
          responseUser.followingCount = localUser.followingCount || 0;

          setProfilo(responseUser);
          setFollowerCount(responseUser.followerCount || 0);
          setFollowingCount(responseUser.followingCount || 0);
          localStorage.setItem("glokal_user", JSON.stringify(responseUser));
          setLoadingProfile(false);
        }).catch(error => {
          console.error("Errore nel recupero del profilo: ", error);
          setLoadingProfile(false);
        })
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const userReviews = [
    {
      eventId: "1",
      eventName: "Concerto Rock Night",
      rating: 5,
      comment: "Fantastico evento, ottima organizzazione!",
    },
    {
      eventId: "2",
      eventName: "Mostra d'Arte Moderna",
      rating: 4,
      comment: "Bellissima esperienza, ma un po' affollata.",
    },
  ];
  console.log(localStorage.getItem("glokal_user"))

  if (JSON.parse(localStorage.getItem("glokal_user")).role == "BUSINESS") {
    navigate("/profile")
  }

  if (loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6a0572]"></div>
      </div>
    );
  }

  if (!profilo) {
    return <div>Errore nel caricamento del profilo</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen mb-20">
      <div className="max-w-5xl mx-auto p-4">
        <div className="relative mx-auto bg-white shadow-md rounded-2xl overflow-hidden min-h-[200px] md:min-h-[280px] flex flex-col justify-end p-4">
          <div className="absolute top-0 left-0 w-full h-1/3 md:h-1/3 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
          <div className="relative p-1 md:p-10 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center space-x-6">
              <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-l from-[#6a0572] to-[#ffc300]">
                <img
                  src={'http://localhost:3000/assets/' + profilo.profile_image || 'assets/img/Avatar.png'}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover" />
                <Link to="/settings">
                  <button className="absolute right-4 bottom-4 translate-x-1/3 translate-y-1/3 rounded-full bg-[#9b5de5]">
                    <Settings className="w-5 h-5 p-0.5 bg-[#9b5de5] rounded-full text-white hover:text-[#ffc300]" />
                  </button>
                </Link>
              </div>

              <div className="flex flex-col items-start">
                <h2 className="text-xl md:text-2xl text-[#2e2e2e] font-bold">{profilo.first_name} {profilo.last_name}</h2>
              </div>
            </div>

            <div className="flex space-x-4 justify-end gap-3 sm:gap- text-sm sm:text-base text-[#2e2e2e]">
              <UserProfileCounters
                profileUserId={profilo._id}
                currentUserId={profilo._id}
                initialFollowers={followerCount}
                initialFollowing={followingCount}
                initialPosts={followedPosts.length}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10 text-[#2e2e2e]">
        <button className={`px-4 py-2 text-lg font-semibold ${activeTab === "saved" ? "border-b-4 border-[#ffc300]" : "text-gray-500"}`}
          onClick={() => setActiveTab("saved")}>
          POST SALVATI
        </button>
        <button className={`px-4 py-2 text-lg font-semibold ${activeTab === "reviews" ? "border-b-4 border-[#ffc300]" : "text-gray-500"}`}
          onClick={() => setActiveTab("reviews")}>
          LE MIE RECENSIONI
        </button>
      </div>

      <div className="flex flex-wrap justify-center text-center mt-10 mb-10 gap-12 md:gap-16 cursor-pointer max-w-full">
        <UserProfileTabSection
          user={profilo}
          initialTab="saved"
          defaultPosts={followedPosts}
          defaultReviews={userReviews}
          onPostDeleted={(postId) => {
            // Aggiorna lo stato nella pagina madre se necessario
            const updatedPosts = followedPosts.filter(post => post._id !== postId);
            setFollowedPosts(updatedPosts);
          }}
        />
      </div>
    </div>
  )
}

export default UserProfile
