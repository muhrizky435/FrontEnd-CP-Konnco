// add_career_admin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import useBreadcrumb from "../../../components/Breadcrumb";
import MiniEditor from "../../../components/text-editor/miniEditor";
import { POSITION_APPLY, TYPE_CAREERS } from "../../../components/forms/constants"; 

const tagsList = [
  "Active",
  "Fulltime",
  "Web Developer",
  "Mobile",
  "Fullstack",
  "FrontEnd",
  "BackEnd",
];

const Add_Career_Admin = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const breadcrumb = useBreadcrumb("Tambah Career");

  // Tags
  const [selectedTags, setSelectedTags] = useState([]);
  const toggleTags = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((s) => s !== tag) : [...prev, tag]
    );
  };

  // form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [type, setType] = useState("");
  const [requirements, setRequirements] = useState("");

  // form state tambahan
  const [linkedInInfo, setLinkedInInfo] = useState("");
  const [glintsInfo, setGlintsInfo] = useState("");
  const [jobStreetInfo, setJobStreetInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ubah requirements string -> array
      const requirementArray = requirements
        ? requirements.split("\n").map((r) => r.trim()).filter((r) => r)
        : [];

      const payload = {
        title,
        description,
        salary,
        requirements: requirementArray,
        type,
        tags: selectedTags,
        linkedInInfo,
        glintsInfo,
        jobStreetInfo,
      };

      await api.post("/admins/careers", payload);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Gagal menambahkan careers:", err);
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
          <h1 className="text-2xl font-bold mb-4">Tambah Karir</h1>

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
            {/* Input Fields */}
            <div>
              <label className="block mb-1 font-semibold">Judul Karir</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Masukkan judul career"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Deskripsi</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-3 rounded h-40 focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Masukkan deskripsi karir"
                required
              />
            </div>

            <div className="border-b pb-6 mb-6">
              <MiniEditor
                label="Persyaratan & Kualifikasi"
                value={requirements}
                onChange={setRequirements}
                placeholder="Pisahkan persyaratan dengan enter"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Range Gaji (awal-akhir)</label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="contoh: 5.000.000 - 10.000.000"
                required
              />
            </div>

            <div>
               <label className="block mb-1 font-semibold">Tipe Pekerjaan</label>
               <select
                    className="w-full border px-3 py-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                >
                <option value="">-- Pilih Tipe --</option>
                {TYPE_CAREERS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                    {opt.label}
                    </option>
                ))}
                </select>  
            </div>     

            {/* Tags */}
            <h3 className="text-lg font-semibold text-left mb-2 mt-6">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tagsList.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={`text-sm px-3 py-1 rounded transition-colors duration-200 ${
                    selectedTags.includes(tag)
                      ? "bg-[#E86A1C] text-black shadow-[0_4px_0_0_#b45309]"
                      : "bg-white text-black hover:bg-orange-400 hover:text-black border border-black shadow-[0_4px_0_0_gray]"
                  }`}
                  onClick={() => toggleTags(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* input LinkedIn */}
            <div>
                <label className="block mb-1 font-semibold">LinkedIn Info (Opsional)</label>
                <input
                type="text"
                value={linkedInInfo}
                onChange={(e) => setLinkedInInfo(e.target.value)}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Masukkan link/notes LinkedIn"
                />
            </div>

            {/* input Glints */}
            <div>
                <label className="block mb-1 font-semibold">Glints Info (Opsional)</label>
                <input
                type="text"
                value={glintsInfo}
                onChange={(e) => setGlintsInfo(e.target.value)}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Masukkan link/notes Glints"
                />
            </div>

            {/* input JobStreet */}
            <div>
                <label className="block mb-1 font-semibold">JobStreet Info (Opsional)</label>
                <input
                type="text"
                value={jobStreetInfo}
                onChange={(e) => setJobStreetInfo(e.target.value)}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Masukkan link/notes JobStreet"
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 shadow-[0_4px_0_0_#b45309] transition"
              >
                Tambah Karir
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
                  Berhasil Ditambahkan
                </h2>
                <p className="text-sm text-gray-700 mb-6">
                  Karir telah berhasil ditambahkan.
                </p>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate("/panels/admins/careers"); // fix redirect
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

export default Add_Career_Admin;
