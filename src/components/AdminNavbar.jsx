import React from "react";
import logoKonnco from "../assets/img/logo-konnco.png";
import { MdMenu } from "react-icons/md";


const AdminNavbar = ({ onToggleSidebar }) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = today.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    // mobile mode
    <div className="w-full flex justify-between items-center px-4 py-4 border-b text-sm md:pl-8 bg-white fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center space-x-4">
        <button
          className="text-2xl text-gray-700 md:hidden"
          onClick={onToggleSidebar}
        >
          <MdMenu />
        </button>

        {/* Logo + Text */}
        <div className="flex items-center">
          <img
            src={logoKonnco}
            alt="Konnco Studio Logo"
            className="h-12 mr-4 transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <div className="font-bold text-xl text-gray-900 tracking-wide leading-tight">
              Konnco Studio
            </div>
            <div className="text-xs text-orange-600 tracking-widest font-medium mt-1">
              Execute Better
            </div>
          </div>
        </div>
      </div>

      {/* Waktu & Tanggal */}
      <div className="text-gray-600 text-xs text-right">
        <div>{formattedTime}</div>
        <div>{formattedDate}</div>
      </div>
    </div>
  );
};

export default AdminNavbar;
