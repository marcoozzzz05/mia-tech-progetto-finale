import { useState } from 'react';
import EventCard from "../components/EventCard/EventCard";
import ReviewCard from "../components/Reviews/ReviewCard";

const UserProfileTabSection = ({ 
  user,
  initialTab = "saved",
  onPostDeleted,
  defaultPosts = [],
  defaultReviews = []
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [posts, setPosts] = useState(defaultPosts);
  const [reviews, setReviews] = useState(defaultReviews);
  const [loading, setLoading] = useState(false);


  const handlePostDeletion = (postId) => {
    const newPosts = posts.filter(post => post._id !== postId);
    setPosts(newPosts);
    if (onPostDeleted) onPostDeleted(postId);
  };

  const tabs = [
    { 
      id: "saved", 
      label: "POST SALVATI",
      content: loading ? (
        <LoadingSpinner />
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <EventCard
            key={post._id}
            post={{
              ...post,
              title: post.title || "Titolo non disponibile",
              image: post.image || "Immagine non disponibile",
              user: {
                name: `${user.first_name} ${user.last_name}`,
                profile_image: user.profile_image
              },
              likes: post.likes || [],
            }}
            onDelete={handlePostDeletion}
          />
        ))
      ) : (
        <EmptyState message="Nessun post salvato" />
      )
    },
    { 
      id: "reviews", 
      label: "LE MIE RECENSIONI",
      content: reviews.length > 0 ? (
        reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))
      ) : (
        <EmptyState message="Nessuna recensione disponibile" />
      )
    }
  ];

  const LoadingSpinner = () => (
    <div className="w-full flex justify-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6a0572]"></div>
    </div>
  );
  
  const EmptyState = ({ message }) => (
    <div className="w-full text-center py-10">
      <p className="mb-4">{message}</p>
    </div>
  );

  return (
    <div className="profile-tab-section">
      <div className="flex justify-center mt-10 text-[#2e2e2e]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-lg font-semibold ${
              activeTab === tab.id 
                ? "border-b-4 border-[#ffc300]" 
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center text-center mt-10 mb-10 gap-12 md:gap-16 cursor-pointer max-w-full">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default UserProfileTabSection;