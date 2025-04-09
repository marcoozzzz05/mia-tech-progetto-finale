import { Settings } from "lucide-react";
import Button1 from "../../Button1";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import EventCard from "../../components/EventCard/EventCard";
import ReviewCard from "../../components/Reviews/ReviewCard";
import { getUserProfile } from "../../services/userService";
import { getUserPosts } from "../../services/postService";

const ProfileBusiness = () => {
  const [profilo, setProfilo] = useState(null);
  const [activeTab, setActiveTab] = useState("created");
  const [userPosts, setUserPosts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const navigate = useNavigate();

  const [followerCount, setFollowerCount] = useState(() => {
    const stored = localStorage.getItem("glokal_user");
    if (stored) {
      const user = JSON.parse(stored);
      return user.followerCount || 0;
    }
    return 0;
  });

  const handlePostDeletion = (postId) => {
    let newPosts = [...userPosts];
    newPosts.splice(newPosts.findIndex(toFilter => toFilter._id === postId), 1);
    setUserPosts(newPosts);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("glokal_user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(storedUser);

      if (!user?._id) {
        console.error("ID utente non valido nel localStorage");
        navigate("/login");
        return;
      }

      if (user.role === "USER") {
        navigate("/user-profile");
        return;
      }

      setProfilo(user);

      // Carica i dati aggiornati del profilo
      getUserProfile(user._id)
        .then(response => {
          const serverUser = response.data;
          const localUser = JSON.parse(localStorage.getItem("glokal_user"));

          // Combina i dati del server con quelli locali per i follower
          const mergedUser = {
            ...serverUser,
            followers: localUser?.followers || serverUser.followers || [],
            followerCount: localUser?.followerCount || serverUser.followerCount || 0
          };

          setProfilo(mergedUser);
          setFollowerCount(mergedUser.followerCount);
          localStorage.setItem("glokal_user", JSON.stringify(mergedUser));
          setLoadingProfile(false);
        })
        .catch(error => {
          console.error("Errore nel recupero del profilo:", error);
          setLoadingProfile(false);
        });

      // Carica i post dell'utente
      setLoadingPosts(true);
      getUserPosts(user._id)
        .then(response => {
          setUserPosts(response.data);
          setLoadingPosts(false);
        })
        .catch(error => {
          console.error("Errore nel recupero dei post:", error);
          setLoadingPosts(false);
        });

    } catch (error) {
      console.error("Errore nel parsing dei dati utente:", error);
      navigate("/login");
    }
  }, [navigate]);

  const userReviews = [
    { eventId: "1", eventName: "Jacob", rating: 5, comment: "La migliore pizza di Milano!" },
    { eventId: "2", eventName: "Daniel", rating: 5, comment: "Cena eccezionale con Vincent!" },
    { eventId: "3", eventName: "Or", rating: 3, comment: "Desserts un po' costosi..." },
  ];

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

  if (JSON.parse(localStorage.getItem("glokal_user")).role === "USER") {
    navigate("/user-profile");
  }

  return (
    <div className="min-h-screen p-6 text-[#2e2e2e] flex justify-center mb-20">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6">
        <div className="relative text-center">
          <img
            src={'http://localhost:3000/assets/' + profilo.profile_image || 'assets/img/Avatar.png'}
            alt="Avatar"
            className="w-32 h-32 p-1 bg-gradient-to-l from-[#6a0572] to-[#ffc300] rounded-full mx-auto object-cover"
          />
          <Link to="/settings">
            <button className="absolute ml-8 -mt-12 p-2 rounded-full">
              <Settings className="w-5 h-5 p-0.5 bg-[#9b5de5] rounded-full text-white hover:text-[#ffc300]" />
            </button>
          </Link>
          <h2 className="text-2xl font-bold mt-2">{profilo.first_name} {profilo.last_name}</h2>
          <p className="text-sm text-gray-500">{profilo.metadata.business_name}</p>
        </div>

        <div className="flex justify-around py-4 mt-4">
          <div className="flex flex-col items-center">
            <p>{userPosts.length}</p>
            <span className="text-xs text-gray-500">Post</span>
          </div>
          <div className="flex flex-col items-center">
            <p>{followerCount}</p>
            <span className="text-xs text-gray-500">Follower</span>
          </div>
          <div className="flex flex-col items-center">
            <p>{profilo.rating || 0}</p>
            <span className="text-xs text-gray-500">Rating</span>
          </div>
        </div>

        <div className="flex justify-center gap-4 p-6">
          <Link to="/crea-post">
            <Button1 text={"Crea Post"} onClick={() => console.log("Messaggi aperti")} />
          </Link>
        </div>

        <div className="flex justify-center mt-10 text-gray-700">
          <button
            className={`px-4 py-2 text-lg font-semibold ${activeTab === "created" ? "border-b-4 border-[#ffc300] text-black" : "text-gray-500"}`}
            onClick={() => setActiveTab("created")}
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

        <div className="flex flex-wrap justify-center text-center mt-10 mb-10 gap-12 md:gap-16 cursor-pointer max-w-full">
          {activeTab === "created" ? (
            loadingPosts ? (
              <div className="w-full flex justify-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6a0572]"></div>
              </div>
            ) : userPosts.length > 0 ? (
              userPosts.map((post) => (
                <EventCard
                  key={post._id}
                  onPostDeleted={handlePostDeletion}
                  post={{
                    ...post,
                    title: post.title || "Titolo non disponibile",
                    image: post.image || "Immagine non disponibile",
                    user: {
                      name: `${profilo.first_name} ${profilo.last_name}`,
                      profile_image: profilo.profile_image
                    },
                    likes: post.likes || [],
                  }}
                />
              ))
            ) : (
              <div className="w-full text-center py-10">
                <p className="mb-4">Nessun post creato ancora.</p>
              </div>
            )
          ) : userReviews.length > 0 ? (
            userReviews.map((review, index) => <ReviewCard key={index} review={review} />)
          ) : (
            <p className="text-center py-10">Nessuna recensione disponibile.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBusiness;

