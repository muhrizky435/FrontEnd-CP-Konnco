import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import { useParams } from "react-router-dom";
import useBreadcrumb from "../../../components/Breadcrumb";
import api from "../../../api/axios";

const Detail_Product = () => {
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { productId } = useParams();

  const breadcrumb = useBreadcrumb(productData?.title || "Memuat...");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/admins/products/${productId}`);
        const data = response.data.data;

        const baseUrl = "http://localhost:3000/products/";
        data.mainPhotoUrl = data.mainPhoto ? baseUrl + data.mainPhoto : null;
        data.secondPhotoUrl = data.secondPhoto ? baseUrl + data.secondPhoto : null;
        data.thirdPhotoUrl = data.thirdPhoto ? baseUrl + data.thirdPhoto : null;

        setProductData(data);
      } catch (error) {
        console.error("Gagal memuat produk:", error);
        alert("Gagal memuat produk.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading || !productData) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16 px-2 sm:px-6 md:px-6 py-4">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col md:ml-48">
        <AdminNavbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        <main className="px-4 sm:px-6 md:px-16 py-8">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-400 mb-4 text-left">
            {breadcrumb}
          </div>

          <h1 className="text-xl font-bold mb-4 text-left">Detail Product</h1>

          <button
            className="group text-orange-500 font-bold text-md flex items-center gap-1 mb-6"
            onClick={() => window.history.back()}
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              &larr;
            </span>
            Kembali
          </button>

          {/* Main Photo, second Photo, Third Photo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          {/* Main Photo */}
            <div className="md:col-span-2">
              {productData.mainPhotoUrl ? (
                <img
                  src={productData.mainPhotoUrl}
                  alt={productData.title}
                  className="w-full h-[500px] object-cover rounded"
                />
              ) : (
                <div className="bg-gray-200 w-full h-[500px] rounded"></div>
              )}
            </div>

            {/* Second + Third Photo */}
            <div className="flex flex-col gap-4">
              {productData.secondPhotoUrl ? (
                <img
                  src={productData.secondPhotoUrl}
                  alt="Second Photo"
                  className="w-full h-[245px] object-cover rounded"
                />
              ) : (
                <div className="bg-gray-200 w-full h-[245px] rounded"></div>
              )}

              {productData.thirdPhotoUrl ? (
                <img
                  src={productData.thirdPhotoUrl}
                  alt="Third Photo"
                  className="w-full h-[245px] object-cover rounded"
                />
              ) : (
                <div className="bg-gray-200 w-full h-[245px] rounded"></div>
              )}
            </div>
          </div>


          {/* Title */}
          <div className="text-lg font-bold mb-4 leading-snug text-left">
            {productData.title}
          </div>

          {/* Description */}
          <div
            className="text-gray-700 leading-relaxed space-y-5 text-justify"
            dangerouslySetInnerHTML={{ __html: productData.description }}
          />

          {/* Main Feature */}
          {productData.mainFeature && (
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2">Fitur Utama</h2>
              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: productData.mainFeature }}
              />
            </div>
          )}

          {/* Advantage */}
          {productData.advantage && (
            <div className="mt-2">
              <h2 className="text-lg font-bold mb-2">Keunggulan</h2>
              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: productData.advantage }}
              />
            </div>
          )}


          {/* Share Buttons */}
          <div className="text-black pt-12 font-bold text-lg text-left">
            Bagikan ke
          </div>
          <div className="flex flex-wrap gap-3 mt-4 mb-4">
            {[
              { name: "WhatsApp", link: "https://www.whatsapp.com/" },
              { name: "Instagram", link: "https://www.instagram.com/" },
              { name: "Tiktok", link: "https://www.tiktok.com/" },
              { name: "X", link: "https://twitter.com/" },
              { name: "Facebook", link: "https://www.facebook.com/" },
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-orange-500 hover:bg-orange-600 text-sm font-semibold py-2 px-4 rounded-md shadow-[0_4px_0_0_#b45309] transition"
              >
                {platform.name}
              </a>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Detail_Product;
