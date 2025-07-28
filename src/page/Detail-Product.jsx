import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import axios from "axios";

import KonncoNavbar from "../components/KonncoNavbar";
import KonncoFooter from "../components/KonncoFooter";
import KonncoLoader from "../components/KonncoLoader";

import {
  logoKonnco,
  logoWhite,
  logoEmail,
  logoFB,
  logoIG,
  logoTiktok,
  logoLink,
} from "../assets/img";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const { ref: footerRef, inView: footerInView } = useInView({ threshold: 0 });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/products/${productId}`
        );
        // console.log("DATA PRODUK DARI API:", response.data);
        setProductData(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading || !productData) return <KonncoLoader />;

  const featureList = productData.mainFeature
    ? productData.mainFeature.split(",").map((item) => item.trim())
    : [];

  const advantageList = productData.advantage
    ? productData.advantage.split(",").map((item) => item.trim())
    : [];

  // const thirdPhotoList = productData.thirdPhoto
  // ? productData.thirdPhoto.split(",").map(item => item.trim()).filter(Boolean)
  // : [];


  return (
    <div className="min-h-screen w-full flex flex-col bg-white font-sans">
      <KonncoNavbar
        fadeUp={fadeUp}
        logoKonnco={logoKonnco}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        drawerRef={drawerRef}
      />

      <main className="flex-1 w-full pt-6 px-4 md:px-20 pb-16 text-justify">
        <button
          className="group text-orange-500 text-lg font-semibold mb-4 flex items-center gap-1"
          onClick={() => window.history.back()}
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            &larr;
          </span>
          Kembali
        </button>

        {/* Gambar utama */}
        {productData.mainPhoto ? (
          <motion.img
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            src={productData.mainPhoto}
            alt={productData.title}
            className="w-full h-64 md:h-[450px] object-cover rounded-xl mb-6"
          />
        ) : (
          <div className="bg-gray-200 w-full h-64 md:h-[450px] rounded-xl mb-6"></div>
        )}

        {/* Gambar kecil */}
        {productData.secondPhoto && Array.isArray(productData.thirdPhoto) && productData.thirdPhoto.length > 0 && (
          <motion.div
            className="grid grid-cols-2 gap-4 mb-10"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            {productData.thirdPhoto.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="h-40 object-cover rounded-xl w-full"
              />
            ))}
          </motion.div>
        )}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-2xl md:text-xl font-bold mb-4 text-left leading-snug"
        >
          {productData.title}
        </motion.div>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-gray-700 text-base leading-relaxed text-left mb-8"
        >
          {productData.description}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h2 className="text-lg font-semibold mb-2">Fitur Utama:</h2>
            <ul className="list-decimal list-inside text-gray-700 space-y-1">
            {featureList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h2 className="text-lg font-semibold mb-2">Keunggulan:</h2>
            <ul className="list-decimal list-inside text-gray-700 space-y-1">
            {advantageList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          </motion.div>
        </div>
      </main>

      <KonncoFooter
        fadeUp={fadeUp}
        footerRef={footerRef}
        footerInView={footerInView}
        logoWhite={logoWhite}
        logoEmail={logoEmail}
        logoFB={logoFB}
        logoIG={logoIG}
        logoLink={logoLink}
        logoTiktok={logoTiktok}
      />
    </div>
  );
};

void motion;

export default ProductDetailPage;
