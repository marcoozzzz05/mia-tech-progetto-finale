import EventCard from "../../components/EventCard/EventCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import Navbar from "../../components/Navbar/Navbar";
import TopNavbar from "../../components/Navbar/TopNavbar";
import { Link } from "react-router-dom";
import Footer from '../../Footer'
import Button1 from '../../Button1'
import Button2 from '../../Button2'
import Button3 from '../../Button3'

const Home = () => {
    return (
        <div className="m-0">
            <div className="fixed top-0 w-full z-10">
                {/*TopNavbar*/}
            </div>

            <EventCard />

            <div className='mt-4'>
                <Link to="/settings"><Button1 text={"Settings"} /></Link>
            </div>
            <div className='mt-4'>
                <Link to="/signup"><Button2 text={"Sign Up"} /></Link>
            </div>
            <div className='mt-4'>
                <Link to="/seemore"><Button3 text={"See More"} /></Link>
            </div>

            <div className="fixed top-0 w-full z-10">
                 {/*Navbar*/}
            </div>
            <Footer />
        </div>
    );
};

export default Home;