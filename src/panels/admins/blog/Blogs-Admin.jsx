import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import { FaFilter } from "react-icons/fa";
import api from "../../../api/axios";
import useDebounce from "../../../components/hooks/useDebounce";
import useBreadcrumb from "../../../components/Breadcrumb";

const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPage, setTotalPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  const fetchBlogs = useCallback(() => {
  setLoading(true);
  api
    .get("/admins/blogs", {
      params: { page, search: debouncedSearch },
    })
    .then((res) => {
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
      if (res.data.totalCount) {
        setTotalPage(Math.ceil(res.data.totalCount / 10));
      }
    })
    .catch((err) => {
      console.error("Gagal ambil blog:", err.response?.data || err.message);
    })
    .finally(() => setLoading(false));
  }, [page, debouncedSearch]);

    useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

    useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page !== 1) params.set("page", page);
    setSearchParams(params, { replace: true });
  }, [search, page, setSearchParams]);

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

  const renderPagination = () => {
    const visiblePages = [];
    const DOTS = "...";

    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) visiblePages.push(i);
    } else {
      visiblePages.push(1);
      if (page > 4) visiblePages.push(DOTS);
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPage - 1, page + 1);
      for (let i = start; i <= end; i++) visiblePages.push(i);
      if (page < totalPage - 3) visiblePages.push(DOTS);
      visiblePages.push(totalPage);
    }

    return (
      <div className="flex justify-center items-end gap-2 mt-8 flex-wrap">
        <button
          onClick={() => page > 1 && setPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          &lt;
        </button>
        {visiblePages.map((item, index) =>
          item === DOTS ? (
            <span key={index} className="px-3 py-1">...</span>
          ) : (
            <button
              key={index}
              onClick={() => setPage(item)}
              className={`px-3 py-1 border rounded-md ${
                page === item ? "bg-orange-500 text-white" : ""
              }`}
            >
              {item}
            </button>
          )
        )}
        <button
          onClick={() => page < totalPage && setPage(page + 1)}
          disabled={page === totalPage}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    );
  };

  const breadcrumb = useBreadcrumb ("All Blogs");

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16 px-2 sm:px-6 md:px-6 py-2">
      <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col md:ml-48">
        <AdminNavbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="px-4 sm:px-6 md:px-16 py-10 w-full">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-400 mb-4 text-left">{breadcrumb}</div>
          </div>

          <h1 className="text-xl font-bold mb-4 text-left">Blogs</h1>

          {/* Search, Filter, Add */}
          <div className="w-full h-10 flex flex-wrap mb-6 gap-2">
            <input
              type="text"
              placeholder="Cari berdasarkan judul"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="flex-grow rounded-md border border-gray-500 px-2 py-1 focus:outline-none min-w-[180px]"
            />
            <div
              onClick={fetchBlogs}
              className="w-10 h-10 bg-orange-500 rounded-md shadow-[0_4px_0_0_#b45309] flex items-center justify-center cursor-pointer"
            >
              <FaFilter className="text-white" />
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
                className="bg-white border border-gray-500 rounded-xl px-6 py-4 shadow-[0_6px_0_0_gray]"
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
          {renderPagination()}
          
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

export default BlogsAdmin;
