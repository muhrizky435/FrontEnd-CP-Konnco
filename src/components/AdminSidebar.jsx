import React from "react";
import { NavLink } from "react-router-dom";
import { BsGrid, BsBox, BsBriefcase } from "react-icons/bs";
import { SiBlogger } from "react-icons/si";
import { MdOutlineDashboard } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";


const AdminSidebar = () => {
  const menu = [
    {
      label: "Overview",
      path: "/panel_admin/admin/dashboardAdmin",
      icon: <MdOutlineDashboard />,
    },
    {
      label: "Blogs",
      path: "/panel_admin/admin/blog/blogsAdmin",
      icon: <SiBlogger />,
    },
    { label: "Product", path: "/panel_admin/admin/productAdmin", icon: <FaBoxArchive/> },
    {
      label: "Careers",
      path: "/panel_admin/admin/careersAdmin",
      icon: <BsBriefcase />,
    },
  ];

  return (
    <aside className="w-52 fixed h-screen bg-white border-r p-6 z-40">
      <div className="mt-4 mb-8">
        {/* nanti ganti dengan username admin yang login */}
        <p className="text-gray-600 text-md text-left">
          Halo, <span className="font-bold text-black">Lorem</span>
        </p>
        <div className="text-left text-gray-400 mb-2">Admin</div>
        <hr />
        <button
          className="group font-semibold text-red-500 text-sm mb-8 flex items-center gap-1 mt-4 whitespace-nowrap"
          onClick={() => window.history.back()}
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            &larr;
          </span>
          <span>Sign Out</span>
        </button>
      </div>
      <div>
        <div className="text-sm text-black mb-2 uppercase font-bold text-justify">
          Dashboard
        </div>
        <ul className="space-y-2 text-justify">
          {menu.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md border transition-all ${
                    isActive
                      ? "bg-white text-orange-500 border-gray-500"
                      : "text-black border-transparent hover:bg-orange-100"
                  }`
                }
              >
                <div className="w-5 h-5 flex items-center justify-center text-lg">
                  {item.icon}
                </div>
                <span className="text-sm">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;
