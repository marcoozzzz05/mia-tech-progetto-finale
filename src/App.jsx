import './App.css'
import EventCard from "./components/EventCard/EventCard"
import SearchBar from './components/SearchBar/Searchbar'


function App() {

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <SearchBar />
        <EventCard />
      </div>
    </>
  )
}

export default App
