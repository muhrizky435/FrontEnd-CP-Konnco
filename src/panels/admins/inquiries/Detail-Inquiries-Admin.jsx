import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import KonncoLoader from "../../../components/KonncoLoader";
import useBreadcrumb from "../../../components/Breadcrumb";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";

const DetailInquiries = () => {
  const navigate = useNavigate();
  const { inquiryId } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const breadcrumb = useBreadcrumb("Inquiries", "Detail Inquiries");

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const res = await fetch(`/admins/inquiries/${inquiryId}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Gagal mengambil data inquiry");
        const data = await res.json();
        setInquiry(data);
      } catch (err) {
        console.error(err);
        setInquiry(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiry();
  }, [inquiryId]);

  if (loading) return <KonncoLoader />;
  if (!inquiry)
    return (
      <div className="p-6 text-center text-red-500">
        Data inquiry tidak ditemukan.
      </div>
    );

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

          <h1 className="text-xl font-bold mb-4 text-left">
            Detail Inquiries
          </h1>

          <button
            className="group text-orange-500 font-bold text-md flex items-center gap-1 mb-6"
            onClick={() => navigate(-1)}
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              &larr;
            </span>
            Kembali
          </button>

          <h2 className="text-xl font-bold mb-2">Karir</h2>

          <div className="space-y-2 mb-6">
            <p>
              <span className="font-semibold">Dari:</span> {inquiry.name}
            </p>
            <p>
              {inquiry.email} | {inquiry.phone}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-1">Curriculum Vitae</h2>
            <a
              href={inquiry.cvFileUrl}
              download
              className="flex items-center gap-2 text-orange-600 hover:underline"
            >
              <FiDownload />
              <span>{inquiry.cvFileName}</span>
            </a>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-1">Pesan</h2>
            <div className="whitespace-pre-line text-justify leading-relaxed">
              {inquiry.letter}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-6">
            <div>
              <h3 className="font-semibold mb-1">Posisi yang dilamar</h3>
              <p>{inquiry.position}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Pendidikan Terakhir</h3>
              <p>Jenjang: {inquiry.education.degree}</p>
              <p>Nama Institusi: {inquiry.education.institution}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Pengalaman Kerja</h3>
              <p>Nama Perusahaan: {inquiry.experience.company}</p>
              <p>Lama Bekerja: {inquiry.experience.duration}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Skill</h3>
              <p>{inquiry.skills}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailInquiries;
