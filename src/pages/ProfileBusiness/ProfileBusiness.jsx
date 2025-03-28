import { useState, useEffect } from "react";
import { NavLink, Route, Routes, Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import Button1 from "../../Button1";
import Navbar from "../../components/Navbar/Navbar";
import TopNavbar from "../../components/Navbar/TopNavbar";
import { Heart, Users } from "lucide-react";
import Myreviews from "./Myreviews";
import Mypost from "./Mypost";

const ProfileBusiness = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("reviews");

    useEffect(() => {
        if (location.pathname === "/profile") {
            navigate("/profile/reviews", { replace: true });
        }
        setActiveTab(location.pathname.split("/").pop() || "reviews");
    }, [location, navigate]);

    return (
        <div className="bg-gradient-to-b from-purple-800 to-yellow-500 min-h-screen p-6 relative ">
            <div className="fixed top-0 w-full z-10">
               {/*TopNavbar*/}
            </div>
            <div className="max-w-lg mx-auto rounded-2xl shadow-lg overflow-hidden mt-0">
                <img
                    src="https://media.istockphoto.com/id/1806011581/es/foto/j%C3%B3venes-felices-y-alegres-bailando-saltando-y-cantando-durante-el-concierto-del-grupo-favorito.jpg?s=612x612&w=0&k=20&c=Gd46vV8OOIgFzqE5hEH2LW30pNcAxGE8W6Jgd1mvHoI="
                    alt="Concert"
                    className="w-full h-38 object-cover"
                />

                <div className="flex justify-between mr-3 ml-8 -mt-4 text-white text-sm">
                    <img
                        src="https://media.licdn.com/dms/image/v2/C4D03AQHndSyrLVoL7Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1556275063302?e=2147483647&v=beta&t=R6emfX0iQFgEdQNALPOmbrMjXeMlvHcaRYi4We60R6E"
                        alt="Avatar"
                        className="w-20 h-20 border-4 border-white rounded-full"
                    />
                </div>
                <div className="flex ml-75 -mt-14 text-white text-sm gap-3">
                    <div className="flex flex-col items-center gap-1">
                        <p className="flex gap-1.5"><Users className="w-4 h-4" />2.5k</p>
                        <span>followers</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <p className="flex gap-1.5"><Users className="w-4 h-4" /> 1.3k</p>
                        <span>following</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <p className="flex gap-1.5"><Heart className="w-4 h-4" />366</p>
                        <span>favorites</span>
                    </div>
                </div>
                <div className="relative text-white p-6">

                    <div className="flex items-center gap-4">
                        <div className="absolute right-4">
                        <Link to="/settings">
    <Button1 className="text-purple-900 rounded-full" text={"SETTINGS"} />
  </Link>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">Peter Parker</h2>
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-gray-300">@spiderman2000</p>
                                <span className="bg-green-600 w-2 h-2 rounded-full"></span>
                            </div>
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-300">Amo la Cultura e cose Nuove. Locus ultrices feugiat in sem pulvinar volutpat.</p>

                </div>
                <div className="flex w-full relative">
                    <NavLink to="/profile/reviews" className={({ isActive }) => `flex-1 text-center py-2 font-bold ${isActive ? "text-purple-900" : "text-white"}`}>
                        I MIEI REVIEWS
                    </NavLink>
                    <NavLink to="/profile/mypost" className={({ isActive }) => `flex-1 text-center py-2 font-bold ${isActive ? "text-purple-900" : "text-white"}`}>
                       I MIEI POST 
                    </NavLink>
                    <div className={`absolute bottom-0 h-1 bg-yellow-500 transition-all duration-300 ${activeTab === "reviews" ? "left-0 w-1/2" : "left-1/2 w-1/2"}`}></div>
                </div>
                <div className="p-4">
                    <Routes>
                        <Route path="/" element={<Navigate to="/profile/reviews" replace />} />
                        <Route path="reviews" element={<Myreviews />} />
                        <Route path="mypost" element={<Mypost />} />
                    </Routes>
                </div>
            </div>
            <div className="fixed bottom-0 w-full z-10">
                 {/*Navbar*/}
            </div>
        </div>
    );
};

export default ProfileBusiness;
