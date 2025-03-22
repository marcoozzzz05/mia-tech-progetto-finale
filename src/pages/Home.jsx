import SearchBar from "../components/SearchBar/SearchBar";
import Footer from "../Footer";
import category from "../category.json"
import EventCard from "../components/EventCard/EventCard";
import Button3 from "../components/Buttons/Button3";

function Home() {
    console.log(category);
  return (
    <>
    <SearchBar />
    <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mt-10 forced-colors:[#2e2e2e]">Esplora le categorie</h2>
    <div className="flex flex-wrap justify-center text-center mt-10 mb-20 gap-20 md:gap-20 max-w-full">
        {category.map((item, index) => { 
            return (
            <div key={ index } className="flex flex-col items-center">
                <img className="w-24 -24 md:w-28 md:h-28 lg:w-32 lg:h-32 cursor-pointer max-w-full" src={`/src/assets/img/category/${item.img}`} />
                <span className="mt-2 text-xs md:text-sm lg:text-sm font-semibold text-center break-words cursor-pointer forced-colors:[#2e2e2e]"> { item.name } </span>
            </div>
            )
        })}
    </div>
    <div>
        <h2 className="text-2xl font-bold mt-10 forced-colors:[#2e2e2e]">Ultimi post aggiunti</h2>
    </div>
    <div className="flex flex-wrap justify-center text-center mt-10 mb-20 gap-12 md:gap-16 cursor-pointer max-w-full">
        <EventCard title={"Saturday Jazz: un concerto imperdibile nel cuore di Milano"} category={ "Intrattenimento" }/>
        <EventCard title={"Sandro Cappai: Stand-Up Comedy a Cagliari"} category={ "Intrattenimento" }/>
        <EventCard title={"Giornate FAI di Primavera"} category={ "Eventi culturali & Arte" }/>
        <EventCard title={"Amatriciana&Carbonara Festival"} category={ "Ristorazione" }/>
    </div>
    <div className="flex justify-center mb-20">
        <Button3 text={"Scopri di più"} />
    </div>
    <div>
        <h2 className="text-2xl font-bold mt-10 forced-colors:[#2e2e2e]">Potrebbero interessarti</h2>
    </div>
    <div className="flex flex-wrap justify-center text-center mt-10 mb-20 gap-12 md:gap-16 cursor-pointer max-w-full">
        <EventCard title={"Masterclass di Public Speaking: Comunica con Impatto"} category={ "Educazione & Formazione" }/>
        <EventCard title={"AI e Futuro del Lavoro: Come l'Intelligenza Artificiale Sta Cambiando il Mondo"} category={ "Tecnologia & Innovazione" }/>
        <EventCard title={"Maratona Urbana: Corri tra le Meraviglie della Città di Palermo"} category={ "Sport & Fitness" }/>
        <EventCard title={"Hackathon 2025: Crea la Prossima Grande App!"} category={ "Tecnologia & Innovazione" }/>
    </div>
    <div className="flex justify-center mb-20">
        <Button3 text={"Scopri di più"} />
    </div>
    </div>
    </>
  )
}

export default Home
