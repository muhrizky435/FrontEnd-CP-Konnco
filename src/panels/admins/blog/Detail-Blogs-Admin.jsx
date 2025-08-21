import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import { useParams } from "react-router-dom";
import useBreadcrumb from "../../../components/Breadcrumb";
import api from "../../../api/axios";

const Detail_Blog = () => {
  const [loading, setLoading] = useState(true);
  const [articleData, setArticleData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
  const fetchBlog = async () => {
    try {
      const response = await api.get(`/admins/blogs/${slug}`);
      const data = response.data.data;

      if (data.photo) {
        data.image_url = `http://localhost:3000/blogs/${data.photo}`;
      } else {
        data.image_url = null;
      }

      setArticleData(data);
    } catch (error) {
      console.error("Gagal memuat blog:", error);
      alert("Gagal memuat blog.");
    } finally {
      setLoading(false);
    }
  };

  fetchBlog();
}, [slug]);


  const breadcrumb = useBreadcrumb(articleData?.title || "Memuat...");

  if (loading || !articleData) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16 px-2 sm:px-8 md:px-8 py-4">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col md:ml-64">
        <AdminNavbar
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
        <main className="px-4 sm:px-2 md:px-2 py-8">
          <div className="text-sm text-gray-400 mb-4 text-left">
            {breadcrumb}
          </div>

          <h1 className="text-xl font-bold mb-4 text-left">Detail Blog</h1>

          <button
            className="group text-orange-500 font-bold text-md flex items-center gap-1 mb-6"
            onClick={() => window.history.go(-1)}
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

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#E86A1C] mb-4">
            <span className="inline-flex items-center gap-1">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <path
                  fill="#E86A1C"
                  d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5Z"
                />
              </svg>
              {articleData.author?.name || "Tidak diketahui"}
            </span>

            <span className="inline-flex items-center gap-1">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <path
                  fill="#E86A1C"
                  d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 16H5V10h14v10Zm0-12H5V6h14v2Z"
                />
              </svg>
              {new Date(articleData.createdAt).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="block w-fit px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded mb-3">
            {articleData.type}
          </div>

          <div className="text-lg font-bold mb-4 leading-snug text-left">
            {articleData.title}
          </div>

          <div
            className="text-gray-700 leading-relaxed space-y-5 text-justify"
            dangerouslySetInnerHTML={{ __html: articleData.content }}
          />

          <div className="text-black pt-12 font-bold text-lg text-left">
            Bagikan ke
          </div>
          <div className="flex flex-wrap gap-3 mt-4 mb-4">
            {[
              { name: "WhatsApp", link: "https://www.whatsapp.com/" },
              { name: "Instagram", link: "https://www.instagram.com/" },
              { name: "Tiktok", link: "https://www.tiktok.com/" },
              { name: "X", link: "https://twitter.com/" },
              { name: "Facebook", link: "https://www.facebook.com/" },
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-orange-500 hover:bg-orange-600 text-sm font-semibold py-2 px-4 rounded-md shadow-[0_4px_0_0_#b45309] transition"
              >
                {platform.name}
              </a>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Detail_Blog;
