import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../components/AdminNavbar";
import AdminSidebar from "../../../components/AdminSidebar";
import KonncoLoader from "../../../components/KonncoLoader";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const DetailProductAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timeout);
  }, []);

  const generateBreadcrumb = () => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    return pathParts.map((part, idx) => {
      const isLast = idx === pathParts.length - 1;
      const label = part.replaceAll("-", " ").replaceAll("_", " ");
      return (
        <span
          key={idx}
          className={isLast ? "text-orange-500" : "text-gray-400"}
        >
          {idx > 0 && " / "}
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </span>
      );
    });
  };

  if (loading) return <KonncoLoader />;

  // Dummy data sementara
  const product = {
    id: 1,
    title: "Aplikasi Administrasi Klinik/Praktek Medis",
    bannerImg: "", // Gambar atas
    screenshotImg: "", // Gambar UI aplikasi
    description: `Aplikasi yang memudahkan manajemen administrasi klinik dan praktek medis. Aplikasi ini dirancang khusus untuk membantu dokter, staf medis, dan administrasi dalam mengelola berbagai aspek operasional dan administratif sebuah klinik atau praktek medis. 
                Aplikasi ini memungkinkan pengelolaan yang lebih efisien dari berbagai tugas dan proses yang terkait dengan penyediaan layanan kesehatan.`,

    features: [
      "Pendaftaran & Janji Temu: Pendaftaran online/offline, jadwal dokter, dan pengingat otomatis.",
      "Rekam Medis Elektronik (RME): Riwayat kesehatan digital, catatan pemeriksaan, dan integrasi lab/radiologi.",
      "Keuangan & Billing: Tagihan pasien, berbagai metode pembayaran, laporan keuangan.",
      "Manajemen Obat & Stok: Inventarisasi, peringatan stok, pemesanan otomatis.",
      "Administrasi & SDM: Data pegawai, jadwal kerja, evaluasi kinerja.",
      "Laporan & Analitik: Laporan kinerja, analisis pasien, dashboard interaktif.",
      "Keamanan & Kepatuhan: Enkripsi data dan kontrol akses.",
    ],
    benefits: [
      "Mudah Digunakan: Antarmuka ramah pengguna.",
      "Efisien: Mengurangi kerja manual, mempercepat proses.",
      "Skalabel: Cocok untuk klinik kecil hingga rumah sakit.",
      "Aksesibilitas: Bisa diakses dari berbagai perangkat.",
      "Integrasi: Mendukung asuransi, laboratorium, dan telemedicine.",
    ],
  };

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
          {/* Breadcrumb */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm">{generateBreadcrumb()}</div>
            <span className="text-orange-500">{id}</span>
          </div>

          {/* Tombol kembali */}
          <button
            className="group text-orange-500 font-semibold mb-6 flex items-center gap-1"
            onClick={() => navigate(-1)}
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              &larr;
            </span>
            Kembali
          </button>

          {/* Banner */}
          <img
            src={product.bannerImg}
            alt="Banner Produk"
            className="w-full rounded-lg object-cover mb-6"
          />

          {/* Screenshot UI */}
          <div className="flex justify-center mb-10">
            <img
              src={product.screenshotImg}
              alt="UI Produk"
              className="rounded-xl shadow-lg w-full max-w-4xl"
            />
          </div>

          {/* Deskripsi */}
          <div className="mb-6 whitespace-pre-line text-justify text-base leading-relaxed">
            {product.description}
          </div>

          {/* Fitur & Keunggulan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm sm:text-base text-justify">
            <div>
              <ol className="list-decimal pl-5 space-y-2">
                {product.features.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </div>
            <div>
              <ol className="list-decimal pl-5 space-y-2">
                {product.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailProductAdmin;
