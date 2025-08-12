import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import useBreadcrumb from "../../../components/Breadcrumb";
import api from "../../../api/axios";

const Add_Product_Admin = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const breadcrumb = useBreadcrumb("Tambah Produk");

  // form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainFeature, setMainFeature] = useState("");
  const [advantage, setAdvantage] = useState("");

  // file preview
  const [mainPhotoPreview, setMainPhotoPreview] = useState("");
  const [secondPhotoPreview, setSecondPhotoPreview] = useState("");
  const [thirdPhotoPreview, setThirdPhotoPreview] = useState("");

  // refs
  const mainPhotoRef = useRef(null);
  const secondPhotoRef = useRef(null);
  const thirdPhotoRef = useRef(null);

  const handleFileChange = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("mainFeature", mainFeature);
      form.append("advantage", advantage);

      if (mainPhotoRef.current?.files[0]) {
        form.append("mainPhoto", mainPhotoRef.current.files[0]);
      }
      if (secondPhotoRef.current?.files[0]) {
        form.append("secondPhoto", secondPhotoRef.current.files[0]);
      }
      if (thirdPhotoRef.current?.files[0]) {
        form.append("thirdPhoto", thirdPhotoRef.current.files[0]);
      }

      await api.post("/admins/products", form);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Gagal menambahkan produk:", err);
      setErrorMessage(
        typeof err.response?.data?.message === "string"
          ? err.response.data.message
          : "Terjadi kesalahan, silakan coba lagi"
      );
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };
  
  const UploadBox = ({ label, preview, onClick }) => (
    <div className="flex flex-col items-start">
        <span className="block mb-2 font-semibold">{label}</span>
        <div
        onClick={onClick}
        className="w-40 h-40 sm:w-48 sm:h-48 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition"
        >
        {preview ? (
            <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
            />
        ) : (
            <span className="text-4xl text-gray-400">+</span>
        )}
        </div>
    </div>
  );

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col md:ml-48">
        <AdminNavbar
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
        <main className="px-4 sm:px-6 md:px-16 py-8">
          <div className="text-sm text-gray-400 mb-4">{breadcrumb}</div>
          <h1 className="text-2xl font-bold mb-6">Tambah Produk</h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-lg shadow"
          >
            {/* Upload Photos */}
            <div className="flex flex-wrap gap-6">
              <div>
                <UploadBox
                  label="Main Photo"
                  preview={mainPhotoPreview}
                  onClick={() => mainPhotoRef.current.click()}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={mainPhotoRef}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setMainPhotoPreview)}
                  required
                />
              </div>

              <div>
                <UploadBox
                  label="Second Photo (Opsional)"
                  preview={secondPhotoPreview}
                  onClick={() => secondPhotoRef.current.click()}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={secondPhotoRef}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setSecondPhotoPreview)}
                />
              </div>

              <div>
                <UploadBox
                  label="Third Photo (Opsional)"
                  preview={thirdPhotoPreview}
                  onClick={() => thirdPhotoRef.current.click()}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={thirdPhotoRef}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setThirdPhotoPreview)}
                />
              </div>
            </div>

            {/* Input Fields */}
            <div>
              <label className="block mb-1 font-semibold">Judul Produk</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Masukkan judul produk"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Deskripsi</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-3 rounded h-28 focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Masukkan deskripsi produk"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Main Feature</label>
              <textarea
                value={mainFeature}
                onChange={(e) => setMainFeature(e.target.value)}
                className="w-full border p-3 rounded h-24 focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Masukkan fitur utama"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Advantage</label>
              <textarea
                value={advantage}
                onChange={(e) => setAdvantage(e.target.value)}
                className="w-full border p-3 rounded h-24 focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Masukkan keunggulan produk"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 shadow-[0_4px_0_0_#b45309] transition"
              >
                Tambah Produk
              </button>
            </div>
          </form>

          {/* Modal Error */}
          {showErrorModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-sm p-6 text-center">
                <h2 className="text-lg font-semibold mb-4 text-red-600">
                  Gagal Menambahkan
                </h2>
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
                <h2 className="text-lg font-semibold mb-4 text-orange-600">
                  Berhasil Ditambahkan
                </h2>
                <p className="text-sm text-gray-700 mb-6">
                  Produk telah berhasil ditambahkan.
                </p>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate("/panels/admins/product");
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

export default Add_Product_Admin;
