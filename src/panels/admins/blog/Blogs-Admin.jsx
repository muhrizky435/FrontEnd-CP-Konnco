import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import { FiFilter } from "react-icons/fi";
import api from "../../../api/axios";
import useBreadcrumb from "../../../components/Breadcrumb";

const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [total, setTotal] = useState(0);

  const limit = 10;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const breadcrumb = useBreadcrumb("All Blogs");

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const params = { search, page, limit };
      const res = await api.get("/admins/blogs", { params });
      const data = res.data?.data || [];
      const formatted = data.map((item) => ({
        id: item.slug,
        title: item.title || "Judul tidak tersedia",
        author: item.author?.name || "Admin",
        date: item.createdAt
          ? new Date(item.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Tanggal tidak tersedia",
        type: item.type || "TECH",
        image_url: item.photo
          ? `http://localhost:3000${item.photo}`
          : "https://source.unsplash.com/800x400/?technology",
        content: item.content
          ? item.content.slice(0, 120) + "..."
          : "Tidak ada deskripsi.",
        slug: item.slug,
      }));
      setBlogs(formatted);

      if (res.data?.pagination?.totalData !== undefined) {
        setTotal(res.data.pagination.totalData);
      }
    } catch (err) {
      console.error("Gagal ambil blog:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page !== 1) params.set("page", page);
    setSearchParams(params, { replace: true });
    fetchBlogs();
  }, [search, page, setSearchParams, fetchBlogs]);

  const totalPages = Math.ceil(total / limit);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const confirmDelete = (slug) => {
    setSelectedSlug(slug);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await api.delete(`/admins/blogs/${selectedSlug}`);
      setShowModal(false);
      setSelectedSlug(null);
      fetchBlogs();
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Gagal menghapus blog:", error);
      alert("Gagal menghapus blog.");
    }
  };

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16 px-2 sm:px-6 md:px-6 py-2">
      <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col md:ml-48">
        <AdminNavbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="px-4 sm:px-6 md:px-16 py-10 w-full">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-400 mb-2 text-left">{breadcrumb}</div>
          </div>

          <h1 className="text-xl font-bold mb-2 text-left">Blogs</h1>

          {/* Card total */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-400">
              <p className="text-sm text-gray-500">Total Blog</p>
              <p className="text-2xl font-bold text-orange-500">{total}</p>
            </div>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-4 w-full">
            <input
              type="text"
              placeholder="Cari Blog"
              className="w-full max-w-sm border border-gray-300 rounded-md px-4 py-2 text-sm"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div
              className="w-10 h-9 bg-orange-500 rounded-md shadow-[0_4px_0_0_#b45309] flex items-center justify-center cursor-pointer"
              onClick={() => {
                setSearch(searchInput);
                setPage(1);
              }}
            >
              <FiFilter className="text-white" />
            </div>
            <button
              onClick={() => navigate("/panels/admins/blogs/add_blogs")}
              className="flex items-center text-white bg-orange-500 hover:bg-orange-400 text-sm font-semibold rounded-md shadow-[0_4px_0_0_#b45309] px-4 py-2"
            >
              + Tambah Blog
            </button>
          </div>

          {/* Blog List */}
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div
                key={blog.slug}
                className="bg-white border border-gray-400 rounded-xl px-6 py-4 shadow-[0_4px_0_0_gray]"
              >
                <p className="text-xs text-gray-700 mb-2 text-left">{blog.date}</p>
                <span className="inline-block text-left text-xs bg-orange-500 text-white font-semibold px-2 py-1 rounded-md mb-2 w-fit">
                  {blog.type}
                </span>
                <h2 className="text-md md:text-lg font-semibold mb-2 text-justify">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-700 mb-4 text-justify">{blog.content}</p>
                <div className="flex gap-2 justify-start pt-2 flex-wrap">
                  <button
                    onClick={() => navigate(`/panels/admins/blogs/detail_blogs/${blog.slug}`)}
                    className="bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 shadow-[0_3px_0_0_#b45309] px-4 py-2 rounded-md"
                  >
                    Lihat
                  </button>
                  <button
                    onClick={() => navigate(`/panels/admins/blogs/edit_blogs/${blog.slug}`)}
                    className="bg-white text-black text-sm font-semibold hover:bg-gray-200 border border-gray-500 shadow-[0_3px_0_0_gray] px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(blog.slug)}
                    className="text-red-600 border border-red-600 font-semibold text-sm px-4 py-2 hover:bg-red-600 hover:text-white transition shadow-[0_3px_0_0_#800000] rounded-md"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
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

          {/* Modal Success */}
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

export default BlogsAdmin;
