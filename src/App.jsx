import './App.css'
import Navbar from './components/Navbar/Navbar'
import TopNavbar from './components/Navbar/TopNavbar'

function App() {

  return (
    <>
      <div className="flex flex-col min-h-screen">
      <TopNavbar />
        <Navbar />
      </div>
    </>
  )
}

export default App
