import { Heart, Star, Pen, MessageCircle, Share2, Settings } from "lucide-react";
import Button1 from "../../Button1"
import { useEffect, useState } from "react";
import { Link } from "react-router";
import EventCard from "../../components/EventCard/EventCard"
import ReviewCard from "../../components/Reviews/ReviewCard";


const Profile = () => {
    const [data, setData] = useState({})
    const [activeTab, setActiveTab] = useState("created");

    useEffect(() => {
        const profile1 = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/users/")
                const dati = await response.json();
                setData(dati);
            } catch (err) {
                console.error(err);
            }
        };

        profile1();
    }, []);

    const profile = {
        avatar: "https://media.licdn.com/dms/image/v2/C4D03AQHndSyrLVoL7Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1556275063302?e=2147483647&v=beta&t=R6emfX0iQFgEdQNALPOmbrMjXeMlvHcaRYi4We60R6E",
        name: "Vincent Santana",
        location: "Milano",
        likes: 845,
        rating: "5",
        post: 3,
        bio: "Negli ultimi cinque anni ho lavorato come chef nei migliori ristoranti di Milano e ora ho deciso di diventare indipendente. Offro cene a domicilio e consegne di cibo.",
        expertise: ["Italiano", "Francese", "Pizza", "Desserts"],
        services: [
            { name: "Cena a domicilio", price: "€50" },
            { name: "Consegna a domicilio", price: "€35" }
        ],
    };

    const userReviews = [
        { eventId: "1", eventName: "Jacob", rating: 5, comment: "La migliore pizza di Milano!" },
        { eventId: "2", eventName: "Daniel", rating: 5, comment: "Cena eccezionale con Vincent!" },
        { eventId: "3", eventName: "Or", rating: 3, comment: "Desserts un po' costosi..." },
    ];

    return (
        <div className="min-h-screen p-6 text-[#2e2e2e] flex justify-center">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6">
                <div className="relative text-center">
                    <img
                        src={profile.avatar}
                        alt="Avatar"
                        className="w-24 h-24 p-1 bg-gradient-to-l from-[#6a0572] to-[#ffc300] rounded-full mx-auto"
                    />
                    <Link to="/settings">
                        <button className="absolute ml-3 -mt-7 p-2 rounded-full">
                            <Settings className="w-5 h-5 p-0.5 bg-[#9b5de5] rounded-full text-white hover:text-[#ffc300]" />
                        </button>
                    </Link>
                    <h2 className="text-2xl font-bold mt-2">{profile.name}</h2>
                    <p className="text-sm text-gray-500">{profile.location}</p>
                </div>

                <div className="flex justify-around py-4 mt-4">
                    <div className="flex flex-col items-center">
                        <p className="flex gap-1 items-center"><Heart className="w-4 h-4" /> {profile.likes}</p>
                        <span className="text-xs text-gray-500">Likes</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="flex gap-1 items-center"><Star className="w-4 h-4" /> {profile.rating}</p>
                        <span className="text-xs text-gray-500">Rating</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <p>{profile.post}</p>
                        <span className="text-xs text-gray-500">Post</span>
                    </div>
                </div>

                <div className="flex justify-center gap-4 p-6">
                    <Link to="/crea-post">
                        <Button1 icon={<Pen className="w-5 h-5" />} />
                    </Link>
                    <Button1 icon={<MessageCircle className="w-5 h-5" />} />
                    <Button1 icon={<Share2 className="w-5 h-5" />} />
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Su di me</h3>
                    <p className="text-sm text-gray-600 mt-2">{profile.bio}</p>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold">I miei servizi</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        {profile.services.map((service, index) => (
                            <div key={index} className="flex justify-between border p-3 rounded-lg">
                                <span className="text-[#2e2e2e] font-medium">{service.name}</span>
                                <span className="bg-[#ffc300] px-3 py-1 rounded text-sm font-medium">{service.price}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold">I miei punti forti</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {profile.expertise.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-[#f7f1f7] rounded-full text-sm">{skill}</span>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-10 text-gray-700">
                    <button
                        className={`px-4 py-2 text-lg font-semibold ${activeTab === "created" ? "border-b-4 border-[#ffc300]" : "text-gray-500"}`}
                        onClick={() => setActiveTab("created")}>
                        POST
                    </button>
                    <button
                        className={`px-4 py-2 text-lg font-semibold ${activeTab === "reviews" ? "border-b-4 border-[#ffc300]" : "text-gray-500"}`}
                        onClick={() => setActiveTab("reviews")}>
                        RECENSIONI
                    </button>
                </div>

                <div className="flex flex-wrap justify-center text-center mt-10 mb-20 gap-12 md:gap-16 cursor-pointer max-w-full">
                    {activeTab === "created" ? (
                        [1, 2, 3].map((item) => <EventCard key={item} title="Cena" content="Saved post content..." />)
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

export default Profile;
