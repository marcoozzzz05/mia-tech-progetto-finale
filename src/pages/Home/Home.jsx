import EventCard from "../../components/EventCard/EventCard";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
    return (
        <div className="m-0">
           <SearchBar />
           <EventCard />
        </div>
    );
};

export default Home;