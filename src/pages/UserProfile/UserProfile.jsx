import { useState } from "react"
import EventCard from "../../components/EventCard/EventCard"
import avatar from "../../assets/img/User-avatar.png";
import bgImage from "../../assets/img/bg-profile.png"
import ReviewCard from "../../components/Reviews/ReviewCard";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("saved");

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

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto p-4">
        <div className="relative mx-auto bg-white shadow-md rounded-2xl overflow-hidden min-h-[200px] md:min-h-[280px] flex flex-col justify-end p-4">
          <div className="absolute top-0 left-0 w-full h-1/3 md:h-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
          <div className="relative p-1 md:p-10 flex flex-row items-center justify-between">
            <div className="flex flex-row items-center space-x-6">
              <div className="w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-l from-[#6a0572] to-[#ffc300]">
                <img src={avatar} alt="User Avatar" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="flex flex-col items-start">
                <h2 className="text-xl md:text-2xl text-[#2e2e2e] font-bold">Valentina Olla</h2>
                <p className="text-gray-600">@Valu</p>
              </div>
            </div>
            <div className="flex space-x-4 justify-end gap-3 sm:gap- text-sm sm:text-base text-[#2e2e2e]">
              <span>473 follower</span>
              <span>467 seguiti</span>
              <span>3 post salvati</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10 text-[#2e2e2e]">
        <button className={`px-4 py-2 text-lg font-semibold ${ activeTab === "saved" ? "border-b-4 border-[#ffc300]" : "text-gray-500" }`}
            onClick={() => setActiveTab("saved")}>
            POST SALVATI
          </button>
          <button className={`px-4 py-2 text-lg font-semibold ${ activeTab === "reviews" ? "border-b-4 border-[#ffc300]" : "text-gray-500" }`}
            onClick={() => setActiveTab("reviews")}>
            LE MIE RECENSIONI
          </button>
        </div>

        <div className="flex flex-wrap justify-center text-center mt-10 mb-20 gap-12 md:gap-16 cursor-pointer max-w-full">
          {activeTab === "saved" ? (
            [1, 2, 3].map((item) => <EventCard key={item} title="Saved Post" content="Saved post content..." />)
            ) : userReviews.length > 0 ? (
            userReviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
            ))
            ) : (
            <p className="text-center py-10">Nessuna recensione disponibile.</p>
            )}
        </div>
    </div>
  )
}

export default UserProfile
