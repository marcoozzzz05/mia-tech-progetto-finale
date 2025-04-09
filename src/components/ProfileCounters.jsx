import { useState, useEffect } from "react";
import Button1 from "../Button1";

const ProfileCounters = ({ 
  profileUserId, 
  currentUserId,
  initialFollowers,
  initialFollowing,
  initialPosts,
  initialRating,
  isBusiness = false
}) => {
  const [followerCount, setFollowerCount] = useState(initialFollowers || 0);
  const [isFollowing, setIsFollowing] = useState(false);

  // Inizializza lo stato del follow dal localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("glokal_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsFollowing(user.following?.includes(profileUserId) || false);
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
      
      console.log(`Successfully ${isFollowing ? 'unfollowed' : 'followed'} user ${profileUserId}`);

    } catch (err) {
      console.error("Error updating follow status:", err);
    }
  };

  return (
    <div className="flex justify-around items-center py-4">
      <div className="flex flex-col items-center px-3">
        <p className="font-semibold">{initialPosts || 0}</p>
        <span className="text-xs text-gray-500">Post</span>
      </div>
      
      <div className="flex flex-col items-center px-3">
        <p className="font-semibold">{followerCount}</p>
        <span className="text-xs text-gray-500">Follower</span>
      </div>
      
      {isBusiness ? (
        <div className="flex flex-col items-center px-3">
          <p className="font-semibold">{initialRating?.toFixed(1) || '0'}</p>
          <span className="text-xs text-gray-500">Rating</span>
        </div>
      ) : (
        <div className="flex flex-col items-center px-3">
          <p className="font-semibold">{initialFollowing || 0}</p>
          <span className="text-xs text-gray-500">Seguiti</span>
        </div>
      )}
      
      {currentUserId && currentUserId !== profileUserId && (
        <div className="ml-4">
          <Button1
            text={isFollowing ? "Già seguito" : "Segui"}
            onClick={handleFollowToggle}
            className="min-w-[100px]"
          />
        </div>
      )}
    </div>
  );
};

export default ProfileCounters;