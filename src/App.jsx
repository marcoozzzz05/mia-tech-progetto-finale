import './App.css'
import EventCard from "./components/EventCard/EventCard"
import SearchBar from './components/SearchBar/Searchbar'

import Footer from './Footer'
import Button1 from './Button1'
import Button2 from './Button2'
import Button3 from './Button3'

function App() {

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <SearchBar />
        <EventCard />
      </div>
      <Footer />
      <div className='mt-4'>
        <Button1 text={"Settings"}/>
      </div>
      <div className='mt-4'>
        <Button2 text={"Sign Up"}/>
      </div>
      <div className='mt-4'>
        <Button3 text={"See More"}/>
      </div>
    </>
  )
}

export default App
