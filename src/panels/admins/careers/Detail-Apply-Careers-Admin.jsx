import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../api/axios";
import KonncoLoader from "../../../components/KonncoLoader";
import useBreadcrumb from "../../../components/Breadcrumb";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";

const DetailApplyAdmin = () => {
  const navigate = useNavigate();
  const { careerId, applicationId } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const breadcrumb = useBreadcrumb("Applications", "Detail Application");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/admins/careers/${careerId}/applications/${applicationId}`
        );
        setApplication(res.data?.data || null);
      } catch (err) {
        console.error(err);
        setApplication(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [careerId, applicationId]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `/admins/careers/${careerId}/applications/${applicationId}`
      );
      setShowModal(false);
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
      setShowModal(false);
      alert("Gagal menghapus data.");
    }
  };

  if (loading || !application) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16 px-2 sm:px-6 md:px-6 py-4">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col md:ml-48">
        <AdminNavbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="px-4 sm:px-6 md:px-16 py-8">
          <div className="text-sm text-gray-400 mb-4 text-left">
            {breadcrumb}
          </div>
          <h1 className="text-xl font-bold mb-4 text-left text-black border-b-2 pb-2">
            Detail Lamaran Masuk
          </h1>
            <button
              className="group text-orange-500 font-bold text-md flex items-center gap-1 mb-2"
              onClick={() => navigate(-1)}
            >
              <span className="group-hover:-translate-x-1 transition-transform">
                &larr;
              </span>
              Kembali
            </button>
          <h2 className="text-xl font-bold mb-2 text-black">Karir</h2>
          
          {/* Main Content */}
          <div className="space-y-2 mb-6 bg-gray-50 rounded-lg border p-4">
            <p>
              <span className="font-semibold">Dari:</span> {application.applicantName}
            </p>
            <p className="text-gray-600">
              {application.email} | {application.phoneNumber}
            </p>
          </div>
          <div className="mb-6">
            <h2 className="font-semibold mb-1">Curriculum Vitae</h2>
            <a
              href={application.file ? `/uploads/${application.file}` : "#"}
              download={application.file}
              className={`flex items-center gap-2 text-orange-600 hover:underline ${!application.file ? "pointer-events-none opacity-50" : ""}`}
            >
              <FiDownload />
              <span>{application.file || "File tidak tersedia"}</span>
            </a>
          </div>
          <div className="mb-6">
            <h2 className="font-semibold mb-1">Pesan</h2>
            <div className="whitespace-pre-line text-justify leading-relaxed bg-gray-50 text-gray-800 rounded-lg p-4 border">
              {application.letter}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t-2 pt-6">
            <div>
              <h3 className="font-semibold mb-1 text-orange-500">Posisi yang dilamar</h3>
              <p className="text-gray-800">{application.position}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-orange-500">Pendidikan Terakhir</h3>
              <p className="text-gray-800">Jenjang : {application.educationType}</p>
              <p className="text-gray-800">Nama Institusi : {application.instituteName}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-orange-500">Pengalaman Kerja</h3>
              <p className="text-gray-800">Nama Perusahaan : {application.companyName || "-"}</p>
              <p className="text-gray-800">Lama Bekerja : {application.lengthOfService || "-"}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-orange-500">Skill</h3>
              <p className="text-gray-800">
                {Array.isArray(application.skills)
                  ? application.skills.join(", ")
                  : application.skills}
              </p>
            </div>
          </div>

          {/* Tombol Hapus */}
          <div className="mt-8 flex justify-end">
            <button
              className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-6 rounded transition-colors shadow-[0_3px_0_0_#800000] "
              onClick={() => setShowModal(true)}
            >
              Hapus Lamaran
            </button>
          </div>

          {/* Modal Konfirmasi Hapus */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg  w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold mb-4 text-center">Konfirmasi Hapus</h2>
                <p className="text-center text-sm text-gray-700 mb-6">
                  Apakah kamu yakin ingin menghapus lamaran ini?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100 border-gray-400 shadow-[0_3px_0_0_gray]"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 text-sm bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 border border-red-600 shadow-[0_3px_0_0_#800000]"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Sukses */}
          {showSuccessModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-sm p-6 text-center">
                <h2 className="text-lg font-semibold mb-4 text-orange-600">Berhasil Dihapus!</h2>
                <p className="text-sm text-gray-700 mb-6">
                  Lamaran telah berhasil dihapus.
                </p>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate(-1);
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

export default DetailApplyAdmin;
