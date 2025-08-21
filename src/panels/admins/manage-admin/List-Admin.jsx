import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import api from "../../../api/axios";
import { FaRegEye, FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import useBreadcrumb from "../../../components/Breadcrumb";
import { FiFilter } from "react-icons/fi";

const List_Admin = () => {
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]); 
  const [total, setTotal] = useState(0); 
  const [role,] = useState("");
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const limit = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  
  const breadcrumb = useBreadcrumb("All Admin");


  // Fetch data dari backend
  const fetchAdmins = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        search,
        page,
        limit,
      };
      if (role) {
        params.role = role;
      }
      
      const res = await api.get("/super-admins/admins", { params });
      console.log("Request params:", params);

      setAdmins(res.data?.data || []);
      setTotal(res.data?.pagination?.totalData || 0);
    } catch (err) {
      console.error("Error fetching Admins:", err);
    } finally {
      setLoading(false);
    }
  }, [search, page, role, limit]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (role) params.set("role", role);
    if (page !== 1) params.set("page", page);
    setSearchParams(params, { replace: true });

    fetchAdmins();
  }, [search, page, role, fetchAdmins, setSearchParams]);

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await api.delete(`/super-admins/admins/${selectedId}`);
      setShowModal(false);
      setSelectedId(null);
      await fetchAdmins(); 
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Gagal menghapus admin:", error);
      alert("Gagal menghapus admin.");
    }
  };

  const totalPages = Math.ceil(total / limit);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16 px-2 sm:px-8 md:px-8 py-4">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="md:ml-64 flex-1 flex flex-col">
        <AdminNavbar
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
        <main className="px-4 sm:px-2 md:px-2 py-6">
          <div className="text-sm text-gray-400 mb-4 text-left">{breadcrumb}</div>
          <h1 className="text-xl font-bold mb-6 text-left">Daftar Admin</h1>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-4 w-full">
            <input
              type="text"
              placeholder="Cari Blog"
              className="md:w-full lg:max-w-2xl border border-gray-300 rounded-md px-8 py-2 text-sm"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div
              className="w-10 h-9 ml-0 md:ml-2 bg-orange-500 rounded-md shadow-[0_4px_0_0_#b45309] flex items-center justify-center cursor-pointer"
              onClick={() => {
                setSearch(searchInput);
                setPage(1);
                }}
            >
              <FiFilter className="text-white" />
              </div>
              <button
                onClick={() => navigate("/panels/admins/manage/add_admin")}
                className="flex items-center ml-0 md:ml-0 text-white bg-orange-500 hover:bg-orange-400 text-sm font-semibold rounded-md shadow-[0_4px_0_0_#b45309] md:px-10 px-6 py-2"
              >
                + Tambah admin
              </button>
            </div>

            <div className="bg-white border border-gray-400 rounded-lg p-4 shadow-lg">
              <h2 className="font-bold text-lg mb-4 text-left">
                Aktivitas Terkini
              </h2>

              <h3 className="text-sm font-semibold mb-4 text-left">Daftar Admin</h3>
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-center text-gray-600">
                    <th className="py-4 text-left">Nama</th>
                    <th className="px-2">Email</th>
                    <th className="px-2">Role</th>
                    <th className="px-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.length > 0 ? (
                    admins.map((admin) => (
                      <tr
                        key={admin.id}
                        className="border-t p-4 gap-4 font-medium"
                      >
                        <td className="py-2 px-2 text-left">{admin.name}</td>
                        <td className="py-2 px-2 text-center">{admin.email}</td>
                        <td>
                          <span className="bg-orange-500 text-white text-xs ml-12 place-items-center px-1 py-1 rounded-md text-center">
                            {admin.role}
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-3 justify-center pb-3 pt-3">
                            <button
                              onClick={() =>
                                navigate(`/panels/admins/manage/detail_admin/${admin.id}`)
                              }
                              className="bg-[#4731D8] text-white text-xs hover:bg-[#291f69] px-2 py-2 rounded-md"
                            >
                              <FaRegEye />
                            </button>
                            <button
                              onClick={() =>
                                navigate(`/panels/admins/manage/edit_admin/${admin.id}`)
                              }
                              className="bg-green-500 text-white text-xs hover:bg-green-800 px-2 py-2 rounded-md"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => confirmDelete(admin.id)}
                              className="bg-red-500 text-white text-xs hover:bg-red-800 px-2 py-2 rounded-md"
                            >
                              <RiDeleteBin5Line />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-500">
                        Tidak ada data admin.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center p-4 text-sm text-gray-500">
              <div>
                {limit * (page - 1) + 1}-{Math.min(limit * page, total)} dari {total}
              </div>
              <div className="join">
                {pageNumbers.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`join-item btn btn-sm rounded-lg w-8 h-8 p-0 text-xs ${
                      p === page ? "bg-orange-500 text-white" : ""
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Delete */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
                  <h2 className="text-lg font-semibold mb-4 text-center">Konfirmasi Hapus</h2>
                  <p className="text-center text-sm text-gray-700 mb-6">
                    Apakah kamu yakin ingin menghapus admin ini?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100 border-black shadow-[0_3px_0_0_gray]"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleDeleteConfirmed}
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
                    Admin telah berhasil dihapus.
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

export default List_Admin;
