import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import KonncoLoader from "../components/KonncoLoader";
import KonncoNavbar from "../components/KonncoNavbar";
import KonncoFooter from "../components/KonncoFooter";
import {
  logoKonnco,
  logoWhite,
  logoEmail,
  logoFB,
  logoIG,
  logoTiktok,
  logoLink,
} from "../assets/img";

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

function DetailBlogs() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/blogs/${slug}`);
        const json = await res.json();
        setBlogs(json.data);
      } catch (error) {
        console.error("Gagal fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const { ref: footerRef, inView: footerInView } = useInView({ threshold: 0 });

  if (loading || !blogs) return <KonncoLoader />;

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

        {blogs.photo ? (
          <motion.img
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            src={`http://localhost:3000/api/v1/blogs/${blogs.photo}`}
            alt={blogs.title}
            className="w-full h-[300px] object-cover mb-6 rounded"
          />
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="bg-gray-200 w-full h-[300px] mb-6 rounded"
          ></motion.div>
        )}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex items-center gap-2 text-xs text-[#E86A1C] mb-2 mt-2"
        >
          <span className="inline-flex items-center gap-1">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path
                fill="#E86A1C"
                d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5Z"
              />
            </svg>
            {blogs.author?.name || "Anonim"}
          </span>
          <span className="inline-flex items-center gap-1 ml-3 text-justify">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path
                fill="#E86A1C"
                d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 16H5V10h14v10Zm0-12H5V6h14v2Z"
              />
            </svg>
            {new Date(blogs.createdAt).toLocaleDateString("id-ID")}
          </span>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded mb-2"
        >
          {blogs.type}
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-lg font-bold mb-4 leading-snug text-left"
        >
          {blogs.title}
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-gray-700 leading-relaxed space-y-5 text-justify"
          dangerouslySetInnerHTML={{ __html: blogs.description }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-black pt-12 font-bold text-lg"
        >
          Bagikan ke
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap gap-3 mt-4 mb-4"
        >
          {["WhatsApp", "Instagram", "Tiktok", "X", "Facebook"].map((platform) => (
            <a
              key={platform}
              href={`https://www.${platform.toLowerCase()}.com/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-orange-500 hover:bg-orange-600 text-sm font-semibold py-2 px-4 rounded-md border border-orange-700 transition"
            >
              {platform}
            </a>
          ))}
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
