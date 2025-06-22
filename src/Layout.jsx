import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function Layout() {
  return (
    <div className="app-layout">
      <Toaster position="top-center" reverseOrder={false} />
      <Sidebar />

      <div className="main-app-content">
        <div className="content-wrapper">
          {/* The <Outlet/> tells the router where to render the current page */}
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;