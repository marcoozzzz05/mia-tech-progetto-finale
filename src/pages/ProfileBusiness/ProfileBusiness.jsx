import { Heart, Star, Briefcase, MessageCircle, Share2 } from "lucide-react";
import Button1 from "../../Button1"

const Profile = () => {
    // Dati fittizi per testare il layout senza server
    const profile = {
        avatar: "https://media.licdn.com/dms/image/v2/C4D03AQHndSyrLVoL7Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1556275063302?e=2147483647&v=beta&t=R6emfX0iQFgEdQNALPOmbrMjXeMlvHcaRYi4We60R6E",
        name: "Vincent Santana",
        location: "Tel Aviv, Israel",
        likes: 845,
        rating: "5",
        jobs: 30,
        bio: "For the past five years I've been a chef at Tel Aviv restaurants and now decided to go independent. I offer home dining and food delivery.",
        expertise: ["Italian", "French", "Pizzas", "Desserts"],
        services: [
            { name: "Home dinner", price: "$20", image: "https://via.placeholder.com/150" },
            { name: "Food delivery", price: "$30", image: "https://via.placeholder.com/150" }
        ],
        reviews: [
            { name: "Jacob", rating: 5, comment: "Dana makes the best pizza in Tel Aviv! Great value for money, only downside is the delivery time.", daysAgo: 2 },
            { name: "Daniel", rating: 5, comment: "Yesterday my friends and I had dinner at Dana's house, she was such a gracious host, can't thank her enough for the amazing meal.", daysAgo: 3 },
            { name: "Or", rating: 3, comment: "Dana has a great selection of desserts, though a bit overpriced in my opinion.", daysAgo: 5 }
        ],
        servicePictures: [
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150"
        ]
    };

    return (
        <div className="bg-gradient-to-b from-purple-800 to-yellow-500 min-h-screen p-6 text-white">
            <div className="max-w-lg mx-auto rounded-2xl shadow-lg overflow-hidden">
                <div className="relative text-center p-6">
                    <img
                        src={profile.avatar}
                        alt="Avatar"
                        className="w-24 h-24 border-4 border-white rounded-full mx-auto"
                    />
                    <h2 className="text-2xl font-bold mt-2">{profile.name}</h2>
                    <p className="text-sm text-gray-300">{profile.location}</p>
                </div>
                <div className="flex justify-around p-4">
                    <div className="flex flex-col items-center">
                        <p className="flex gap-1 items-center"><Heart className="w-4 h-4" /> {profile.likes}</p>
                        <span>Likes</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="flex gap-1 items-center"><Star className="w-4 h-4" /> {profile.rating}</p>
                        <span>Rating</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <p>{profile.jobs}</p>
                        <span>Jobs</span>
                    </div>

                </div>
                    <div className="flex justify-center gap-4 p-6">
                        <Button1 text="Request" icon={<Briefcase className="w-20 h-6" />} />
                        <Button1 text="Chat" icon={<MessageCircle className="w-20 h-6" />} />
                        <Button1 text="Favorite" icon={<Heart className="w-20 h-6" />} />
                        <Button1 text="Share" icon={<Share2 className="w-20 h-6" />} />
                    </div>

                <div className="p-6">
                    <h3 className="text-lg font-semibold">Services</h3>
                    <div className="flex gap-4 mt-2">
                        {profile.services.map((service, index) => (
                            <div key={index} className="relative w-1/2 bg-white rounded-lg overflow-hidden">
                                <img src={service.image} alt={service.name} className="w-full h-24 object-cover" />
                                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded">{service.price}</div>
                                <p className="text-black text-center py-2">{service.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-lg font-semibold">Vincent's Expertise</h3>
                    <div className="flex gap-2 mt-2">
                        {profile.expertise.map((skill, index) => (
                            <span key={index} className="px-3 py-1 cursor-pointer text-white rounded-full text-sm">{skill}</span>
                        ))}
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-lg font-semibold">They are saying...</h3>
                    <div className="mt-2">
                        {profile.reviews.map((review, index) => (
                            <div key={index} className="border-b border-gray-500 py-2">
                                <p className="font-bold">{review.name} <span className="text-yellow-300">{"★".repeat(review.rating)}</span></p>
                                <p className="text-sm text-gray-300">{review.comment}</p>
                                <p className="text-xs text-gray-400">{review.daysAgo} days ago</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center p-6">
                    <Button1 className="text-purple-900 rounded-full" text={"See More..."} />
                </div>
                <div className="p-6">
                    <h3 className="text-lg font-semibold">About Me</h3>
                    <p className="text-sm text-gray-300 mt-2">{profile.bio}</p>
                </div>

                <div className="p-6">
                    <h3 className="text-lg font-semibold">Services pictures</h3>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        {profile.servicePictures.map((pic, index) => (
                            <img key={index} src={pic} alt="Service" className="w-full h-24 object-cover rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
