import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import useBreadcrumb from "../../../components/Breadcrumb";
import api from "../../../api/axios";

const Edit_Blog_Admin = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [slugInput, setSlugInput] = useState("");
  const [author, setAuthor] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/admins/blogs/${slug}`);
        const data = res.data?.data;

        if (!data) throw new Error("Data blog tidak ditemukan.");

        setTitle(data.title || "");
        setContent(data.content || "");
        setType(data.type || "");
        setSlugInput(data.slug || "");
        setAuthor(data.author?.name || "");
        setAuthorId(data.author?.id || "");
        setCreatedAt(data.createdAt?.slice(0, 10) || "");
        const fullImage = `http://localhost:3000/blogs/${data.photo}`;
        setThumbnailPreview(fullImage);
      } catch (err) {
        console.error("Gagal mengambil data blog:", err);
        alert("Gagal mengambil data blog. Pastikan kamu login sebagai admin.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setThumbnailPreview(previewURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("content", content);
      form.append("type", type);
      form.append("slug", slugInput);
      form.append("authorId", authorId);

      const file = fileInputRef.current?.files[0];
      if (file) {
        form.append("photo", file);
      }

      await api.put(`/admins/blogs/${slug}`, form);
      alert("Blog berhasil diperbarui.");
      navigate("/panels/admins/blogs");
    } catch (err) {
      console.error("Gagal mengedit blog:", err);
      console.error("Full error response:", err.response?.data);

      alert("Gagal memperbarui blog.");
    }
  };

  const breadcrumb = useBreadcrumb(title || "Memuat...");

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16 px-2 sm:px-6 md:px-6 py-4">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col md:ml-48">
        <AdminNavbar
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
        <main className="px-4 sm:px-6 md:px-16 py-8">
          <div className="text-sm text-gray-400 mb-4 text-left">
            {breadcrumb}
          </div>
          <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

          <button
            className="group text-orange-500 font-bold text-md flex items-center gap-1"
            onClick={() => window.history.back()}
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              &larr;
            </span>
            Kembali
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Thumbnail */}
            <div>
              <h3 className="text-md font-semibold mt-1 mb-1 text-left">
                Thumbnail Gambar
              </h3>
              <div
                className="w-full h-[300px] border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-orange-500"
                onClick={handleUploadClick}
              >
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <button
                    type="button"
                    className="w-20 h-20 bg-white rounded-md text-xl font-bold text-gray-600 hover:bg-gray-200 transition"
                  >
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
            </div>

            <div>
              <label className="block mb-1 font-semibold">Judul</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Tipe</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">--Pilih Type--</option>
                <option value="TECH">TECH</option>
                <option value="BUSINESS">BUSINESS</option>
                <option value="NEWS">NEWS</option>
                <option value="TUTORIAL">TUTORIAL</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Slug</label>
              <input
                type="text"
                value={slugInput}
                onChange={(e) => setSlugInput(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-1 font-semibold">Penulis</label>
                <input
                  type="text"
                  value={author}
                  disabled
                  className="w-full border p-2 rounded bg-gray-100 text-gray-500"
                />
              </div>

              <div className="w-1/2">
                <label className="block mb-1 font-semibold">
                  Tanggal Dibuat
                </label>
                <input
                  type="date"
                  value={createdAt}
                  disabled
                  className="w-full border p-2 rounded bg-gray-100 text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 rounded min-h-[250px] bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none shadow-inner"
                required
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 shadow-[0_4px_0_0_#b45309] border border-black"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Edit_Blog_Admin;
