import { Heart, Star, Pen, MessageCircle, Share2, Settings } from "lucide-react";
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

    useEffect(() => {
        const storedUser = localStorage.getItem("glokal_user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setProfilo(user);

            // Carica i dati aggiornati del profilo
            getUserProfile(user._id)
                .then(response => {
                    setProfilo(response.data);
                    localStorage.setItem("glokal_user", JSON.stringify(response.data));
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
                    console.log("Post ricevuti:", response.data); // Debug
                    setUserPosts(response.data);
                    setLoadingPosts(false);
                })
                .catch(error => {
                    console.error("Errore nel recupero dei post:", error);
                    setLoadingPosts(false);
                });
        } else {
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

    if(JSON.parse(localStorage.getItem("glokal_user")).role == "USER") {
        navigate("/user-profile")
    }

    return (
        <div className="min-h-screen p-6 text-[#2e2e2e] flex justify-center mb-20">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6">
                <div className="relative text-center">
                    <img
                        src={'http://localhost:3000/assets/' + profilo.profile_image || "/path/to/default-avatar.jpg"}
                        alt="Avatar"
                        className="w-50 h-50 p-1 bg-gradient-to-l from-[#6a0572] to-[#ffc300] rounded-full mx-auto"
                    />
                    <Link to="/settings">
                        <button className="absolute ml-8 -mt-12 p-2 rounded-full">
                            <Settings className="w-10 h-10 p-0.5 bg-[#9b5de5] rounded-full text-white hover:text-[#ffc300]" />
                        </button>
                    </Link>
                    <h2 className="text-2xl font-bold mt-2">{profilo.first_name} {profilo.last_name}</h2>
                    <p className="text-sm text-gray-500">{profilo.email}</p>
                    <p className="text-sm text-gray-500">{profilo.location}</p>
                </div>

                <div className="flex justify-around py-4 mt-4">
                    <div className="flex flex-col items-center">
                        <p className="flex gap-1 items-center"><Heart className="w-4 h-4" /> {profilo.likes || 0}</p>
                        <span className="text-xs text-gray-500">Likes</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="flex gap-1 items-center"><Star className="w-4 h-4" /> {profilo.rating || 0}</p>
                        <span className="text-xs text-gray-500">Rating</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <p>{userPosts.length}</p>
                        <span className="text-xs text-gray-500">Post</span>
                    </div>
                </div>

                <div className="flex justify-center gap-4 p-6">
                    <Link to="/crea-post">
                        <Button1 icon={<Pen className="w-5 h-5" />} onClick={() => console.log("Messaggi aperti")} />
                    </Link>
                    <Button1 icon={<MessageCircle className="w-5 h-5" />} onClick={() => console.log("Messaggi aperti")} />
                    <Button1 icon={<Share2 className="w-5 h-5" />} onClick={() => console.log("Messaggi aperti")} />
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Su di me</h3>
                    <p className="text-sm text-gray-600 mt-2">{profilo.bio || "Nessuna bio disponibile"}</p>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold">I miei servizi</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        {profilo.services && profilo.services.map((service, index) => (
                            <div key={index} className="flex justify-between border p-3 rounded-lg">
                                <span className="text-[#2e2e2e] font-medium">{service.first_name}</span>
                                <span className="bg-[#ffc300] px-3 py-1 rounded text-sm font-medium">{service.price}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold">I miei punti forti</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {profilo.expertise && profilo.expertise.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-[#f7f1f7] rounded-full text-sm">{skill}</span>
                        ))}
                    </div>
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
