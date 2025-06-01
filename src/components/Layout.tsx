import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LockIcon, HistoryIcon, Settings } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Layout = () => {
  const location = useLocation();
  const { isSessionActive } = useAppContext();

  // Hide navigation when in a focus session
  if (isSessionActive) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center">
          <Link to="/" className="flex items-center">
            <LockIcon className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">LockTFin</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <nav className="bg-white shadow-lg-up py-3 px-4">
        <div className="container mx-auto flex justify-between max-w-md">
          <Link 
            to="/"
            className={`flex flex-col items-center ${
              location.pathname === '/' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <LockIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link 
            to="/history"
            className={`flex flex-col items-center ${
              location.pathname === '/history' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <HistoryIcon className="h-6 w-6" />
            <span className="text-xs mt-1">History</span>
          </Link>
          
          <Link 
            to="/settings"
            className={`flex flex-col items-center ${
              location.pathname === '/settings' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Settings className="h-6 w-6" />
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Layout;