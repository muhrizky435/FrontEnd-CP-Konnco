import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../components/AdminNavbar";
import AdminSidebar from "../../../components/AdminSidebar";
import KonncoLoader from "../../../components/KonncoLoader";
import { useNavigate, useLocation } from "react-router-dom";

const dummyProducts = [
  {
    id: 1,
    title: "Aplikasi Administrasi Klinik/Praktek Medis",
    description:
      "Aplikasi yang memudahkan manajemen administrasi klinik dan praktek medis. Aplikasi ini dirancang khusus untuk membantu dokter, staf medis, dan administrasi dalam mengelola...",
  },
  {
    id: 2,
    title: "Platform Kreatif untuk Konten Kreator",
    description:
      "Solusi lengkap bagi konten kreator untuk meningkatkan engagement dan pendapatan. Fitur seperti gift, sistem subscription, dan penjualan merchandise memudahkan kreator...",
  },
  {
    id: 3,
    title: "Platform Administrasi & Informasi Sekolah",
    description:
      "Aplikasi ini sebagai platform terintegrasi untuk menciptakan lingkungan sekolah yang lebih terhubung, transparan, dan efisien, yang memungkinkan guru, murid, dan orang tua...",
  },
  {
    id: 4,
    title: "Platform untuk Mempermudah Pengguna Internet",
    description:
      "Aplikasi yang menyederhanakan pengalaman internet dengan memberikan akses cepat ke berbagai layanan online seperti browsing aman, manajemen akun, dan perlindungan privasi ...",
  },
];

const ProductAdmin = () => {
  const navigate = useNavigate();
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
          </div>

          <h1 className="text-xl font-bold mb-4 text-left">Produk</h1>

          {/* Button Tambah Produk */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() =>
                navigate("/admin/products/product/add_product_admin")
              }
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md shadow-[0_4px_0_0_#b45309]"
            >
              + Tambah Produk
            </button>
          </div>

          {/* Daftar Produk */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dummyProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white text-black rounded-xl p-4 shadow-[0_4px_0_0_gray] border border-black flex flex-col justify-between"
              >
                <div>
                  <h2 className="font-bold text-lg mb-2">{product.title}</h2>
                  <p className="text-sm text-gray-700">{product.description}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/panels/admins/product/detail/${product.id}`)
                    }
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-3 py-1 rounded-md shadow-[0_4px_0_0_#b45309]"
                  >
                    Lihat
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/panels/admins/product/edit/${product.id}`)
                    }
                    className="border border-black px-3 py-1 rounded-md hover:bg-gray-200 shadow-[0_4px_0_0_gray]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/panels/admins/product/hapus/${product.id}`)
                    }
                    className="border border-black px-3 py-1 rounded-md hover:bg-gray-200 shadow-[0_4px_0_0_gray]"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductAdmin;
