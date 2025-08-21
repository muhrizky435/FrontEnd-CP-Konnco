import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdExpandMore,
  MdExpandLess,
  MdOutlineMessage,
  MdOutlineManageAccounts,
  MdClose,
} from "react-icons/md";
import { LuLogs } from "react-icons/lu";
import { SiBlogger } from "react-icons/si";
import { FaBoxArchive } from "react-icons/fa6";
import { BsBriefcase } from "react-icons/bs";
import api from "../api/axios";

const AdminSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [openMenus, setOpenMenus] = useState({
    blogs: false,
    product: false,
    career: false,
  });
  const [adminName, setAdminName] = useState("Admin");
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const toggleMenu = (key) =>
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));

  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/admins/dashboard/overview"); 
        const { user } = res.data;
        if (user?.name) setAdminName(user.name);
        if (user?.permissions) setPermissions(user.permissions);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
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
              Blog
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

        {/* Pesan Masuk */}
        <li>
          <button
            onClick={() => {
              navigate("/panels/admins/inquiries");
              closeSidebar();
            }}
            className="w-full flex justify-between items-center px-3 py-2 font-semibold rounded-md hover:bg-orange-100"
          >
            <div className="flex items-center gap-2">
              <MdOutlineMessage className="text-orange-500" />
              Pesan Masuk
            </div>
          </button>
        </li>

        {/* Manajemen Admin */}
        {(permissions?.canShowAdmin ||
          permissions?.canViewAdmin ||
          permissions?.canCreateAdmin ||
          permissions?.canUpdateAdmin ||
          permissions?.canDeleteAdmin) && (
          <>
            <div className="text-sm text-black uppercase font-bold text-left pt-4">
              Manajemen Admin
            </div>

            <li>
              <button
                onClick={() => {
                  navigate("/panels/admins/manage/list_admins");
                  closeSidebar();
                }}
                className="w-full flex justify-between items-center px-3 py-2 font-semibold rounded-md hover:bg-orange-100"
              >
                <div className="flex items-center gap-2">
                  <MdOutlineManageAccounts className="text-orange-500 w-4 h-4" />
                  Admin
                </div>
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  navigate("/panels/admins/logs");
                  closeSidebar();
                }}
                className="w-full flex justify-between items-center px-3 py-2 font-semibold rounded-md hover:bg-orange-100"
              >
                <div className="flex items-center gap-2">
                  <LuLogs className="text-orange-500 w-4 h-4" />
                  Log
                </div>
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );

  if (loading) return null;

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
