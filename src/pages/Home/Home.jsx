import { useEffect, useState } from "react";
import { getPostsByPlace, likePost, getFollowedPosts } from "../../services/postService";
import EventCard from "../../components/EventCard/EventCard";
import Button3 from "../../components/Buttons/Button3";
import { Link } from "react-router-dom";

function Home() {
    const [latestPosts, setLatestPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [nearbyPosts, setNearbyPosts] = useState([]);
    const [userCity, setUserCity] = useState("MILANO");
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
        if (!userId) return;

        setLoading({ latest: true, popular: true, nearby: true });

        // Recupera tutti i post seguiti
        getFollowedPosts(userId)
            .then(response => {
                const allPosts = response.data;

                // Ordina per data di creazione
                const sortedByDate = [...allPosts].sort((a, b) => 
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
                setLatestPosts(sortedByDate.slice(0, 4));
                setLoading(prev => ({ ...prev, latest: false }));

                // Ordina per numero di like
                const sortedByLikes = [...allPosts].sort((a, b) => 
                    b.likes.length - a.likes.length
                );
                setPopularPosts(sortedByLikes.slice(0, 4));
                setLoading(prev => ({ ...prev, popular: false }));
            })
            .catch(error => {
                console.error("Errore nel recupero dei post seguiti:", error);
                setLoading(prev => ({ ...prev, latest: false, popular: false }));
            });

        // Recupera i post relativi alla città dell'utente
        getPostsByPlace(userCity)
            .then(response => {
                setNearbyPosts(response.data.slice(0, 4));
                setLoading(prev => ({ ...prev, nearby: false }));
            })
            .catch(error => {
                console.error("Errore nel recupero dei post per città:", error);
                setLoading(prev => ({ ...prev, nearby: false }));
            });
    }, [userId, userCity]);

    const handleLike = async (postId) => {
        if (!userId) {
            console.error("Utente non autenticato");
            return;
        }

        try {
            await likePost(postId, userId);
            // Aggiorna lo stato per riflettere il like
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

        return posts.map(post => (
            <EventCard 
                key={post._id} 
                post={{
                    ...post,
                    title: post.title || "Titolo non disponibile",
                    image: post.image || "Immagine non disponibile",
                    user: post.user || {
                        name: "Utente sconosciuto",
                        profile_image: null
                    },
                    likes: post.likes || []
                }} 
                onLike={() => handleLike(post._id)} 
            />
        ));
    };

    return (
        <div className="container mx-auto mb-20 px-6 py-2">
            {/* ULTIMI POST AGGIUNTI */}
            <h2 className="text-2xl text-[#2e2e2e] font-bold">Ultimi post aggiunti</h2>
            <div className="flex flex-wrap justify-center text-center mt-10 mb-20 gap-12 md:gap-16 cursor-pointer max-w-full">
                {renderPosts(latestPosts, loading.latest)}
            </div>
            <div className="flex justify-center mb-20">
                <Link to="">
                    <Button3 text={"Scopri di più"} />
                </Link>
            </div>

            {/* POTREBBERO INTERESSARTI */}
            <h2 className="text-2xl text-[#2e2e2e] font-bold mt-10">Potrebbero interessarti</h2>
            <div className="flex flex-wrap justify-center text-center mt-10 mb-20 gap-12 md:gap-16 cursor-pointer max-w-full">
                {renderPosts(popularPosts, loading.popular)}
            </div>
            <div className="flex justify-center mb-20">
                <Link to="">
                    <Button3 text={"Scopri di più"} />
                </Link>
            </div>

            {/* VICINO A TE */}
            <h2 className="text-2xl text-[#2e2e2e] font-bold mt-10">Vicino a te</h2>
            <div className="flex flex-wrap justify-center text-center mt-10 mb-20 gap-12 md:gap-16 cursor-pointer max-w-full">
                {renderPosts(nearbyPosts, loading.nearby)}
            </div>
            <div className="flex justify-center mb-20">
                <Link to="">
                    <Button3 text={"Scopri di più"} />
                </Link>
            </div>
        </div>
    );
}

export default Home;



/*import EventCard from "../../components/EventCard/EventCard";
import Button3 from "../../components/Buttons/Button3";
import { Link } from "react-router";

function Home() {
    return (
        <>
            <div className="container mx-auto px-6 py-2">
                <div>
                    <h2 className="text-2xl text-[#2e2e2e] font-bold">Ultimi post aggiunti</h2>
                </div>

                <div className="flex flex-wrap justify-center text-center mt-10 mb-20 gap-12 md:gap-16 cursor-pointer max-w-full">
                    <Link to="/post-detail">
                        <EventCard title={"Saturday Jazz: un concerto imperdibile nel cuore di Milano"} category={"Intrattenimento"} />
                    </Link>
                    <Link to="/post-detail">
                        <EventCard title={"Sandro Cappai: Stand-Up Comedy a Cagliari"} category={"Intrattenimento"} />
                    </Link>
                    <Link to="/post-detail">
                        <EventCard title={"Giornate FAI di Primavera"} category={"Eventi culturali & Arte"} />
                    </Link>
                    <Link to="/post-detail">
                        <EventCard title={"Amatriciana&Carbonara Festival"} category={"Ristorazione"} />
                    </Link>
                </div>
                <div className="flex justify-center mb-20">
                    <Button3 text={"Scopri di più"} />
                </div>
                <div>
                    <h2 className="text-2xl text-[#2e2e2e] font-bold mt-10">Potrebbero interessarti</h2>
                </div>
                <div className="flex flex-wrap justify-center text-center mt-10 mb-20 gap-12 md:gap-16 cursor-pointer max-w-full">
                    <Link to="/post-detail">
                        <EventCard title={"Masterclass di Public Speaking: Comunica con Impatto"} category={"Educazione & Formazione"} />
                    </Link>
                    <Link to="/post-detail">
                        <EventCard title={"AI e Futuro del Lavoro: Come l'Intelligenza Artificiale Sta Cambiando il Mondo"} category={"Tecnologia & Innovazione"} />
                    </Link>
                    <Link to="/post-detail">
                        <EventCard title={"Maratona Urbana: Corri tra le Meraviglie della Città di Palermo"} category={"Sport & Fitness"} />
                    </Link>
                    <Link to="/post-detail">
                        <EventCard title={"Hackathon 2025: Crea la Prossima Grande App!"} category={"Tecnologia & Innovazione"} />
                    </Link>
                </div>
                <div className="flex justify-center mb-40">
                    <Button3 text={"Scopri di più"} />
                </div>
            </div>
        </>
    )
}

export default Home*/
