import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import useBreadcrumb from "../../../components/Breadcrumb";

const Edit_Blog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const fileInputRef = useRef(null);

  // Form state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  const breadcrumb = useBreadcrumb(blogData?.title);

  useEffect(() => {
    console.log("Slug dari URL (useParams):", slug);
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/v1/admins/blogs/${slug}`
        );
        const json = await res.json();
        const data = json.data;

        console.log("Blog fetched:", data);

        setBlogData(data);
        setTitle(data.title);
        setAuthor(data.author?.name || "");
        setDate(data.createdAt?.slice(0, 10));
        setContent(data.description || "");
        setThumbnail(`http://localhost:3000/uploads/${data.photo}`);
      } catch (err) {
        console.error("Gagal mengambil data blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setThumbnail(URL.createObjectURL(file));
  };

  const handleUploadClick = () => fileInputRef.current.click();

  const handleUpdate = async () => {
    try {
      if (content.trim().length < 100) {
        alert("Deskripsi harus minimal 100 karakter.");
        return;
      }

      const form = new FormData();
      form.append("title", title);
      form.append("description", content);
      if (fileInputRef.current.files[0]) {
        form.append("photo", fileInputRef.current.files[0]);
      }

      const res = await fetch(
        `http://localhost:3000/api/v1/admins/blogs/${slug}`,
        {
          method: "PUT",
          body: form,
        }
      );

      const json = await res.json();
      if (res.ok) {
        alert("Blog berhasil diubah.");
        navigate("/admin/blogs");
      } else {
        alert("Gagal mengubah blog: " + json.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan saat mengubah blog.");
    }
  };

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16 px-4 py-4">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col md:ml-48">
        <AdminNavbar
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
        <main className="px-4 sm:px-6 md:px-16 py-8 w-full">
          <div className="text-sm text-gray-400 mb-4 text-left">
            {breadcrumb}
          </div>
          <h1 className="text-xl font-bold mb-4 text-left">Edit Blog</h1>

          <button
            className="group text-orange-500 font-bold text-md flex items-center gap-1 mt-2"
            onClick={() => window.history.back()}
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              &larr;
            </span>
            Kembali
          </button>

          {/* Thumbnail */}
          <h3 className="text-md font-semibold mb-2 text-left">
            Thumbnail Gambar
          </h3>
          <div
            className="w-full h-[300px] border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-orange-500"
            onClick={handleUploadClick}
          >
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="Preview"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <button className="w-20 h-20 bg-white rounded-md text-xl font-bold text-gray-600 hover:bg-gray-200 transition">
                +
              </button>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Title */}
          <h3 className="text-md font-semibold mb-1 mt-4 text-left">
            Judul Blog
          </h3>
          <input
            className="w-full mb-6 p-3 rounded-md bg-white text-black border border-gray-600"
            value={title ?? ""}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Author & Date */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <h3 className="text-md font-semibold mb-1 text-left">Penulis</h3>
              <input
                className="w-full p-3 rounded-md bg-white text-black border border-gray-600"
                value={author ?? ""}
                disabled
              />
            </div>
            <div className="flex-1">
              <h3 className="text-md font-semibold mb-1 text-left">
                Tanggal Publikasi
              </h3>
              <input
                type="date"
                className="w-full p-3 rounded-md bg-white text-black border border-gray-600"
                value={date ?? ""}
                disabled
              />
            </div>
          </div>

          {/* Content */}
          <h3 className="text-md font-semibold mb-1 text-left">Isi Konten</h3>
          <textarea
            className="w-full h-80 p-4 rounded-md bg-white text-black border border-gray-600"
            value={content ?? ""}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleUpdate}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-md border border-black shadow-[0_4px_0_0_#b45309]"
            >
              Ubah
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Edit_Blog;
