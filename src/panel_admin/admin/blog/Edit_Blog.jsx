import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import { useParams } from "react-router-dom";


const dummyBlogs = [
  {
    id: "1",
    title: "Teknologi AI Kini Semakin Dekat dengan Kehidupan Sehari–hari",
    author: "Siti Rahmawati",
    date: "2025-06-30",
    category: "TECH",
    image_url: "",
    content: `<p>Sebuah inovasi digital yang mengubah cara belajar...</p>`,
  },
  {
    id: "2",
    title: "Laptop dengan Layar OLED Lipat Mulai Ramai di Pasaran",
    author: "Budi Santoso",
    date: "2025-05-01",
    category: "TECH",
    image_url: "",
    content: `<p>Laptop lipat kini menjadi tren baru di industri teknologi...</p>`,
  },
];

const Edit_Blog = () => {
  const [loading, setLoading] = useState(true);
  const [articleData, setArticleData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const blog = dummyBlogs.find((item) => item.id === id);
    setArticleData(blog);
  }, [id]);

  if (loading || !articleData) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex mt-12 px-2 sm:px-6 md:px-6 py-4">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-48">
        <AdminNavbar />
        <main className="px-6 md:px-16 py-10 ">
          {/* Breadcrumb */}
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-400">/ Blogs / Blog:id / Edit </div>
          </div>
          <h1 className="text-xl font-bold mb-2 text-left">Edit Blog</h1>
          {/* Blog Cards */}
          <button
            className="group text-gray-400 text-lg flex items-center gap-1"
            onClick={() => window.history.back()}
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              &larr;
            </span>
            Kembali
          </button>
          <h3 className="text-xl text-black font-bold mb-2">Thumbnail Gambar</h3>
          
        </main>
      </div>
    </div>
  );
};

export default Edit_Blog;
