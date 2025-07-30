import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import { FaFilter } from "react-icons/fa";
import api from "../../../api/axios";

const BlogsAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = () => {
    setLoading(true);
    api
      .get("/blogs")
      .then((res) => {
        const data = res.data?.data || [];
        const formatted = data.map((item) => ({
          id: item.slug,
          title: item.title || "Judul tidak tersedia",
          author: item.author?.name || "Admin",
          date: item.createdAt
            ? new Date(item.createdAt).toISOString().split("T")[0]
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
      })
      .catch((err) => {
        console.error("Gagal ambil blog:", err.response?.data || err.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

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

  const handleDelete = async (slug) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus blog ini?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/admins/blogs/${slug}`);
      alert("Blog berhasil dihapus.");
      fetchBlogs(); // refresh data
    } catch (error) {
      console.error("Gagal menghapus blog:", error);
      alert("Gagal menghapus blog.");
    }
  };

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16 px-2 sm:px-6 md:px-6 py-2">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col md:ml-48">
        <AdminNavbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="px-4 sm:px-6 md:px-16 py-10 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm">{generateBreadcrumb()}</div>
          </div>

          <h1 className="text-xl font-bold mb-4 text-left">Blogs</h1>

          {/* Filter & Tambah */}
          <div className="w-full h-10 flex flex-wrap mb-6 gap-2">
            <input
              type="text"
              placeholder=""
              className="flex-grow rounded-md border border-black px-2 py-1 focus:outline-none min-w-[180px]"
            />
            <div className="w-10 h-10 bg-orange-500 rounded-md shadow-[0_4px_0_0_#b45309] flex items-center justify-center cursor-pointer">
              <FaFilter className="text-white" />
            </div>
            <button
              onClick={() => navigate("/panels/admins/blogs/add_blogs")}
              className="flex items-center text-white bg-orange-500 hover:bg-orange-400 text-sm font-semibold rounded-md shadow-[0_4px_0_0_#b45309] px-4 py-2"
            >
              + Tambah Blog
            </button>
          </div>

          {/* Blog Cards */}
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div
                key={blog.slug}
                className="bg-white border border-black rounded-xl px-6 py-4 shadow-[0_6px_0_0_gray]"
              >
                <p className="text-xs text-gray-700 mb-2 text-left">{blog.date}</p>
                <span className="inline-block text-left text-xs bg-orange-500 text-white font-semibold px-2 py-1 rounded-md mb-2 w-fit">
                  {blog.type}
                </span>
                <h2 className="text-md md:text-lg font-semibold mb-2 text-justify">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-700 mb-4 text-justify">
                  {blog.content}
                </p>
                <div className="flex gap-2 justify-start pt-2 flex-wrap">
                  <button
                    onClick={() =>
                      navigate(`/panels/admins/blogs/detail_blogs/${blog.slug}`)
                    }
                    className="bg-orange-500 text-white text-sm font-semibold border border-black hover:bg-orange-600 shadow-[0_3px_0_0_#b45309] px-4 py-2 rounded-md"
                  >
                    Lihat
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/panels/admins/blogs/edit_blogs/${blog.slug}`)
                    }
                    className="bg-white text-black text-sm font-semibold hover:bg-gray-200 border border-black shadow-[0_3px_0_0_gray] px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.slug)}
                    className="text-red-600 border border-red-600 font-semibold text-sm px-4 py-2 hover:bg-red-600 hover:text-white transition shadow-[0_3px_0_0_gray] rounded-md"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BlogsAdmin;
