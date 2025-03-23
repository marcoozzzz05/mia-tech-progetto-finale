import logo from "./assets/img/logo/Glokal_white_logo.png";
import { MessageCircle, FileText, Mail, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 w-full">
      <div className="container mx-auto px-6">
        <div className="md:hidden flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="/newsletter" className="hover:text-[#ffc300]">
              <Mail size={24} />
            </a>
            <a href="/support" className="hover:text-[#ffc300]">
              <MessageCircle size={24} />
            </a>
            <a href="/terms" className="hover:text-[#ffc300]">
              <FileText size={24} />
            </a>
            <a href="https://www.instagram.com/miacademyitalia/" className="hover:text-[#ffc300]">
              <Instagram size={24} />
            </a>
            <a href="https://www.facebook.com/miacademyformazione/" className="hover:text-[#ffc300]">
              <Facebook size={24} />
            </a>
            <a href="https://it.linkedin.com/company/miaacademy" className="hover:text-[#ffc300]">
              <Linkedin size={24} />
            </a>
          </div>
          <p className="text-sm">© 2025 Glokal. Tutti i diritti riservati.</p>
        </div>

        <div className="hidden md:flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="flex justify-center md:justify-start mb-6 md:mb-0">
            <a href="/">
              <img src={logo} alt="Glokal Logo" className="h-10 w-auto" />
            </a>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-40 space-y-8 md:space-y-0 text-center md:text-left">
            <div>
              <p className="font-semibold">Contatti e supporto</p>
              <div className="flex space-x-4 md:space-x-0 md:flex-col">
                <a href="/support" className="hover:text-[#ffc300]">
                  <span>Email: supporto@glokal.com</span>
                </a>
                <a href="/help" className="hover:text-[#ffc300]">
                  <span>Assistenza: Chat live</span>
                </a>
              </div>
            </div>

            <div>
              <p className="font-semibold">Informazioni Legali</p>
              <div className="flex space-x-4 md:space-x-0 md:flex-col">
                <a href="/terms" className="hover:text-[#ffc300]">
                  <span>Termini di servizio</span>
                </a>
                <a href="/privacy" className="hover:text-[#ffc300]">
                  <span>Privacy Policy</span>
                </a>
                <a href="/disclaimer" className="hover:text-[#ffc300]">
                  <span>Disclaimer</span>
                </a>
              </div>
            </div>

            <div>
              <p className="font-semibold">Seguici sui Social</p>
              <div className="flex space-x-4 md:space-x-0 md:flex-col">
                <a href="https://www.instagram.com/miacademyitalia/" className="hover:text-[#ffc300]">
                  <span>Instagram</span>
                </a>
                <a href="https://www.facebook.com/miacademyformazione/" className="hover:text-[#ffc300]">
                  <span>Facebook</span>
                </a>
                <a href="https://it.linkedin.com/company/miaacademy" className="hover:text-[#ffc300]">
                  <span>Linkedin</span>
                </a>
              </div>
            </div>

            <div>
              <p className="font-semibold">Iscriviti alla Newsletter</p>
              <div className="flex space-x-4 md:space-x-0 md:flex-col">
                <a href="/newsletter" className="hover:text-[#ffc300]">
                  <span>Iscriviti ora!</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-6 border-gray-700 hidden md:block" />
        <div className="mt-3 text-center hidden md:block">
          <p className="text-sm">© 2025 Glokal. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;