import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdExpandMore,
  MdExpandLess,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { SiBlogger } from "react-icons/si";
import { FaBoxArchive } from "react-icons/fa6";
import { BsBriefcase } from "react-icons/bs";

const AdminSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [openMenus, setOpenMenus] = useState({
    blogs: false,
    product: false, 
    career: false,
  });

  const navigate = useNavigate();

  const toggleMenu = (key) =>
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));

  const closeSidebar = () => setIsSidebarOpen(false);

  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin?.name) {
      setAdminName(admin.name);
    }
  }, []);

  const SidebarContent = () => (
    <div className="h-full bg-white border-r w-56 p-4 space-y-2 px-2">
      <div className="mb-8">
        <p className="text-gray-600 text-md">
          Halo, <span className="font-bold text-black">{adminName}</span>
        </p>

        <div className="text-gray-400 text-sm mb-2">Admin</div>
        <hr className="my-2" />
        <button
          className="group font-semibold text-red-500 text-sm flex items-center gap-1"
          onClick={() => {
            localStorage.removeItem("adminToken");
            navigate("/panels/admins/auth/login");
          }}
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            &larr;
          </span>
          Sign Out
        </button>
      </div>

      <div className="text-sm text-black uppercase font-bold text-left">
        Dashboard
      </div>
      <ul className="space-y-2 text-sm">
        {/* Overview */}
        <li>
          <NavLink
            to="/panels/admins/dashboard"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 font-semibold rounded-md border transition-all ${
                isActive
                  ? "bg-white border-gray-500"
                  : "text-black border-transparent hover:bg-orange-100"
              }`
            }
          >
            <MdOutlineDashboard className="text-orange-500" />
            Overview
          </NavLink>
        </li>

        {/* Blogs */}
        <li>
          <button
            onClick={() => toggleMenu("blogs")}
            className="w-full flex justify-between items-center px-3 py-2 font-semibold rounded-md hover:bg-orange-100"
          >
            <div className="flex items-center gap-2">
              <SiBlogger className="text-orange-500" />
              Blogs
            </div>
            {openMenus.blogs ? <MdExpandLess /> : <MdExpandMore />}
          </button>
          {openMenus.blogs && (
            <ul className="pl-8 mt-1">
              <li>
                <NavLink
                  to="/panels/admins/blogs"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `block text-left px-2 py-1 rounded-md font-medium ${
                      isActive
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-900 hover:bg-orange-100"
                    }`
                  }
                >
                  Data Blog
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Produk */}
        <li>
          <button
            onClick={() => toggleMenu("product")}
            className="w-full flex justify-between items-center px-3 py-2 font-semibold rounded-md hover:bg-orange-100"
          >
            <div className="flex items-center gap-2">
              <FaBoxArchive className="text-orange-500" />
              Produk
            </div>
            {openMenus.product ? <MdExpandLess /> : <MdExpandMore />}
          </button>
          {openMenus.product && (
            <ul className="pl-8 mt-1">
              <li>
                <NavLink
                  to="/panels/admins/product"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `block px-2 py-1 rounded-md text-left font-medium ${
                      isActive
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-700 hover:bg-orange-100"
                    }`
                  }
                >
                  Data Produk
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Karir */}
        <li>
          <button
            onClick={() => toggleMenu("career")}
            className="w-full flex justify-between items-center px-3 py-2 font-semibold rounded-md hover:bg-orange-100"
          >
            <div className="flex items-center gap-2">
              <BsBriefcase className="text-orange-500" />
              Karir
            </div>
            {openMenus.career ? <MdExpandLess /> : <MdExpandMore />}
          </button>
          {openMenus.career && (
            <ul className="pl-8 mt-1">
              <li>
                <NavLink
                  to="/panels/admins/careers"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `block px-2 py-1 rounded-md text-left font-medium ${
                      isActive
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-700 hover:bg-orange-100"
                    }`
                  }
                >
                  Data Karir
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/panels/admins/careers/applications"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `block px-2 py-1 rounded-md text-left font-medium ${
                      isActive
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-700 hover:bg-orange-100"
                    }`
                  }
                >
                  Lamaran Masuk
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Pesan Masuk / inquiries */}
        <li>
          <NavLink
            to="/panels/admins/inquiries"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 font-semibold rounded-md border transition-all ${
                isActive
                  ? "bg-white border-gray-500"
                  : "text-black border-transparent hover:bg-orange-100"
              }`
            }
          >
            <div className="text-orange-500" />
            Pesan Masuk
          </NavLink>
        </li>
      </ul>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={closeSidebar}
          />
          <div className="fixed top-0 left-0 z-50 h-full w-60 bg-white shadow-md mt-6">
            <div className="flex justify-end p-4">
              <button onClick={closeSidebar}>
                <MdClose className="text-2xl text-black" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed h-screen z-40">
        <SidebarContent />
      </div>
    </>
  );
};

export default AdminSidebar;
