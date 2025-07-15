import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import {motion} from "framer-motion";
import KonncoLoader from "../components/KonncoLoader";
import KonncoNavbar from "../components/KonncoNavbar";
import KonncoFooter from "../components/KonncoFooter";
import logoKonnco from "../assets/img/logo-konnco.png";
import logoWhite from "../assets/img/icon-white 1.png";
import logoEmail from "../assets/img/Email.png";
import logoFB from "../assets/img/Facebook.png";
import logoIG from "../assets/img/Instagram.png";
import logoTiktok from "../assets/img/TikTok.png";
import logoLink from "../assets/img/Linkedin.png";
import blog1 from "../assets/img/tes1.png";

// Animations
void motion;
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// Dummy blog data array with image_url
const dummyBlogs = [
  {
    id: 1,
    title: "Apa Itu React Router?",
    author: "Siti Rahmawati",
    date: "2025-06-30",
    category: "TECH",
    image_url: blog1,
    content: `
      <p><strong>React Router</strong> adalah pustaka routing untuk aplikasi React. 
      Ini memungkinkan navigasi antar halaman dalam SPA (Single Page Application) tanpa reload halaman penuh.</p>
    `,
  },
  {
    id: 2,
    title: "Belajar CSS Grid dengan Mudah",
    author: "Ade Rohimat",
    date: "2025-07-01",
    category: "DESIGN",
    image_url: blog1,
    content: `
      <p><strong>CSS Grid</strong> memungkinkan pengaturan layout dua dimensi dengan efisien.
      Dengan Grid, kamu bisa mengatur kolom dan baris secara lebih fleksibel.</p>
    `,
  },
];

function DetailBlogs() {
  const [loading, setLoading] = useState(true);
  const [articleData, setArticleData] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const foundBlog = dummyBlogs.find((b) => b.id === parseInt(id));
    setArticleData(foundBlog || null);
  }, [id]);

  const { ref: footerRef, inView: footerInView } = useInView({ threshold: 0 });

  if (loading || !articleData) return <KonncoLoader />;

  return (
    <div className="min-h-screen w-full flex flex-col bg-white font-sans">
      <KonncoNavbar
        fadeUp={fadeUp}
        fadeLeft={fadeLeft}
        fadeRight={fadeRight}
        logoKonnco={logoKonnco}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        drawerRef={drawerRef}
      />

      <main className="flex-1 w-full px-4 md:px-32 pt-4 pb-16 text-justify">
        <button
          className="group font-semibold text-orange-500 text-lg mb-4 flex items-center gap-1"
          onClick={() => window.history.back()}
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            &larr;
          </span>
          Kembali
        </button>

        {articleData.image_url ? (
          <motion.img
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            src={articleData.image_url}
            alt={articleData.title}
            className="w-full h-[300px] object-cover mb-6 rounded"
          />
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="bg-gray-200 w-full h-[300px] mb-6 rounded"></motion.div>
        )}

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex items-center gap-2 text-xs text-[#E86A1C] mb-2 mt-2">
          <span className="inline-flex items-center gap-1">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path
                fill="#E86A1C"
                d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5Z"
              />
            </svg>
            {articleData.author}
          </span>
          <span className="inline-flex items-center gap-1 ml-3 text-justify">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path
                fill="#E86A1C"
                d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 16H5V10h14v10Zm0-12H5V6h14v2Z"
              />
            </svg>
            {articleData.date}
          </span>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded mb-2">
          {articleData.category}
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-lg font-bold mb-4 leading-snug text-left">
          {articleData.title}
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-gray-700 leading-relaxed space-y-5 text-justify"
          dangerouslySetInnerHTML={{ __html: articleData.content }}
        />
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-black pt-12 font-bold text-lg">Bagikan ke</motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap gap-3 mt-4 mb-4">
          <a
            href="https://www.whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-orange-500 hover:bg-orange-600 text-sm font-semibold py-2 px-4 rounded-md border border-orange-700 transition"
          >
            WhatsApp
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-orange-500 hover:bg-orange-600 text-sm font-semibold py-2 px-4 rounded-md border border-orange-700 transition"
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-orange-500 hover:bg-orange-600 text-sm font-semibold py-2 px-4 rounded-md border border-orange-700 transition"
          >
            Tiktok
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-orange-500 hover:bg-orange-600 text-sm font-semibold py-2 px-4 rounded-md border border-orange-700 transition"
          >
            X
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-orange-500 hover:bg-orange-600 text-sm font-semibold py-2 px-4 rounded-md border border-orange-700 transition"
          >
            Facebook
          </a>
        </motion.div>
      </main>

      <KonncoFooter
        fadeUp={fadeUp}
        fadeLeft={fadeLeft}
        fadeRight={fadeRight}
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
}

export default DetailBlogs;
