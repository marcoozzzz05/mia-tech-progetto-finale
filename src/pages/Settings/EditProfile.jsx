import { useState } from "react";
import Button1 from "../../components/Buttons/Button1";
import { Camera } from "lucide-react";

const EditProfile = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Funzione per validare la password
    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    // Funzione per gestire il cambio della password
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (!validatePassword(newPassword)) {
            setPasswordError("Password must include at least one uppercase letter, one number, and one special character.");
        } else {
            setPasswordError(""); // Reset error if valid
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 -mt-30">
            <div className="w-full max-w-md sm:max-w-lg rounded-2xl shadow-lg overflow-hidden">
                {/* Cover Photo */}
                <h2 className="text-gray-700 text-center text-xl font-semibold mb-4 mt-4">EDIT PROFILE</h2>
                <div className="relative">
                    <img
                        src="https://media.istockphoto.com/id/1806011581/es/foto/j%C3%B3venes-felices-y-alegres-bailando-saltando-y-cantando-durante-el-concierto-del-grupo-favorito.jpg?s=612x612&w=0&k=20&c=Gd46vV8OOIgFzqE5hEH2LW30pNcAxGE8W6Jgd1mvHoI="
                        alt="Cover"
                        className="w-full h-32 object-cover"
                    />
                    <button className="absolute top-2 right-2 cursor-pointer bg-white p-1 rounded-full shadow">
                        <Camera size={16} className="text-gray-700" />
                    </button>
                </div>

                {/* Contenuto della card */}
                <div className="p-6">
                    {/* Profile Picture (sovrapposta) */}
                    <div className="relative flex justify-between -mt-10 mb-4">
                        <div className="relative w-20 h-20">
                            <img
                                src="https://media.istockphoto.com/id/1806011581/es/foto/j%C3%B3venes-felices-y-alegres-bailando-saltando-y-cantando-durante-el-concierto-del-grupo-favorito.jpg?s=612x612&w=0&k=20&c=Gd46vV8OOIgFzqE5hEH2LW30pNcAxGE8W6Jgd1mvHoI="
                                alt="Profile"
                                className="w-20 h-20 rounded-full border-4 border-purple-800 object-cover"
                            />
                            <button className="absolute bottom-0 right-0 cursor-pointer bg-white p-1 rounded-full shadow">
                                <Camera size={16} className="text-gray-700" />
                            </button>
                        </div>
                    </div>

                    {/* Pulsanti Cancel e Save */}
                    <div className="flex justify-between mt-6 gap-3 mb-4">
                        <Button1 className="bg-gray-700 text-white" text={"Cancel"} />
                        <Button1
                            className="bg-purple-500 hover:bg-purple-600 text-white"
                            text={"Save"}
                            disabled={passwordError !== ""}
                        />
                    </div>

                    {/* Form di modifica */}
                    <div className="space-y-4">
                        <div>
                            <label className="text-gray-500 text-sm">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                maxLength={20}
                                className="mt-1 w-full p-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="text-gray-500 text-sm">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                maxLength={20}
                                className="mt-1 w-full p-2 rounded"
                            />
                        </div>
                        <div>
                            <label className="text-gray-500 text-sm">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                maxLength={20}
                                className="mt-1 w-full p-2 rounded"
                            />
                            {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
                        </div>
                        <div>
                            <label className="text-gray-500 text-sm">Biografia</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                maxLength={160}
                                className="mt-1 w-full p-2 rounded"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
