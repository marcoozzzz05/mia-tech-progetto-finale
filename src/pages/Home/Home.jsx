import EventCard from "../../components/EventCard/EventCard";
import Button3 from "../../components/Buttons/Button3";
import { Link } from "react-router";

function Home() {
    return (
        <>
            <div className="container mx-auto px-6 py-2">
                <div>
                    <h2 className="text-2xl text-[#2e2e2e] font-bold">Ultimi post aggiunti</h2>
                </div>

                <div className="flex flex-wrap justify-center text-center mt-10 mb-20 gap-12 md:gap-16 cursor-pointer max-w-full">
                    <Link to="/post-detail">
                        <EventCard title={"Saturday Jazz: un concerto imperdibile nel cuore di Milano"} category={"Intrattenimento"} />
                    </Link>
                    <Link to="/post-detail">
                        <EventCard title={"Sandro Cappai: Stand-Up Comedy a Cagliari"} category={"Intrattenimento"} />
                    </Link>
                    <Link to="/post-detail">
                        <EventCard title={"Giornate FAI di Primavera"} category={"Eventi culturali & Arte"} />
                    </Link>
                    <Link to="/post-detail">
                        <EventCard title={"Amatriciana&Carbonara Festival"} category={"Ristorazione"} />
                    </Link>
                </div>
                <div className="flex justify-center mb-20">
                    <Button3 text={"Scopri di più"} />
                </div>
                <div>
                    <h2 className="text-2xl text-[#2e2e2e] font-bold mt-10">Potrebbero interessarti</h2>
                </div>
                <div className="flex flex-wrap justify-center text-center mt-10 mb-20 gap-12 md:gap-16 cursor-pointer max-w-full">
                    <Link to="/post-detail">
                        <EventCard title={"Masterclass di Public Speaking: Comunica con Impatto"} category={"Educazione & Formazione"} />
                    </Link>
                    <Link to="/post-detail">
                        <EventCard title={"AI e Futuro del Lavoro: Come l'Intelligenza Artificiale Sta Cambiando il Mondo"} category={"Tecnologia & Innovazione"} />
                    </Link>
                    <Link to="/post-detail">
                        <EventCard title={"Maratona Urbana: Corri tra le Meraviglie della Città di Palermo"} category={"Sport & Fitness"} />
                    </Link>
                    <Link to="/post-detail">
                        <EventCard title={"Hackathon 2025: Crea la Prossima Grande App!"} category={"Tecnologia & Innovazione"} />
                    </Link>
                </div>
                <div className="flex justify-center mb-40">
                    <Button3 text={"Scopri di più"} />
                </div>
            </div>
        </>
    )
}

export default Home
