import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import useBreadcrumb from "../../../components/Breadcrumb";
import MiniEditor from "../../../components/text-editor/miniEditor";

const Edit_Product_Admin = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { productId } = useParams();

  const breadcrumb = useBreadcrumb("Edit Produk");

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

  useEffect(() => {
    const fetchProduct = async () => {
    try {
        const response = await api.get(`/admins/products/${productId}`);
        const product = response.data.data;
        setTitle(product.title || "");
        setDescription(product.description || "");
        setMainFeature(product.mainFeature || "");
        setAdvantage(product.advantage || "");
        const Photo = `http://localhost:3000/products/${product.mainPhoto}`;
        setMainPhotoPreview(Photo);
        setSecondPhotoPreview(`http://localhost:3000/products/${product.secondPhoto}`);
        setThirdPhotoPreview(`http://localhost:3000/products/${product.thirdPhoto}`);
    } catch (err) {
        console.error("Gagal mengambil data produk:", err);
    } finally {
        setLoading(false);
    }
  };

  fetchProduct();
}, [productId]);

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

      await api.put(`/admins/products/${productId}`, form);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Gagal mengedit produk:", err);
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

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16 px-2 sm:px-6 md:px-6 py-2">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col md:ml-48">
        <AdminNavbar
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
        <main className="px-4 sm:px-6 md:px-16 py-10 w-full">
          <div className="text-sm text-gray-400 mb-4">{breadcrumb}</div>
          <h1 className="text-2xl font-bold mb-4">Edit Produk</h1>

          <button
            className="group text-orange-500 font-bold text-md flex items-center gap-1"
            onClick={() => window.history.go(-1)}
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              &larr;
            </span>
            Kembali
          </button>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-lg shadow"
          >
            {/* Upload Photos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto Produk
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Main Photo */}
                <div
                  className="md:col-span-2 aspect-[4/3] border border-dashed border-gray-700 bg-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden cursor-pointer hover:bg-gray-50 hover:border-orange-300 transition"
                  onClick={() => mainPhotoRef.current.click()}
                >
                  {mainPhotoPreview ? (
                    <img
                      src={mainPhotoPreview}
                      alt="Main"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-500 flex flex-col items-center">
                      <span className="text-4xl mb-1">+</span>
                      <span className="text-sm">Foto Utama</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={mainPhotoRef}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setMainPhotoPreview)}
                  />
                </div>

                {/* Second & Third Photo */}
                <div className="flex flex-col gap-4">
                  {/* Second Photo */}
                  <div
                    className="aspect-[4/3] border border-dashed border-gray-700 bg-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden cursor-pointer hover:bg-gray-50 hover:border-orange-300 transition"
                    onClick={() => secondPhotoRef.current.click()}
                  >
                    {secondPhotoPreview ? (
                      <img
                        src={secondPhotoPreview}
                        alt="Second"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-500 flex flex-col items-center">
                        <span className="text-3xl mb-1">+</span>
                        <span className="text-xs">Foto Kedua</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      ref={secondPhotoRef}
                      className="hidden"
                      onChange={(e) =>
                        handleFileChange(e, setSecondPhotoPreview)
                      }
                    />
                  </div>

                  {/* Third Photo */}
                  <div
                    className="aspect-[4/3] border border-dashed border-gray-700 bg-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden cursor-pointer hover:bg-gray-50 hover-border-orange-300 transition"
                    onClick={() => thirdPhotoRef.current.click()}
                  >
                    {thirdPhotoPreview ? (
                      <img
                        src={thirdPhotoPreview}
                        alt="Third"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-500 flex flex-col items-center">
                        <span className="text-3xl mb-1">+</span>
                        <span className="text-xs">Foto Ketiga</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      ref={thirdPhotoRef}
                      className="hidden"
                      onChange={(e) =>
                        handleFileChange(e, setThirdPhotoPreview)
                      }
                    />
                  </div>
                </div>
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
                className="w-full border p-3 rounded h-40 focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Masukkan deskripsi produk"
                required
              />
            </div>

            <div className="border-b pb-6 mb-6">
              <MiniEditor
                label="Fitur Utama"
                value={mainFeature}
                onChange={setMainFeature}
                placeholder="Masukkan fitur utama"
                required
              />
            </div>

            <div className="border-b pb-6 mb-6">
              <MiniEditor
                label="Keunggulan"
                value={advantage}
                onChange={setAdvantage}
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
                Edit Produk
              </button>
            </div>
          </form>

          {/* Modal Error */}
          {showErrorModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-sm p-6 text-center">
                <h2 className="text-lg font-semibold mb-4 text-red-600">
                  Gagal Mengedit
                </h2>
                <p className="text-sm text-gray-700 mb-6">{errorMessage}</p>
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="px-4 py-2 text-sm bg-red-700 text-white font-semibold rounded-md hover:bg-red-600"
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
                  Berhasil Mengedit
                </h2>
                <p className="text-sm text-gray-700 mb-6">
                  Produk telah berhasil diedit.
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

export default Edit_Product_Admin;
