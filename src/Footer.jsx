import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">

          <div className="text-lg font-semibold ">
            <a href="/" className="text-white hover:text-[#ffc300]">Glokal</a>
          </div>

          <div className="flex space-x-40">
            <div>
              <p className="font-semibold">Contatti e supporto</p>  
              <p>Email: <a href="/support" className="hover:text-[#ffc300]">supporto@glokal.com</a></p>
              <p>Assistenza: <a href="/help" className="hover:text-[#ffc300]">Chat live</a></p>
            </div>

            <div className="flex flex-col">
              <p className="font-semibold">Informazioni Legali</p>  
              <a href="/terms" className="hover:text-[#ffc300]">Termini di servizio</a>
              <a href="/privacy" className="hover:text-[#ffc300]">Privacy Policy</a>
              <a href="/disclaimer" className="hover:text-[#ffc300]">Disclaimer</a>
            </div>

            <div className="flex flex-col">
              <p className="font-semibold">Seguici sui Social</p>
              <a href="https://www.instagram.com/miacademyitalia/" className="hover:text-[#ffc300]">Instagram</a>
              <a href="https://www.facebook.com/miacademyformazione/" className="hover:text-[#ffc300]">Facebook</a>
              <a href="https://it.linkedin.com/company/miaacademy" className="hover:text-[#ffc300]">Linkedin</a>
            </div>
            
            <div>
              <p className="font-semibold">Iscriviti alla nostra Newsletter</p>
              <a href="/newsletter" className="hover:text-[#ffc300]">Iscriviti ora!</a>
            </div>

          </div>
        </div>

        <hr className="mt-6"/>

        <div className="mt-3 text-center">
          <p className="text-sm">© 2025 Glokal. Tutti i diritti riservati.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
