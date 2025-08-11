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
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
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

  const handleDeleteClick = (id) => {
    // console.log("klik hapus, id:", id);
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async (id) => {
    // console.log("id yang akan dihapus: ", deleteId);
    try {
      await api.delete(`/admins/careers/${id}`);
      setCareers((prev) => prev.filter((career) => career.id !== id));
      setShowModal(false);
      setShowSuccessModal(true);
      setDeleteId(null);
    } catch (error) {
      console.error("Gagal menghapus career:", error);
      setShowModal(false);
      setDeleteId(null);
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
              onClick={() => navigate("/panels/admins/careers/add_careers")}
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
                className="flex bg-white rounded-2xl shadow overflow-hidden border border-gray-400"
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
                        className="bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-md shadow-[0_3px_0_0_#b45309]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Tombol Aksi */}
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => handleView(career.id)}
                      className="bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 shadow-[0_3px_0_0_#b45309] px-4 py-2 rounded-md"
                    >
                      Lihat
                    </button>
                    <button
                      onClick={() => handleEdit(career.id)}
                      className="bg-white text-gray-700 text-sm font-semibold hover:bg-gray-200 border border-gray-400 shadow-[0_3px_0_0_gray] px-4 py-2 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(career.id)}
                      className="text-red-600 border border-red-600 font-semibold text-sm px-4 py-2 hover:bg-red-600 hover:text-white transition shadow-[0_3px_0_0_#800000] rounded-md"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Delete */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
                  <h2 className="text-lg font-semibold mb-4 text-center">Konfirmasi Hapus</h2>
                  <p className="text-center text-sm text-gray-700 mb-6">
                    Apakah kamu yakin ingin menghapus career ini?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => { setShowModal(false); setDeleteId(null); }}
                      className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100 border-black shadow-[0_3px_0_0_gray]"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmed(deleteId)}
                      className="px-4 py-2 text-sm bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 border border-red-600 shadow-[0_3px_0_0_#800000]"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            )}
            {showSuccessModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-sm p-6 text-center">
                  <h2 className="text-lg font-semibold mb-4 text-orange-600">Berhasil Dihapus!</h2>
                  <p className="text-sm text-gray-700 mb-6">
                    Career telah berhasil dihapus.
                  </p>
                  <button
                    onClick={() => setShowSuccessModal(false)}
                    className="px-4 py-2 text-sm bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-700"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default Careers_Admin;
