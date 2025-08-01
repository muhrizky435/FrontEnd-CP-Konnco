import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import CareerTypeIcon from "../../../components/CareerType";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";

const Careers_Admin = () => {
  const [loading, setLoading] = useState(true);
  const [careers, setCareers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const generateBreadcrumb = () => {
  const pathParts = location.pathname.split("/").filter(Boolean);
    return pathParts.map((part, idx) => {
      const isLast = idx === pathParts.length - 1;
      const label = part.replaceAll("-", " ").replaceAll("_", " ");
      return (
        <span
          key={idx}
          className={isLast ? "text-orange-500" : "text-gray-400"}
        >
          {idx > 0 && " / "}
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </span>
      );
    });
  };

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await api.get("/admins/careers");
        setCareers(res.data.data || []);
      } catch (error) {
        console.error("Gagal fetch careers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/panels/admins/blogs/edit_careers/${id}`);
  };

  const handleView = (id) => {
    navigate(`/panels/admins/careers/detail_careers/${id}`);
  };


  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus career ini?")) {
      try {
        await api.delete(`/admins/careers/${id}`);
        setCareers((prev) => prev.filter((career) => career.id !== id));
      } catch (error) {
        console.error("Gagal menghapus:", error);
        alert("Terjadi kesalahan saat menghapus.");
      }
    }
  };

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16 px-2 sm:px-6 md:px-6 py-4">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="md:ml-60 flex-1 flex flex-col">
        <AdminNavbar
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
        <main className="px-4 sm:px-6 md:px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm">{generateBreadcrumb()}</div>
          </div>
          <h1 className="text-xl font-bold mb-6 text-left">Careers</h1>

          {/* Tombol Tambah */}
          <div className="w-full flex justify-end mb-6">
            <button
              onClick={() => navigate("/panels/admins/blogs/add_careers")}
              className="text-white bg-orange-500 hover:bg-orange-400 text-sm font-semibold rounded-md shadow-[0_4px_0_0_#b45309] px-4 py-2"
            >
              + Tambah Karir
            </button>
          </div>

          {/* Daftar Careers dalam Kartu */}
          <div className="flex flex-col gap-4">
            {careers.map((career) => (
              <div
                key={career.id}
                className="flex bg-white rounded-2xl shadow overflow-hidden border border-black"
              >
                {/* Image dari Public */}
                <CareerTypeIcon type={career.type} />

                {/* Konten */}
                <div className="p-4 flex-1">
                  <h2 className="text-lg font-semibold mb-1">
                    {career.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {career.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(
                      typeof career.tags === "string"
                        ? career.tags.split(",").map((tag) => tag.trim())
                        : Array.isArray(career.tags)
                        ? career.tags
                        : []
                    ).map((tag, i) => (
                      <span
                        key={i}
                        className="bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Tombol Aksi */}
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => handleView(career.id)}
                      className="px-4 py-1 border border-black text-black text-sm rounded-md font-medium hover:bg-black hover:text-white transition"
                    >
                      Lihat
                    </button>
                    <button
                      onClick={() => handleEdit(career.id)}
                      className="px-4 py-1 border border-black text-black text-sm rounded-md font-medium hover:bg-black hover:text-white transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(career.id)}
                      className="px-4 py-1 border border-black text-black text-sm rounded-md font-medium hover:bg-red-600 hover:text-white transition"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Careers_Admin;
