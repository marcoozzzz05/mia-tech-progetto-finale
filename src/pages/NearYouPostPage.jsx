import { useEffect, useState } from "react";
import { getPostsByPlace, likePost } from "../services/postService";
import EventCard from "../components/EventCard/EventCard";
import { Link } from "react-router";

function NearYouPostPage() {
    const [posts, setPosts] = useState([]);
    const [userCity, setUserCity] = useState("MILANO");
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("glokal_user"));
        if (userData) {
            setUserId(userData._id);
            setUserCity(userData.city);
        }

        if (userCity) {
            getPostsByPlace(userCity, 30)
                .then(response => {
                    setPosts(response.data);
                })
                .catch(error => {
                    console.error("Errore nel recupero dei post per città:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [userCity]);

    const handleLike = async (postId) => {
        if (!userId) {
            console.error("Utente non autenticato");
            return;
        }

        try {
            await likePost(postId, userId);
            setPosts(posts.map(post =>
                post._id === postId
                    ? { ...post, likes: [...post.likes, userId] }
                    : post
            ));
        } catch (error) {
            console.error("Errore nel mettere like al post:", error);
        }
    };

    const renderPosts = () => {
        if (loading) {
            return (
                <div className="w-full flex justify-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6a0572]"></div>
                </div>
            );
        }

        if (posts.length === 0) {
            return <p className="text-gray-500 text-lg w-full">Non ci sono ancora post nella tua città.</p>;
        }

        return posts.map(post => (
            <EventCard
                key={post._id}
                post={{
                    ...post,
                    title: post.title || "Titolo non disponibile",
                    image: post.image || "Immagine non disponibile",
                    user: post.user ? {
                        name: `${post.user.first_name} ${post.user.last_name}`,
                        profile_image: post.user.profile_image || 'default-avatar.jpg'
                    } : {
                        name: "Utente sconosciuto",
                        profile_image: 'default-avatar.jpg'
                    },
                    likes: post.likes || []
                }}
                onLike={handleLike}
            />
        ));
    };

    return (
        <div className="container mx-auto mb-20 px-6 py-2">
            <h2 className="text-2xl text-[#2e2e2e] font-bold">Vicino a te {userCity}</h2>
            <div className="flex flex-wrap justify-center text-center mt-10 mb-20 gap-12 md:gap-16 cursor-pointer max-w-full">
                {renderPosts()}
            </div>
        </div>
    );
}

export default NearYouPostPage;