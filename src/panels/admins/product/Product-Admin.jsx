import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../components/AdminNavbar";
import AdminSidebar from "../../../components/AdminSidebar";
import KonncoLoader from "../../../components/KonncoLoader";
import { useNavigate } from "react-router-dom";
import useBreadcrumb from "../../../components/Breadcrumb";
import api from "../../../api/axios";

const ProductAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const breadcrumb = useBreadcrumb("Produk");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/admins/products");
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Gagal memuat produk:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
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
            <div className="text-sm">{breadcrumb}</div>
          </div>

          <h1 className="text-xl font-bold mb-4 text-left">Produk</h1>

          {/* Button Tambah Produk */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() =>
                navigate("/panels/admins/product/add_product")
              }
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md shadow-[0_4px_0_0_#b45309]"
            >
              + Tambah Produk
            </button>
          </div>

          {/* Daftar Produk */}
          {products.length === 0 ? (
            <p className="text-gray-500">Belum ada produk.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white text-black rounded-xl p-4 shadow-[0_4px_0_0_gray] border border-gray-400 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="font-bold text-lg mb-2">{product.title}</h2>
                    <p className="text-sm text-gray-700">
                      {truncateText(product.description, 100)}
                    </p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/panels/admins/product/detail/${product.id}`)
                      }
                      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-3 py-1 rounded-md shadow-[0_3px_0_0_#b45309]"
                    >
                      Lihat
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/panels/admins/product/edit/${product.id}`)
                      }
                      className="border border-gray-400 px-3 py-1 rounded-md font-semibold text-gray-900 hover:bg-gray-200 shadow-[0_3px_0_0_gray]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/panels/admins/product/hapus/${product.id}`)
                      }
                      className="border border-red-500 px-3 py-1 rounded-md font-semibold text-red-600 hover:bg-red-600 shadow-[0_3px_0_0_#800000]"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductAdmin;
