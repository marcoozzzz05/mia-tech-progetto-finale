import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getPost } from "../../services/postService";

const EventCard = ({ post }) => {
    const navigate = useNavigate();

    if (!post) {
        return <p>Caricamento...</p>;
    }

    return (
        <div onClick={() => navigate(`/post-detail/${post._id}`)} className="w-80 rounded-2xl shadow-lg overflow-hidden bg-white border border-gray-200">
            <div className="relative">
                <img
                    src={'http://localhost:3000/assets/' + post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                />
            </div>
            <div className="p-4">
                <div className="flex items-center gap-3">
                    <img
                        src={'http://localhost:3000/assets/' + (post.user?.profile_image || 'default-avatar.jpg')}
                        alt="Organizer"
                        className="w-10 h-10 rounded-full border"
                    />
                    <span className="font-semibold text-sm">{post.user?.name || "Utente sconosciuto"}</span>
                </div>
                <h2 className="font-bold text-lg mt-2">{post.title}</h2>
                <p className="text-gray-500 text-sm mt-1">{post.place}</p>
                <p className="text-gray-500 text-sm mt-1">Like: {post.likes?.length || 0}</p>
            </div>
        </div>
    );
};

export default EventCard;