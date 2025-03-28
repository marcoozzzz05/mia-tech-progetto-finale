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

                <div className="relative flex items-center px-12 py-4 z-10">
                    <img src={logo} alt="Glokal Logo" className="w-sm mt-12 ml-8" />
                    <button className="ml-auto m-4 bg-purple-500 px-10 py-4 rounded-sm text-white hover:bg-purple-600 transition uppercase cursor-pointer text-2xl font-bold" onClick={() => navigate("/register-page")}>
                        Registrati
                    </button>
                </div>

                <div className="relative flex flex-col items-center text-center justify-center h-full px-8 z-10 pb-44">
                    <h2 className="text-yellow-400 text-2xl font-semibold">
                        DOVE LE PERSONE E GLI EVENTI SI INCONTRANO
                    </h2>
                    <h1 className="text-8xl font-extrabold my-4 uppercase leading-tight">
                        Dal globale al locale, <br /> con un click!
                    </h1>
                    <p className="max-w-2xl text-2xl text-gray-300">
                        Il nostro social network unisce la scoperta locale alla condivisione globale, creando una community in cui ogni evento trova il suo pubblico.
                    </p>
                    <button className="mt-12 bg-yellow-500 text-black px-10 py-4 rounded-sm text-2xl font-bold uppercase hover:bg-yellow-600 transition cursor-pointer" onClick={() => navigate("/register-page")}>
                        Iscriviti Ora!
                    </button>
                </div>

                <div className="flex items-center justify-center bg-gradient-to-r from-white to-purple-200 py-40 px-16">
                    <div className="w-1/2 pr-12">
                        <h2 className="text-purple-500 font-semibold text-2xl tracking-[6px]">PER CHI CERCA EVENTI E ATTIVITÀ</h2>
                        <h1 className="text-black font-extrabold text-7xl leading-tight mt-4 tracking-[10px]">
                            TROVA, SALVA E <br /> PARTECIPA AGLI  <br /> EVENTI CHE AMI
                        </h1>
                        <p className="text-gray-600 text-xl mt-12 tracking-[6px] w-full">
                            Cerca eventi nella tua zona o ovunque nel <br /> mondo, filtra i risultati in base ai tuoi <br /> interessi e ricevi notifiche sugli <br /> aggiornamenti.
                            Puoi salvare gli eventi <br /> preferiti, lasciare recensioni e seguire <br /> utenti o attività per non perdere nulla!
                        </p>
                    </div>

                    <div className="w-fit">
                        <img src={image2} alt="Glokal photo" className="rounded-lg shadow-lg w-full" />
                    </div>
                </div>

                <hr className="text-black" />

                <div className="flex items-center justify-center bg-gradient-to-l from-white to-purple-200 py-40 px-16">
                    <div className="w-5xl p-4 ml-28">
                        <img src={image3} alt="Glokal photo" className="rounded-lg shadow-lg w-full " />
                    </div>
                    <div className="w-1/2 pl-80">
                        <h2 className="text-purple-500 font-semibold text-2xl tracking-[6px]">PER CHI ORGANIZZA E PROMUOVE EVENTI</h2>
                        <h1 className="text-black font-extrabold text-7xl leading-tight mt-4 tracking-[10px]">
                            FATTI CONOSCERE E <br /> RAGGIUNGI IL <br /> PUBBLICO GIUSTO
                        </h1>
                        <p className="text-gray-600 text-xl mt-12 tracking-[6px] w-full">
                            Pubblica eventi con pochi click, aggiungi <br /> immagini e dettagli per attirare <br /> partecipanti e ricevi recensioni per <br /> aumentare la tua visibilità.
                            Comunica con <br /> chi è interessato e crea una community <br /> attorno ai tuoi eventi.
                        </p>
                    </div>
                </div>

                <hr className="text-black" />

                <div className="flex flex-col items-center text-center py-20 px-16 bg-[#fcf7ff]">
                    <h2 className="text-purple-500 font-semibold text-2xl tracking-[6px]">
                        LA TUA COMMUNITY, IL TUO MONDO
                    </h2>
                    <h1 className="text-black font-extrabold text-7xl leading-tight mt-4 tracking-[10px]">
                        ESPLORA, CONNETTITI E FAI <br /> CONOSCERE CIÒ CHE AMI
                    </h1>

                    <div className="flex justify-center gap-20 mt-16 w-full max-w-6xl">
                        <div className="bg-white p-6 rounded-4xl shadow-lg flex flex-col items-center text-center w-[350px]">
                            <h3 className="text-yellow-500 font-semibold mt-2 text-xl">Per Gli Esploratori</h3>
                            <img src={image4} alt="" className="w-full mt-4 rounded-lg" />
                            <p className="text-gray-600 mt-4 text-base">
                                Scopri sempre qualcosa di nuovo, con informazioni affidabili e filtrate dalla community.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-4xl shadow-lg flex flex-col items-center text-center w-[350px]">
                            <h3 className="text-yellow-500 font-semibold mt-2 text-xl">Per Tutti</h3>
                            <img src={image5} alt="" className="w-full mt-4 rounded-lg" />
                            <p className="text-gray-600 mt-4 text-base">
                                Crea e vivi le esperienze migliori con il supporto di una community appassionata e autentica.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-4xl shadow-lg flex flex-col items-center text-center w-[350px]">
                            <h3 className="text-yellow-500 font-semibold mt-2 text-xl">Per I Creatori</h3>
                            <img src={image6} alt="" className="w-full mt-4 rounded-lg" />
                            <p className="text-gray-600 mt-4 text-base">
                                Raggiungi il pubblico giusto senza sprechi di tempo o risorse.
                            </p>
                        </div>
                    </div>
                </div>

                <hr className="text-black" />

                <div className="flex flex-col items-center text-center py-20 px-16 bg-[#663483]">
                    <h2 className="text-yellow-500 font-semibold text-2xl tracking-[6px]">UNISCITI ALLA COMMUNITY</h2>
                    <h1 className="text-white font-extrabold text-7xl leading-tight mt-4 tracking-[8px]">
                        ISCRIVITI ORA E INIZIA A <br /> ESPLORARE IL MONDO <br /> ATTORNO A TE</h1>
                    <p className="text-white mt-8 text-2xl">
                        Non perdere l'opportunità di connetterti <br /> con persone ed eventi che fanno la <br /> differenza</p>
                    <button className="mt-12 bg-yellow-500 text-black px-10 py-4 rounded-sm text-2xl font-bold uppercase hover:bg-yellow-600 transition cursor-pointer" onClick={() => navigate("/register-page")}>
                        Iscriviti Ora!
                    </button>
                </div>
                <Footer />
            </div> 
        </>
    )
}

export default LandingPage  