import Button1 from "../../Button1"

const FavoritePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-800 to-orange-400 px-6">
      <div className="flex flex-col items-center text-center">
        <div className="bg-white p-4 rounded-full shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-16 h-16 text-pink-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <h2 className="text-white font-semibold text-lg mt-4">NO FAVOURITES YET</h2>
        <p className="text-white text-sm mt-2">
          Make sure you have added event’s in this section
        </p>

        <Button1 className="mt-6 px-6 py-3 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition" text={"ADD FAVOURITES"} />

      </div>
    </div>
  )
}

export default FavoritePage
