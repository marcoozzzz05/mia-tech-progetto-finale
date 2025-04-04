import logo from "../assets/img/logo/Glokal_white_logo.png";
import image from "../assets/img/glokal.jpeg"
import image2 from "../assets/img/glokal2.jpeg"
import image3 from "../assets/img/glokal3.jpeg"
import image4 from "../assets/img/glokal4.jpg"
import image5 from "../assets/img/glokal5.jpg"
import image6 from "../assets/img/glokal6.jpg"
import Footer from "../Footer"
import { useNavigate } from "react-router";

const LandingPage = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="relative w-full h-screen text-white">
                <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                <div className="relative flex items-center gap-4 px-6 sm:px-8 md:px-12 py-8 z-10 w-full">
                    <img src={logo} alt="Logo Glokal" className="w-36 sm:w-50 md:w-70 mt-6 ml-4 sm:ml-4" />
                    <button className="ml-auto bg-purple-500 px-6 sm:px-6 md:px-10 py-3 sm:py-3 rounded-md text-white hover:bg-purple-600 transition uppercase text-base sm:text-lg md:text-2xl font-bold cursor-pointer" onClick={() => navigate("/register-page")}>
                        Registrati
                    </button>
                    <button className="bg-yellow-500 text-black px-6 sm:px-6 md:px-10 py-3 sm:py-3 rounded-md text-lg sm:text-xl md:text-2xl font-bold uppercase hover:bg-yellow-600 transition cursor-pointer" onClick={() => navigate("/login")}>
                        Accedi
                    </button>
                </div>

                <div className="relative flex flex-col items-center text-center justify-center h-full px-6 sm:px-8 md:px-12 lg:px-16 z-10 pb-20 sm:pb-32">
                    <h2 className="text-yellow-400 text-xl sm:text-2xl md:text-3xl font-semibold">
                        DOVE LE PERSONE E GLI EVENTI SI INCONTRANO
                    </h2>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold my-4 uppercase leading-tight">
                        Dal globale al locale, <br /> con un click!
                    </h1>
                    <p className="max-w-2xl text-lg sm:text-xl md:text-2xl text-gray-300">
                        Il nostro social network unisce la scoperta locale alla condivisione globale, creando una community in cui ogni evento trova il suo pubblico.
                    </p>
                    <button className="mt-8 bg-yellow-500 text-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-md text-lg sm:text-xl md:text-2xl font-bold uppercase hover:bg-yellow-600 transition cursor-pointer" onClick={() => navigate("/register-page")}>
                        Iscriviti Ora!
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center bg-gradient-to-r from-white to-purple-200 py-16 sm:py-24 px-6 sm:px-8 md:px-12">
                    <div className="w-full sm:w-1/2 sm:pr-8">
                        <h2 className="text-purple-500 font-semibold text-xl sm:text-2xl">PER CHI CERCA EVENTI E ATTIVITÀ</h2>
                        <h1 className="text-black font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mt-4">
                            TROVA, SALVA E <br /> PARTECIPA AGLI EVENTI CHE AMI
                        </h1>
                        <p className="text-gray-600 text-lg sm:text-xl md:text-2xl mt-8">
                            Cerca eventi nella tua zona o ovunque nel mondo, filtra i risultati in base ai tuoi interessi e ricevi notifiche sugli aggiornamenti.
                            Puoi salvare gli eventi preferiti, lasciare recensioni e seguire utenti o attività per non perdere nulla!
                        </p>
                    </div>
                    <div className="w-full sm:w-fit mt-8 sm:mt-0">
                        <img src={image2} alt="Foto Glokal" className="rounded-lg shadow-lg w-full" />
                    </div>
                </div>

                <hr className="border-black" />

                <div className="flex flex-col sm:flex-row items-center justify-center bg-gradient-to-l from-white to-purple-200 py-16 sm:py-24 px-6 sm:px-8">
                    <div className="w-full sm:w-1/2 p-4">
                        <img src={image3} alt="Foto Glokal" className="rounded-lg shadow-lg w-6xl h-auto" />
                    </div>
                    <div className="w-full sm:w-1/2 sm:pl-8 md:pl-12">
                        <h2 className="text-purple-500 font-semibold text-xl sm:text-2xl">PER CHI ORGANIZZA E PROMUOVE EVENTI</h2>
                        <h1 className="text-black font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mt-4">
                            FATTI CONOSCERE <br /> E RAGGIUNGI IL PUBBLICO GIUSTO
                        </h1>
                        <p className="text-gray-600 text-lg sm:text-xl md:text-2xl mt-8">
                            Pubblica eventi con pochi click, aggiungi immagini e dettagli per attirare partecipanti e ricevi recensioni per aumentare la tua visibilità.
                            Comunica con chi è interessato e crea una community attorno ai tuoi eventi.
                        </p>
                    </div>
                </div>

                <hr className="border-black" />

                <div className="flex flex-col items-center text-center py-20 sm:py-24 md:py-28 lg:py-32 px-8 sm:px-12 md:px-16 bg-[#fcf7ff]">
                    <h2 className="text-purple-500 font-semibold text-2xl sm:text-3xl md:text-4xl tracking-[6px]">
                        LA TUA COMMUNITY, IL TUO MONDO
                    </h2>
                    <h1 className="text-black font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mt-4 tracking-[10px]">
                        ESPLORA, CONNETTITI E FAI <br /> CONOSCERE CIÒ CHE AMI
                    </h1>
                    <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 md:gap-20 mt-16 w-full max-w-6xl">
                        <div className="bg-white p-6 rounded-4xl shadow-lg flex flex-col items-center text-center w-full sm:w-[350px] md:w-[320px]">
                            <h3 className="text-yellow-500 font-semibold mt-2 text-xl">Per Gli Esploratori</h3>
                            <img src={image4} alt="" className="w-full mt-4 rounded-lg" />
                            <p className="text-gray-600 mt-4 text-base sm:text-lg md:text-base">
                                Scopri sempre qualcosa di nuovo, con informazioni affidabili e filtrate dalla community.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-4xl shadow-lg flex flex-col items-center text-center w-full sm:w-[350px] md:w-[320px]">
                            <h3 className="text-yellow-500 font-semibold mt-2 text-xl">Per Tutti</h3>
                            <img src={image5} alt="" className="w-full mt-4 rounded-lg" />
                            <p className="text-gray-600 mt-4 text-base sm:text-lg md:text-base">
                                Crea e vivi le esperienze migliori con il supporto di una community appassionata e autentica.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-4xl shadow-lg flex flex-col items-center text-center w-full sm:w-[350px] md:w-[320px]">
                            <h3 className="text-yellow-500 font-semibold mt-2 text-xl">Per I Creatori</h3>
                            <img src={image6} alt="" className="w-full mt-4 rounded-lg" />
                            <p className="text-gray-600 mt-4 text-base sm:text-lg md:text-base">
                                Raggiungi il pubblico giusto senza sprechi di tempo o risorse.
                            </p>
                        </div>
                    </div>
                </div>

                <hr className="border-black" />

                <div className="flex flex-col items-center text-center py-16 sm:py-24 px-6 sm:px-8 bg-[#663483]">
                    <h2 className="text-yellow-400 font-semibold text-xl sm:text-2xl">UNISCITI ALLA COMMUNITY</h2>
                    <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mt-4">
                        ISCRIVITI ORA E INIZIA A <br /> ESPLORARE IL MONDO ATTORNO A TE
                    </h1>
                    <p className="text-white mt-6 text-lg sm:text-xl md:text-2xl">
                        Non perdere l'opportunità di connetterti con persone ed eventi che fanno la differenza.
                    </p>
                    <button className="mt-8 bg-yellow-500 text-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-md text-lg sm:text-xl md:text-2xl font-bold uppercase hover:bg-yellow-600 transition cursor-pointer" onClick={() => navigate("/register-page")}>
                        Iscriviti Ora!
                    </button>
                </div>

                <Footer />
            </div>

        </>
    )
}

export default LandingPage  