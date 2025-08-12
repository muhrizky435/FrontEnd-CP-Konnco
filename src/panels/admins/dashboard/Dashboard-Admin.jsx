import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import useBreadcrumb from "../../../components/Breadcrumb";

const DashboardAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [overviewData, setOverviewData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const fetchOverviewData = async () => {
    try {
      const adminData = JSON.parse(localStorage.getItem("adminToken"));
      const token = adminData?.token;

      const response = await fetch(
        "http://localhost:3000/api/v1/admins/dashboard/overview",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setOverviewData(result.data);
    } catch (err) {
      console.error("Gagal mengambil data overview:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const confirmDelete = (slug) => {
    setSelectedSlug(slug);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await api.delete(`/admins/blogs/${selectedSlug}`);
      setShowModal(false);
      setSelectedSlug(null);
      await fetchOverviewData();
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Gagal menghapus blog:", error);
      alert("Gagal menghapus blog.");
    }
  };

  const breadcrumb = useBreadcrumb("Overview");

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
          <div className="text-sm text-gray-400 mb-4 text-left">{breadcrumb}</div>
          <h1 className="text-xl font-bold mb-6 text-left">Overview</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white border border-orange-400 rounded-lg p-4 shadow-[0_3px_0_0_#b45309]">
              <p className="text-sm text-black">Total Blog</p>
              <p className="text-2xl font-bold text-orange-500">
                {overviewData?.countBlogData || 0}
                <span className="text-sm font-medium">/Minggu</span>
              </p>
            </div>
            <div className="bg-white border border-orange-400 rounded-lg p-4 shadow-[0_3px_0_0_#b45309]">
              <p className="text-sm">Total Apply Karir</p>
              <p className="text-2xl font-bold text-orange-500">
                {overviewData?.countApplicationData || 0}
                <span className="text-sm font-medium">/Bulan</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[5fr_2fr] gap-3">
            <div className="bg-white border border-gray-400 rounded-lg p-4 shadow-lg">
              <h2 className="font-bold text-lg mb-4 text-left">
                Aktivitas Terkini
              </h2>
              <h3 className="text-sm font-semibold mb-4 text-left">Blog</h3>
              <hr />
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-center text-gray-600">
                    <th className="py-4 text-left">Judul</th>
                    <th className="px-2">Penulis</th>
                    <th className="px-2">Kategori</th>
                    <th className="px-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {overviewData?.findBlogData?.map((blog) => (
                    <tr
                      key={blog.slug}
                      className="border-t p-4 gap-4 font-medium"
                    >
                      <td className="py-2 px-2 text-left">{blog.title}</td>
                      <td className="py-2 px-2 text-center">
                        {blog.author.name}
                      </td>
                      <td>
                        <span className="bg-orange-500 text-white text-xs md:ms-12 ms-2 px-1 py-1 rounded-md">
                          {blog.type}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-3 justify-center pb-3 pt-3">
                          <button
                            onClick={() =>
                              navigate(
                                `/panels/admins/blogs/detail_blogs/${blog.slug}`
                              )
                            }
                            className="bg-[#4731D8] text-white text-xs hover:bg-[#291f69] px-2 py-2 rounded-md"
                          >
                            <FaRegEye />
                          </button>
                          <button
                            onClick={() =>
                              navigate(
                                `/panels/admins/blogs/edit_blogs/${blog.slug}`
                              )
                            }
                            className="bg-green-500 text-white text-xs hover:bg-green-800 px-2 py-2 rounded-md"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => confirmDelete(blog.slug)}
                            className="bg-red-500 text-white text-xs hover:bg-red-800 px-2 py-2 rounded-md"
                          >
                            <RiDeleteBin5Line />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-left mt-4 mb-2">
                <button
                  onClick={() => navigate("/panels/admins/blogs")}
                  className="font-semibold flex gap-1 group w-fit text-[#E86A1C] hover:text-[#F77F4D] transition-colors"
                >
                  Lihat Selanjutnya
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-400 rounded-lg p-4 shadow-lg">
              <h3 className="text-sm font-semibold mb-3 text-left">Tim</h3>
              <ul className="text-sm space-y-1 text-justify">
                <li>Tim 1</li>
                <li>Tim 2</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-gray-400 rounded-lg p-4 mt-6 justify-left shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-left">
              Lamaran Masuk
            </h3>
            <table className="w-full text-sm table-fixed font-medium">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="w-2/4 py-2">Pelamar</th>
                  <th className="w-2/3 px-16">Posisi</th>
                  <th className="w-1/3 ">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {overviewData?.findApplicationData?.map((application) => (
                  <tr key={application.id} className="border-t text-left">
                    <td className="py-2">{application.applicantName}</td>
                    <td className="px-16 py-2">
                      {application.career?.title || "Posisi tidak tersedia"}
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          navigate(
                            `/panels/admins/careers/${application.careerId}/applications/${application.id}`
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
                ))}
              </tbody>
            </table>
            <div className="flex justify-left mt-4 mb-2">
              <button
                onClick={() => navigate("/panels/admins/careers/applications")}
                className="font-semibold flex gap-1 group w-fit text-orange-500 hover:text-[#F77F4D] transition-colors"
              >
                Lihat Selanjutnya
                <span className="ml-1 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </button>
            </div>
          </div>
          {/* Modal Delete */}
          {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
                  <h2 className="text-lg font-semibold mb-4 text-center">Konfirmasi Hapus</h2>
                  <p className="text-center text-sm text-gray-700 mb-6">
                    Apakah kamu yakin ingin menghapus blog ini?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100 border-black shadow-[0_3px_0_0_gray] "
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleDeleteConfirmed}
                      className="px-4 py-2 text-sm bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 border border-red-600 shadow-[0_3px_0_0_#800000] "
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
                    Blog telah berhasil dihapus.
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

export default DashboardAdmin;
