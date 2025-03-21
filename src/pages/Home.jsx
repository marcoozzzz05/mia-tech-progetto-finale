import category from "../category.json"
import EventCard from "../components/EventCard/EventCard";
import Button2 from "../Button2";
import Button3 from "../Button3";
import Button1 from "../Button1";

function Home() {
    console.log(category);
  return (
    <>
    <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mt-10 forced-colors:[#2e2e2e]">Esplora le categorie</h2>
    <div className="flex flex-wrap justify-center text-center mt-10 mb-20 gap-16 md:gap-20 max-w-full">
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-6 mt-10 mb-20 cursor-pointer max-w-full">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
    </div>
    <div className="flex justify-center mb-20">
        <Button1 />
        <Button2 />
        <Button3 />
    </div>
    </div>
    </>
  )
}

export default Home
