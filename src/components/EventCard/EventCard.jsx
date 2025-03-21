import { Heart } from "lucide-react";

const group = [
    "data:image/jpeg;base64,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",
    "data:image/jpeg;base64,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",
    "data:image/jpeg;base64,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"
]

const EventCard = () => {
    return (
        <div className="w-80 rounded-2xl shadow-lg overflow-hidden bg-white border border-gray-200">
              {/* contiene la foto dele evento piu span con  tipologia del contenuto */}
            <div className="relative">
                <img
                    src="https://media.istockphoto.com/id/1806011581/es/foto/j%C3%B3venes-felices-y-alegres-bailando-saltando-y-cantando-durante-el-concierto-del-grupo-favorito.jpg?s=612x612&w=0&k=20&c=Gd46vV8OOIgFzqE5hEH2LW30pNcAxGE8W6Jgd1mvHoI="
                    alt="Concert"
                    className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 left-3 bg-white text-gray-700 text-xs font-semibold px-3 py-1 rounded-full shadow">
                    Entertainment
                </span>
                  {/* btn in forma di cuore presso da la libreria di react */}
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
                    <Heart className="text-red-500 w-5 h-5" fill="currentColor" />
                </button>
            </div>
          {/* contiene l'imagine con affianco il mio nome in questo caso ed il resto d'informazioni sull'evento */}
            <div className="p-4">
                <div className="flex items-center gap-3">
                    <img
                        src="https://media.licdn.com/dms/image/v2/C4D03AQHndSyrLVoL7Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1556275063302?e=2147483647&v=beta&t=R6emfX0iQFgEdQNALPOmbrMjXeMlvHcaRYi4We60R6E"
                        alt="Organizer"
                        className="w-10 h-10 rounded-full border"
                    />
                    <span className="font-semibold text-sm">Vincent Santana</span>
                </div>
                <h2 className="font-bold text-lg mt-2">Going to a Rock Concert</h2>
                <p className="text-gray-500 text-sm mt-1">THU 26 May, 09:00 - FRI 27 May, 10:00</p>
                
                <div className="flex items-center mt-3 justify-between">
                    <div className="flex -space-x-2">
                        {group.map((src, i) => (
                            <img key={i}
                                 src={src}
                                 alt="Attendee"
                                 className="w-8 h-8 rounded-full border border-white"
                            />
                        ))}
                        <span className="bg-gray-200 text-sm font-semibold px-2 py-1 rounded-full">+15</span>
                    </div>
                    <span className="text-yellow-500 font-semibold">$30.00</span>
                </div>
            </div>
        </div>
    );
};

export default EventCard;