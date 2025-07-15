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

const Detail_Blog = () => {
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
            <div className="text-sm text-gray-400">/ Blogs / Blog:id</div>
          </div>
          <h1 className="text-xl font-bold mb-2 text-left">Detail Blogs</h1>
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
          {articleData.image_url ? (
            <img
              src={articleData.image_url}
              alt={articleData.title}
              className="w-full h-[300px] object-cover mb-6 rounded"
            />
          ) : (
            <div className="bg-gray-200 w-full h-[300px] mb-6 rounded"></div>
          )}
          <div className="w-full flex items-center text-sm text-gray-700 space-x-4 mb-2 text-justify">
            <span className="bg-[#E86A1C] text-white px-2 py-1 rounded">
              {articleData.author}
            </span>
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path
                fill="#E86A1C"
                d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 16H5V10h14v10Zm0-12H5V6h14v2Z"
              />
            </svg>
            <span className="text-gray-500">
              {new Date(articleData.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="block w-16 px-3 py-1 bg-[#17253A] text-white text-xs font-semibold rounded mb-4">
            {articleData.category}
          </div>
          <div className="text-lg font-bold mb-4 leading-snug text-left">
            {articleData.title}
          </div>
          <div
            className="text-gray-700 leading-relaxed space-y-5 text-justify"
            dangerouslySetInnerHTML={{ __html: articleData.content }}
          />
        </main>
      </div>
    </div>
  );
};

export default Detail_Blog;
