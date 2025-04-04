import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router";
import EventCard from "../../components/EventCard/EventCard"
import bgImage from "../../assets/img/bg-profile.png"
import ReviewCard from "../../components/Reviews/ReviewCard";
import { getUserProfile } from "../../services/userService";
import { getFollowedPosts } from "../../services/postService";
import { Settings } from "lucide-react";

const UserProfile = () => {
  const [profilo, setProfilo] = useState(null);
  const [activeTab, setActiveTab] = useState("saved");
  const [followedPosts, setFollowedPosts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("glokal_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setProfilo(user);

      getUserProfile(user._id)
        .then(response => {
          setProfilo(response.data);
          localStorage.setItem("glokal_user", JSON.stringify(response.data));
          setLoadingProfile(false);
        }).catch(error => {
          console.error("Errore nel recupero del profilo: ", error);
          setLoadingProfile(false);
        });

      setLoadingPosts(true);
      getFollowedPosts(user._id)
        .then(response => {
          console.log("Post ricevuti: ", response.data);
          setFollowedPosts(response.data);
          setLoadingPosts(false);
        }).catch(error => {
          console.error("Errore nel recupero dei post: ", error);
          setLoadingPosts(false);
        });
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
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto p-4">
        <div className="relative mx-auto bg-white shadow-md rounded-2xl overflow-hidden min-h-[200px] md:min-h-[280px] flex flex-col justify-end p-4">
          <div className="absolute top-0 left-0 w-full h-1/3 md:h-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
          <div className="relative p-1 md:p-10 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center space-x-6">
              <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-l from-[#6a0572] to-[#ffc300]">
                <img src={'http://localhost:3000/assets/' + profilo.profile_image} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                <Link to="/settings">
                  <button className="absolute right-2 bottom-2 translate-x-1/3 translate-y-1/3 rounded-full bg-[#9b5de5]">
                    <Settings className="w-5 h-5 p-0.5 bg-[#9b5de5] rounded-full text-white hover:text-[#ffc300]" />
                  </button>
                </Link>
              </div>

              <div className="flex flex-col items-start">
                <h2 className="text-xl md:text-2xl text-[#2e2e2e] font-bold">{profilo.first_name} {profilo.last_name}</h2>
                <p className="text-gray-600">{profilo.email}</p>
                <p className="text-sm text-gray-600">{profilo.location}</p>
              </div>
            </div>
            <div className="flex space-x-4 justify-end gap-3 sm:gap- text-sm sm:text-base text-[#2e2e2e]">
              <span>473 follower</span>
              <span>467 seguiti</span>
              <span>{followedPosts.length} Post</span>
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
        {activeTab === "saved" ? (
          loadingPosts ? (
            <div className="w-full flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6a0572]"></div>
            </div>
          ) : followedPosts.length > 0 ? (
            followedPosts.map((post) => (
              <EventCard
                key={post._id}
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
              <p className="mb-4">Nessun post salavato</p>
            </div>
          )
        ) : userReviews.length > 0 ? (
          userReviews.map((review, index) => <ReviewCard key={index} review={review} />)
        ) : (
          <p className="text-center py-10">Nessuna recensione disponibile.</p>
        )}
      </div>
    </div>
  )
}

export default UserProfile
