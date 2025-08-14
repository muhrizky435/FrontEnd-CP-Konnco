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

  const mainPhotoSrc =
    productData.mainPhoto && productData.mainPhoto.trim() !== ""
      ? `http://localhost:3000/products/${productData.mainPhoto}`
      : "/img/default.jpeg";

  const secondPhotoSrc =
    productData.secondPhoto && productData.secondPhoto.trim() !== ""
      ? `http://localhost:3000/products/${productData.secondPhoto}`
      : "/img/default.jpeg";

  const thirdPhotos =
    Array.isArray(productData.thirdPhoto) && productData.thirdPhoto.length > 0
      ? productData.thirdPhoto.map(photo =>
          photo.trim() !== ""
            ? `http://localhost:3000/products/${photo}`
            : "/img/default.jpeg"
        )
      : ["/img/default.jpeg"];


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
        <motion.img
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          src={mainPhotoSrc}
          alt={productData.title}
          className="w-full h-50 md:h-[450px] object-cover rounded-xl mb-6"
        />

        {/* Gambar kecil */}
        <motion.div
          className="grid grid-cols-2 gap-4 mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <img
            src={secondPhotoSrc}
            alt="Second Photo"
            className="h-40 object-cover rounded-xl w-full"
          />
          {thirdPhotos.map((img, idx) => (
            <img
              key={idx}
              src={img || "/default.jpeg"}
              alt={`Thumbnail ${idx + 1}`}
              className="h-40 object-cover rounded-xl w-full"
            />
          ))}
        </motion.div>

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
          className="text-gray-700 text-base leading-relaxed text-justify mb-8"
        >
          {productData.description}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div>
              <h3>Main Features</h3>
              <div
                className="text-gray-800 leading-relaxed prose-content"
                dangerouslySetInnerHTML={{ __html: productData.mainFeature || "" }}
              />
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div>
              <h3>Advantages</h3>
              <div
                className="text-gray-800 leading-relaxed prose-content"
                dangerouslySetInnerHTML={{ __html: productData.advantage || "" }}
              />
            </div>
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
