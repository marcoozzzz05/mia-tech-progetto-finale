import './App.css'
import EventCard from './components/EventCard/EventCard'
import Navbar from './components/Navbar/Navbar'
import TopNavbar from './components/Navbar/TopNavbar'
import SearchBar from './components/SearchBar'

function App() {

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <TopNavbar />
        <SearchBar />
        <EventCard />
        <Navbar />
      </div>
    </>
  )
}

export default App
