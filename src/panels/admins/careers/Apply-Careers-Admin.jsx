// Apply-Careers-Admin.jsx
// Halaman Admin untuk melihat daftar aplikasi/lamaran karir

import React, { useEffect, useState, useCallback } from "react";
import api from "../../../api/axios";
import { FiFilter } from "react-icons/fi";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import useBreadcrumb from "../../../components/Breadcrumb";

const ApplyCareers = () => {
  // ====== STATE ======
  const [applications, setApplications] = useState([]); // Data lamaran
  const { careerId, applicationId } = useParams(); // Ambil params dari URL
  const [dateRange, setDateRange] = useState({ from: "", to: "" }); // Rentang tanggal
  const [total, setTotal] = useState(0); // Total data lamaran
  const [loading, setLoading] = useState(false); // Loader state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [showModal, setShowModal] = useState(false); // Modal konfirmasi hapus
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Modal sukses hapus

  // Pagination
  const limit = 10;
  const totalPages = Math.ceil(total / limit);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Router hooks
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Breadcrumb
  const breadcrumb = useBreadcrumb("Careers", "Applications");

  // Date picker state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Search state
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  // ====== FUNGSI FETCH DATA ======
  // Ambil daftar aplikasi/lamaran karir dari API
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        search,
        from: dateRange.from,
        to: dateRange.to,
        page,
        limit,
      };
      const res = await api.get("/admins/careers/applications", { params });

      // Simpan data ke state
      setApplications(res.data?.data || []);
      setTotal(res.data?.pagination?.totalData || 0);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  }, [search, dateRange, page, limit]);

  // ====== USE EFFECT ======
  // Update query params (search & page) + fetch data
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page !== 1) params.set("page", page);

    setSearchParams(params, { replace: true });
    fetchApplications();
  }, [search, page, dateRange, fetchApplications, setSearchParams]);

  // Update state dateRange setiap kali user ubah range tanggal
  useEffect(() => {
    setDateRange({
      from: format(range[0].startDate, "yyyy-MM-dd"),
      to: format(range[0].endDate, "yyyy-MM-dd"),
    });
  }, [range]);

  // ====== HANDLE DELETE ======
  const handleDelete = async () => {
    try {
      await api.delete(`/admins/careers/${careerId}/applications/${applicationId}`);
      setShowModal(false);
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
      setShowModal(false);
      alert("Gagal menghapus data.");
    }
  };

  // Loader tampil kalau masih fetch data
  if (loading) return <KonncoLoader />;

  // ====== RENDER ======
  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16 px-2 sm:px-6 md:px-6 py-4">
      {/* Sidebar */}
      <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Konten utama */}
      <div className="md:ml-60 flex-1 flex flex-col">
        <AdminNavbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        <main className="px-4 sm:px-6 md:px-4 py-6">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-400 mb-4 text-left">{breadcrumb}</div>

          <h1 className="text-xl font-bold mb-6 text-left">Lamaran Masuk</h1>

          {/* Filter Section */}
          <div className="flex flex-wrap gap-2 mb-4 w-full">
            {/* Input Search */}
            <input
              type="text"
              placeholder="Cari nama pelamar..."
              className="w-full max-w-sm border border-gray-300 rounded-md px-4 py-2 text-sm"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setPage(1);
              }}
            />

            {/* Date Range Picker */}
            <div className="relative">
              <input
                type="text"
                readOnly
                onClick={() => setShowDatePicker(!showDatePicker)}
                value={`${format(range[0].startDate, "dd/MM/yyyy")} - ${format(
                  range[0].endDate,
                  "dd/MM/yyyy"
                )}`}
                className="w-full max-w-sm border border-gray-300 rounded-md px-4 py-2 text-sm cursor-pointer text-center text-gray-600"
              />
              {showDatePicker && (
                <div className="absolute z-50">
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                  />
                </div>
              )}
            </div>

            {/* Tombol Filter */}
            <div
              className="w-10 h-9 bg-orange-500 rounded-md shadow-[0_4px_0_0_#b45309] flex items-center justify-center cursor-pointer"
              onClick={() => {
                setSearch(searchInput);
                setPage(1);
              }}
            >
              <FiFilter className="text-white" />
            </div>
          </div>

          {/* Tabel Data Lamaran */}
          <div className="overflow-x-auto border rounded-lg">
            <table className="table w-full text-sm text-center">
              <thead className="bg-gray-100 text-gray-700">
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Pelamar</th>
                  <th className="py-3 px-4 text-left">Posisi</th>
                  <th className="py-3 px-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, idx) => {
                  const careerId = app.careerId || (app.career && app.career.id);
                  const applicationId = app.id;
                  return (
                    <tr key={applicationId || idx} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4 text-left">{app.applicantName}</td>
                      <td className="py-2 text-center">{app.position || "-"}</td>
                      <td className="py-2 flex flex-col gap-2 sm:flex-row sm:gap-4 justify-end">
                        {/* Tombol Hapus */}
                        <button
                          onClick={() => setShowModal(true)}
                          classname="text-sm text-red-500 font-semibold items-center"
                        >
                          Hapus
                        </button>

                        {/* Tombol Detail */}
                        <button
                          onClick={() =>
                            navigate(
                              `/panels/admins/careers/${careerId}/applications/${applicationId}`
                            )
                          }
                          className="flex group text-sm text-orange-500 font-semibold hover:text-[#F77F4D] items-center gap-1"
                        >
                          Lihat Detail
                          <span className="ml-1 group-hover:translate-x-1 transition-transform">
                            &rarr;
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {/* Kalau tidak ada data */}
                {applications.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center text-gray-400 py-4">
                      Ups! Anda tidak diperbolehkan melihat lamaran masuk. Minta Akses terlebih dahulu.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

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
                    className={`join-item btn btn-sm rounded-full w-8 h-8 p-0 text-xs ${
                      p === page ? "bg-orange-500 text-white" : ""
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Konfirmasi Hapus */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold mb-4 text-center">Konfirmasi Hapus</h2>
                <p className="text-center text-sm text-gray-700 mb-6">
                  Apakah kamu yakin ingin menghapus lamaran ini?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100 border-gray-400 shadow-[0_3px_0_0_gray]"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 text-sm bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 border border-red-600 shadow-[0_3px_0_0_#800000]"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Sukses Hapus */}
          {showSuccessModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-sm p-6 text-center">
                <h2 className="text-lg font-semibold mb-4 text-orange-600">Berhasil Dihapus!</h2>
                <p className="text-sm text-gray-700 mb-6">
                  Lamaran telah berhasil dihapus.
                </p>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate(-1);
                  }}
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

export default ApplyCareers;
