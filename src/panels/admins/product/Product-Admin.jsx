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
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const breadcrumb = useBreadcrumb("Produk");

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const confirmDelete = (id) => {
    setSelectedProductId(Number(id));
    setShowModal(true);
  };
  
  const handleDeleteConfirmed = async () => {
    try {
      await api.delete(`/admins/products/${selectedProductId}`);
      setProducts((prev) => prev.filter(p => p.id !== selectedProductId));
      setShowModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
      alert("Gagal menghapus produk.");
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
                      className="bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 shadow-[0_3px_0_0_#b45309] px-4 py-2 rounded-md"
                    >
                      Lihat
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/panels/admins/product/edit/${product.id}`)
                      }
                      className="bg-white text-black text-sm font-semibold hover:bg-gray-200 border border-gray-500 shadow-[0_3px_0_0_gray] px-4 py-2 rounded-md"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => confirmDelete(product.id)}
                      className="text-red-600 border border-red-600 font-semibold text-sm px-4 py-2 hover:bg-red-600 hover:text-white transition shadow-[0_3px_0_0_#800000] rounded-md"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal Delete */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-lg font-semibold mb-4 text-center">Konfirmasi Hapus</h2>
                <p className="text-center text-sm text-gray-700 mb-6">
                  Apakah kamu yakin ingin menghapus blog ini?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100 border-black shadow-[0_3px_0_0_gray] "
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleDeleteConfirmed}
                    className="px-4 py-2 text-sm bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 border border-red-600 shadow-[0_3px_0_0_#800000] "
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Success */}
          {showSuccessModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-sm p-6 text-center">
                <h2 className="text-lg font-semibold mb-4 text-orange-600">Berhasil Dihapus!</h2>
                <p className="text-sm text-gray-700 mb-6">
                  Blog telah berhasil dihapus.
                </p>
                <button
                  onClick={() => setShowSuccessModal(false)}
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

export default ProductAdmin;
