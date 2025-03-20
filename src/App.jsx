import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './Footer'
import Button1 from './Button1'
import Button2 from './Button2'
import Button3 from './Button3'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <h1 class="text-3xl font-bold underline">
        Hello world!
      </h1>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
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
