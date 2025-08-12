import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import useBreadcrumb from "../../../components/Breadcrumb";
import api from "../../../api/axios";

const Add_Blog_Admin = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [slugInput, setSlugInput] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("adminToken");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.id) setAuthorId(parsed.id);
        if (parsed.name) setAuthorName(parsed.name);
      } catch (err) {
        console.error("Gagal parse adminToken", err);
      }
    }
  }, []);

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
    setLoading(true);
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

      await api.post("/admins/blogs", form);
      setShowSuccessModal(true);
      
    } catch (err) {
      console.error("Gagal menambahkan blog:", err);

      if (typeof err.response?.data?.message === "string" && err.response.data.message.toLowerCase().includes("slug")) {
        setErrorMessage("Slug sudah digunakan, silakan ganti slug lain");
        setShowErrorModal(true);
      } else if (typeof err.response?.data?.message === "string") {
        setErrorMessage("Terjadi kesalahan, silakan coba lagi");
        setShowErrorModal(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const breadcrumb = useBreadcrumb("Tambah Blog");

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16 px-2 sm:px-6 md:px-6 py-4">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col md:ml-48">
        <AdminNavbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="px-4 sm:px-6 md:px-16 py-8">
          <div className="text-sm text-gray-400 mb-4 text-left">{breadcrumb}</div>
          <h1 className="text-2xl font-bold mb-4">Tambah Blog</h1>

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
                required
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
                required
              />
            </div>

            {/* Author */}
            <div>
              <label className="block mb-1 font-semibold">Penulis</label>
              <input
                type="text"
                value={authorName}
                className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
                disabled
              />
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
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 shadow-[0_4px_0_0_#b45309]"
              >
                Tambah Blog
              </button>
            </div>
          </form>

          {/* Modal Error */}
          {showErrorModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-sm p-6 text-center">
                <h2 className="text-lg font-semibold mb-4 text-red-600">Gagal Menambahkan</h2>
                <p className="text-sm text-gray-700 mb-6">{errorMessage}</p>
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="px-4 py-2 text-sm bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}

          {/* Modal Sukses */}
          {showSuccessModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-sm p-6 text-center">
                <h2 className="text-lg font-semibold mb-4 text-orange-600">Berhasil Ditambahkan</h2>
                <p className="text-sm text-gray-700 mb-6">Blog telah berhasil ditambahkan.</p>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate("/panels/admins/blogs");
                  }}
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

export default Add_Blog_Admin;
