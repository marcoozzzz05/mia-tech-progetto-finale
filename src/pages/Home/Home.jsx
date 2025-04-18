import { useEffect, useState } from "react";
import { getPostsByPlace, likePost, getFeaturedPosts, getLatestAllPosts } from "../../services/postService";
import EventCard from "../../components/EventCard/EventCard";
import Button3 from "../../components/Buttons/Button3";
import { Link } from "react-router-dom";
import Avatar from "../../assets/img/Avatar.png";


function Home() {
    const [latestPosts, setLatestPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [nearbyPosts, setNearbyPosts] = useState([]);
    const [userCity, setUserCity] = useState("MILANO");
    const [initialized, setInitialized] = useState(false);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState({
        latest: true,
        popular: true,
        nearby: true
    });

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("glokal_user"));
        if (userData) {
            setUserId(userData._id);
            setUserCity(userData.city);
        }
    }, []);

    useEffect(() => {

        if (!initialized) {
            setInitialized(true);
            // Recupera gli ultimi post di TUTTI gli utenti
            getLatestAllPosts(4)
                .then(response => {
                    const allPosts = response.data;
                    setLatestPosts(allPosts);
                })
                .catch(error => {
                    console.error("Errore nel recupero degli ultimi post di tutti:", error);
                })
                .finally(() => {
                    setLoading(prev => ({ ...prev, latest: false }));
                });

                getFeaturedPosts(4)
                .then(response => {
                    const featuredPosts = response.data;
                    setPopularPosts(featuredPosts);
                })
                .catch(error => {
                    console.error("Errore nel recupero dei post seguiti (per i popolari):", error);
                })
                .finally(() => {                   
                    setLoading(prev => ({ ...prev, popular: false }));
                });

        }

        if (userCity) {
            // Recupera i post relativi alla città dell'utente (questo rimane invariato)
            getPostsByPlace(userCity)
                .then(response => {
                    setNearbyPosts(response.data.slice(0, 4));
                })
                .catch(error => {
                    console.error("Errore nel recupero dei post per città:", error);
                })
                .finally(() => {                                   
                    setLoading(prev => ({ ...prev, nearby: false }));
                });
        }


    }, [userId, userCity]);


    const handleLike = async (postId) => {
        if (!userId) {
            console.error("Utente non autenticato");
            return;
        }

        try {
            await likePost(postId, userId);
            const updatePosts = (posts) =>
                posts.map(post =>
                    post._id === postId
                        ? { ...post, likes: [...post.likes, userId] }
                        : post
                );
            setLatestPosts(updatePosts(latestPosts));
            setPopularPosts(updatePosts(popularPosts));
            setNearbyPosts(updatePosts(nearbyPosts));
        } catch (error) {
            console.error("Errore nel mettere like al post:", error);
        }
    };

    const renderPosts = (posts, isLoading) => {
        if (isLoading) {
            return (
                <div className="w-full flex justify-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6a0572]"></div>
                </div>
            );
        }

        if (posts.length === 0) {
            return <p className="text-gray-500 text-lg w-full">Non ci sono ancora post in questa sezione.</p>;
        }

        return posts.map(post => {
            console.log("Post singolo renderizzato:", post); // Log del singolo post
            return (
                <EventCard
                    key={post._id}
                    post={{
                        ...post,
                        title: post.title || "Titolo non disponibile",
                        image: post.image || "Immagine non disponibile",
                        user: post.user ? {
                            name: `${post.user.first_name} ${post.user.last_name}`,
                            profile_image: post.user.profile_image || Avatar
                        } : {
                            name: "Utente sconosciuto",
                            profile_image: Avatar
                        },
                        likes: post.likes || []
                    }}
                // Se vuoi gestire l'eliminazione anche dalla Home (richiederebbe un'API diversa)
                // onPostDeleted={/* la tua funzione per eliminare dalla Home */}
                />
            );
        });
    };

    return (
        <div className="container mx-auto mb-20 px-6 py-2">
            {/* ULTIMI POST AGGIUNTI */}
            <h2 className="text-2xl text-[#2e2e2e] font-bold">Ultimi post aggiunti</h2>
            <div className="flex flex-wrap justify-center text-center mt-10 mb-20 gap-12 md:gap-16 cursor-pointer max-w-full">
                {renderPosts(latestPosts, loading.latest)}
            </div>
            <div className="flex justify-center mb-20">
                <Link to="/last-posts">
                    <Button3 text={"Scopri di più"} />
                </Link>
            </div>

            {/* POTREBBERO INTERESSARTI */}
            <h2 className="text-2xl text-[#2e2e2e] font-bold mt-10">Potrebbero interessarti</h2>
            <div className="flex flex-wrap justify-center text-center mt-10 mb-20 gap-12 md:gap-16 cursor-pointer max-w-full">
                {renderPosts(popularPosts, loading.popular)}
            </div>
            <div className="flex justify-center mb-20">
                <Link to="/top-posts">
                    <Button3 text={"Scopri di più"} />
                </Link>
            </div>

            {/* VICINO A TE */}
            <h2 className="text-2xl text-[#2e2e2e] font-bold mt-10">Vicino a te</h2>
            <div className="flex flex-wrap justify-center text-center mt-10 mb-20 gap-12 md:gap-16 cursor-pointer max-w-full">
                {renderPosts(nearbyPosts, loading.nearby)}
            </div>
            <div className="flex justify-center mb-20">
                <Link to="/near-you-posts">
                    <Button3 text={"Scopri di più"} />
                </Link>
            </div>
        </div>
    );
}

export default Home;