import React from 'react'
import Button1 from '../components/Buttons/Button1'

const SavedPostsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <h2 className="text-white font-semibold text-lg mt-4">Non hai ancora salvato nessun post</h2>
        <p className="text-white text-sm mt-2 mb-2">
          Scopri tutti gli eventi della nostra community!
        </p>
        <a href="/">
          <Button1 text={"Esplora"} />
        </a>
    </div>
  )
}

export default SavedPostsPage
