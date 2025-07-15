import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import { BsSearch } from "react-icons/bs";

const dummyBlogs = [
  {
    id: 1,
    title: "Teknologi AI Kini Semakin Dekat dengan Kehidupan Sehari–hari",
    date: "30 Juni 2025 - 11:47",
    category: "TECH",
    description:
      "Sebuah inovasi di dunia pendidikan digital hadir melalui aplikasi belajar yang mengintegrasikan teknologi kecerdasan buatan (AI) untuk mempersonalisasi materi pembelajaran",
  },
  {
    id: 2,
    title: "Laptop dengan Layar OLED Lipat Mulai Ramai di Pasaran",
    date: "1 Mei 2025 - 14:56",
    category: "TECH",
    description:
      "Tren laptop layar lipat makin populer. Brand seperti ASUS, Lenovo, dan HP mulai memproduksi model baru yang menggabungkan fleksibilitas dan portabilitas tinggi.",
  },
  {
    id: 3,
    title: "Teknologi AI Kini Semakin Dekat dengan Kehidupan Sehari–hari",
    date: "1 Mei 2025 - 10:43",
    category: "TECH",
    description:
      "Sebuah inovasi di dunia pendidikan digital hadir melalui aplikasi belajar yang mengintegrasikan teknologi kecerdasan buatan (AI) untuk mempersonalisasi materi pembelajaran",
  },
];

const BlogsAdmin = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex mt-16 px-2 sm:px-6 md:px-6 py-4">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-48">
        <AdminNavbar />
        <main className="px-6 md:px-16 py-10 ">
          {/* Breadcrumb */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-400">/ Blogs / All</div>
          </div>
          <div className="w-full h-8 flex mb-4">
            <input
              type="text"
              placeholder="Search Here ..."
              className="w-full rounded-md border border-gray-200 px-1 py-1 focus:outline-none"
            />
            <div className="w-16 h-8 bg-gray-200 rounded-md flex items-center justify-center ms-2 me-2">
              <BsSearch className="text-gray-600" />
            </div>
            <button className="flex items-center bg-gray-100 border border-gray-300 hover:bg-gray-200 text-sm font-semibold rounded-md whitespace-nowrap px-2 py-2">
              + Tambah Blog
            </button>
          </div>
          <h1 className="text-xl font-bold mb-4 text-left">Blogs</h1>
          {/* Blog Cards */}
          <div className="space-y-6">
            {dummyBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white border border-gray-400 rounded-xl px-6 py-4 shadow-sm"
              >
                <p className="text-xs text-gray-700 mb-2 text-left">
                  {blog.date}
                </p>
                <span className="w-12 block text-left text-xs bg-gray-100 text-gray-800 font-semibold px-2 py-1 rounded-md mb-2 border-2 border-orange-500">
                  {blog.category}
                </span>
                <h2 className="text-md md:text-lg font-semibold mb-2 text-justify">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-700 mb-4 text-justify">
                  {blog.description}
                </p>
                <div className="flex gap-2 justify-start pb-3 pt-3">
                  <button
                    onClick={() => navigate("/panel_admin/admin/blog/detail_blog/${blog.id}")
                    }
                    className="bg-[#304e7c] text-white text-xs border hover:bg-[#3E9FF5] px-2 py-2 rounded-md"
                  >
                    Lihat
                  </button>
                  <button
                    onClick={() => navigate("./panel_admin/admin/blog/edit_blog/${blog.id}")
                    }
                    className="bg-[#E86A1C] text-white text-xs hover:bg-[#d45d13] px-2 py-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => navigate("./panel_admin/admin/blog/hapus_blog/${blog.id}")
                    }
                    className="bg-red-500 text-white text-xs border hover:bg-red-600 px-2 py-2 rounded-md whitespace-nowrap"
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
