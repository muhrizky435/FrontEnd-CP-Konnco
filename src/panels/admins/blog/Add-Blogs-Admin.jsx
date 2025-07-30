import React, { useState, useEffect } from "react";
import api from "../../../api/axios";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import { useNavigate } from "react-router-dom";
import useBreadcrumb from "../../../components/Breadcrumb";

const Add_Blog_Admin = () => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "",
    date: "",
    type: "TECH",
    content: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const breadcrumb = useBreadcrumb("memuat...");

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timeout);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("HANDLE SUBMIT DIPANGGIL ✅");

    const imageFile = document.getElementById("fileInput").files[0];
    if (!imageFile) {
      alert("Mohon unggah gambar terlebih dahulu.");
      return;
    }

    console.info(formData);
    console.info(imageFile);

    const form = new FormData();
    form.append("title", formData.title);
    form.append("slug", formData.slug);
    form.append("type", formData.type);
    form.append("date", formData.date);
    form.append("content", formData.content);
    form.append("photo", imageFile);
    form.append("authorId", "2bdc5646-0bad-484a-981a-50ce5a1b9b8a");

    console.info(form);

    try {
      const res = await api.post("/admins/blogs", form);
      console.log("Blog berhasil:", res.data);
      setSuccess(true);
      setTimeout(() => {
        navigate("/panels/admins/blogs");
      }, 1500);
    } catch (err) {
      if (err.response?.data) {
        console.error("Gagal submit blog:", err.response.data);
      } else {
        console.error("Error tidak diketahui:", err.message);
      }
    }
  };

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
        <main className="px-4 sm:px-6 md:px-16 py-8 w-full">
          <div className="text-sm text-gray-400 mb-4 text-left">
            {breadcrumb}
          </div>

          <h1 className="text-xl font-bold mb-4 text-left">Tambah Blog</h1>
          <button
            className="group text-orange-500 font-bold text-md flex items-center gap-1 mt-2"
            onClick={() => window.history.back()}
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              &larr;
            </span>
            Kembali
          </button>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            encType="multipart/form-data"
          >
            {/* Thumbnail Upload */}
            <div>
              <label className="block text-md font-semibold mb-2 text-left">
                Thumbnail Gambar
              </label>
              <div
                className="w-full h-[300px] border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-orange-500"
                onClick={() => document.getElementById("fileInput").click()}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="object-cover w-full h-full rounded"
                  />
                ) : (
                  <button className="w-20 h-20 bg-white rounded-md item-center text-xl font-bold text-gray-600 hover:bg-gray-200 transition">
                    +
                  </button>
                )}
              </div>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {/* Judul */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-left">
                Judul
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-left">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>

            {/* Tipe Blog */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-left">
                Tipe
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              >
                <option value="TECH">TECH</option>
                <option value="BUSINESS">BUSINESS</option>
                <option value="NEWS">NEWS</option>
                <option value="TUTORIAL">TUTORIAL</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>

            {/* Penulis & Tanggal */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1 text-left">
                  Penulis
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1 text-left">
                  Tanggal
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            {/* Konten */}
            <div>
              <label className="block text-sm font-bold mb-1 text-left">
                Konten
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={10}
                className="w-full h-80 px-4 py-2 border border-gray-300 rounded"
                placeholder="Tulis konten blog di sini..."
                required
              ></textarea>
            </div>

            {/* Tombol Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-orange-500 text-white font-semibold px-6 py-2 rounded hover:bg-orange-600 border border-black shadow-[0_4px_0_0_#b45309]"
              >
                Tambah
              </button>
            </div>
          </form>
        </main>
      </div>

      {success && (
        <div className="fixed top-8 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-bounce">
          ✅ Blog berhasil ditambahkan!
        </div>
      )}
    </div>
  );
};

export default Add_Blog_Admin;
