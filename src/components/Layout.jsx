import React from 'react';
import TopNavbar from './Navbar/TopNavbar';
import Footer from '../Footer'; 
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar />
      <main className="flex-grow pt-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;