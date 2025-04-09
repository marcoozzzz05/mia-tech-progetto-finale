import { useState, useEffect } from "react";
import Button1 from "../Button1";

const UserProfileCounters = ({ 
  profileUserId,
  currentUserId,
  initialFollowers,
  initialFollowing,
  initialPosts
}) => {
  const [followerCount, setFollowerCount] = useState(initialFollowers || 0);
  const [followingCount, setFollowingCount] = useState(initialFollowing || 0);
  const [isFollowing, setIsFollowing] = useState(false);

  // Inizializza lo stato dal localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("glokal_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsFollowing(user.following?.includes(profileUserId) || false);
      setFollowingCount(user.followingCount || 0);
    }
  }, [profileUserId]);

  const handleFollowToggle = () => {
    try {
      const storedUser = localStorage.getItem("glokal_user");
      if (!storedUser) return;
      
      const user = JSON.parse(storedUser);
      const updatedUser = { ...user };
      
      // Aggiorna l'array following
      let newFollowing = [...(updatedUser.following || [])];
      
      if (isFollowing) {
        // Rimuovi follow
        newFollowing = newFollowing.filter(id => id !== profileUserId);
      } else {
        // Aggiungi follow
        newFollowing.push(profileUserId);
      }
      
      updatedUser.following = newFollowing;
      updatedUser.followingCount = newFollowing.length;
      
      // Aggiorna localStorage
      localStorage.setItem("glokal_user", JSON.stringify(updatedUser));
      
      // Aggiorna lo stato UI
      setIsFollowing(!isFollowing);
      setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
      setFollowingCount(newFollowing.length);
      
      console.log(`Successfully ${isFollowing ? 'unfollowed' : 'followed'} user ${profileUserId}`);

    } catch (err) {
      console.error("Error updating follow status:", err);
    }
  };

  return (
    <div className="flex space-x-4 justify-end gap-3 sm:gap- text-sm sm:text-base text-[#2e2e2e]">
      <span>{initialPosts} Post</span>
      <span>{followerCount} Follower</span>
      <span>{followingCount} Seguiti</span>
      
      {currentUserId && currentUserId !== profileUserId && (
        <button 
          onClick={handleFollowToggle}
          className={`px-3 py-1 rounded-md text-sm ${
            isFollowing 
              ? "bg-gray-200 text-gray-700" 
              : "bg-[#6a0572] text-white"
          }`}
        >
          {isFollowing ? "Già seguito" : "Segui"}
        </button>
      )}
    </div>
  );
};

export default UserProfileCounters;