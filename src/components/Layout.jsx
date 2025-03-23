import React from 'react';
import TopNavbar from './Navbar/TopNavbar';
import Footer from '../Footer'; 

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;