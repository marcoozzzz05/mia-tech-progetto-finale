import category from "../category.json"
import EventCard from "../components/EventCard/EventCard";

function Home() {
    console.log(category);
  return (
    <>
    <div>
        <h2>Esplora le categorie</h2>
    </div>
    <div className="flex justify-between p-4 text-center mt-4 mb-4">
        {category.map((item, index) => { 
            return (
            <div key={ index }>
                <img src={`/src/assets/img/category/${item.img}`} />
                <span> { item.name } </span>
            </div>
            )
        })}
    </div>
    <div>
        <h2>Ultimi eventi aggiunti</h2>
    </div>
    <div className="flex justify-between p-4 mt-4 mb-4">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
    </div>
    </>
  )
}

export default Home
