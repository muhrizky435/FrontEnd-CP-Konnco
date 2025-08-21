import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import useBreadcrumb from "../../../components/Breadcrumb";
import MiniEditor from "../../../components/text-editor/miniEditor";
import { TYPE_CAREERS } from "../../../components/forms/constants";

// tags list 
const tagsList = [
  "Active",
  "Fulltime",
  "Web Developer",
  "Mobile",
  "Fullstack",
  "FrontEnd",
  "BackEnd",
];

const Edit_Career_Admin = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { careerId } = useParams();

  const breadcrumb = useBreadcrumb("Edit Careers");

  // form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [type, setType] = useState("");
  const [requirements, setRequirements] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // form state tambahan
  const [linkedInInfo, setLinkedInInfo] = useState("");
  const [glintsInfo, setGlintsInfo] = useState("");
  const [jobStreetInfo, setJobStreetInfo] = useState("");

  // untuk milih / select tags
  const toggleTags = (tags) => {
    setSelectedTags((prev) =>
      prev.includes(tags) ? prev.filter((s) => s !== tags) : [...prev, tags]
    );
  };


  //  get data karir berdasarkan id
  useEffect(() => {
    const fetchCareer = async () => {
    try {
        const response = await api.get(`/admins/careers/${careerId}`);
        const career = response.data.data;
        console.info (career);

        setTitle(career.title || "");
        setDescription(career.description || "");
        setSalary(career.salary || "");

        // normalize type
        const normalizedType = TYPE_CAREERS.find(
          opt => opt.value.toLowerCase() === (career.type || "").toLowerCase()
        );
        setType(normalizedType ? normalizedType.value : "");

        // requirements: simpan sebagai string
        setRequirements(
          Array.isArray(career.requirements)
            ? career.requirements.join[0]
            : ""
        );

        // tags
        setSelectedTags(
          Array.isArray(career.tags)
            ? career.tags.map(tag => tag.toLowerCase())
            : []
        );

        // optional field
        setLinkedInInfo(career.linkedInInfo || "");
        setGlintsInfo(career.glintsInfo || "");
        setJobStreetInfo(career.jobStreetInfo || "");
        

    } catch (err) {
        console.error("Gagal mengambil data career:", err);
    } finally {
        setLoading(false);
    }
  };
 
  fetchCareer();
}, [careerId]);


// handle submit form edit / kirim data edit 
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await api.put(`/admins/careers/${careerId}`, {
      title,
      description,
      salary,
      type,
      requirements: requirements
        .split("\n")
        .map(r => r.trim())
        .filter(r => r !== ""),
      tags: Array.isArray(selectedTags) ? selectedTags : [],
      linkedInInfo,
      glintsInfo,
      jobStreetInfo,
    });

    setShowSuccessModal(true);
  } catch (err) {
    console.error("Gagal mengedit karir:", err);
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
    <div className="min-h-screen flex flex-col md:flex-row mt-16 px-2 sm:px-8 md:px-8 py-2">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col md:ml-64">
        <AdminNavbar
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
        <main className="px-4 sm:px-2 md:px-2 py-10 w-full">
          <div className="text-sm text-gray-400 mb-4">{breadcrumb}</div>
          <h1 className="text-2xl font-bold mb-4">Edit Karir</h1>

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

            {/* Form Judul */}
            <div>
              <label className="block mb-1 font-semibold">Judul Karir</label>
              <input
                name="judul"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Masukkan judul karir"
                required
              />
            </div>

            {/* Form Deskripsi */}
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

            {/* form Requierements */}
            <div className="border-b pb-6 mb-6">
              <MiniEditor
                label="Persyaratan & Kualifikasi"
                name="requirements"
                value={requirements}
                onChange={(val) => setRequirements(val)}
                placeholder="Pisahkan persyaratan dengan enter"
                required
              />
            </div>

            {/* form Range Gaji */}
            <div>
              <label className="block mb-1 font-semibold">Range Gaji (awal-akhir)</label>
              <input
                type="text"
                name="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="contoh: 5.000.000 - 10.000.000"
                required
              />
            </div>

            {/* Form Tipe */}
            <div>
               <label className="block mb-1 font-semibold">Tipe Pekerjaan</label>
               <select
                    className="w-full border px-3 py-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                >
                <option value="" disabled>-- Pilih Tipe --</option>
                {TYPE_CAREERS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                    {opt.label}
                    </option>
                ))}
                </select>
            </div>

            {/* Tags */}
            <h3 className="text-lg font-semibold text-left mb-1 mt-6">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tagsList.map((tags) => (
                <button
                  type="button"
                  key={tags}
                  className={`text-sm px-3 py-1 rounded transition-colors duration-200 ${
                    selectedTags.includes(tags)
                      ? "bg-[#E86A1C] text-black shadow-[0_4px_0_0_#b45309]"
                      : "bg-white text-black hover:bg-orange-400 hover:text-black border border-gray-400 shadow-[0_4px_0_0_gray]"
                  }`}
                  onClick={() => toggleTags(tags)}
                >
                  {tags}
                </button>
              ))}
            </div>

            {/* input LinkedIn */}
            <div>
                <div className="flex items-center gap-2">
                  <label htmlFor="linkedInInfo" className="mb-1 font-semibold">LinkedIn Info</label>
                  <div className="text-gray-400 text-sm">(opsional)</div>
                </div>
                <input
                type="text"
                name="linkedInInfo"
                value={linkedInInfo}
                onChange={(e) => setLinkedInInfo(e.target.value)}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Masukkan link/notes LinkedIn"
                />
            </div>

            {/* input Glints */}
            <div>
                <div className="flex items-center gap-2">
                  <label htmlFor="glintsInfo" className="mb-1 font-semibold">Glints Info</label>
                  <div className="text-gray-400 text-sm">(opsional)</div>
                </div>
                <input
                name="glintsInfo"
                type="text"
                value={glintsInfo}
                onChange={(e) => setGlintsInfo(e.target.value)}
                className="w-full border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Masukkan link/notes Glints"
                />
            </div>

            {/* input JobStreet */}
            <div>
                <div className="flex items-center gap-2">
                  <label htmlFor="JobSreet" className="mb-1 font-semibold">JobStreet</label>
                  <div className="text-gray-400 text-sm">(opsional)</div>
                </div>
                <input
                name="jobStreetInfo"
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
                Edit Career
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
                  Karir telah berhasil diedit.
                </p>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate("/panels/admins/careers");
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

export default Edit_Career_Admin;
