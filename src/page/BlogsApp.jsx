import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useInView } from "react-intersection-observer";
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

function BlogsApp() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const { ref: footerRef, inView: footerInView } = useInView({ threshold: 0 });

  useEffect(() => {
    api
      .get("/blogs")
      .then((res) => {
        // console.log("RESPON BLOG:", res.data);
        const data = res.data?.data || [];
        const formatted = data.map((blogs) => ({
          id: blogs.id,
          title: blogs.title || "Judul tidak tersedia",
          author: blogs.author?.name,
          date: blogs.createdAt
            ? new Date(blogs.createdAt).toISOString().split("T")[0]
            : "Tanggal tidak tersedia",
          type: blogs.type,
          image_url: blogs.photo
            ? `http://localhost:3000/blogs/${blogs.photo}`
            : "/img/default-image.png",
          content: blogs.content
            ? blogs.content.slice(0, 120) + "..."
            : "Tidak ada deskripsi.",
          slug: blogs.slug,
        }));
        setBlogs(formatted);
      })
      .catch((err) => {
        console.error("Gagal ambil blog:", err.response?.data || err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <KonncoLoader />;
  }

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

      <main className="flex-1 w-full pt-4 pb-10">
        <div className="w-full mx-auto px-4 md:px-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center mb-8"
          >
            <div className="text-[#E86A1C] font-bold text-2xl mb-4">
              Our Blogs
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 mt-2">
              Konnco Blogs
            </h1>
            <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto text-justify">
              Kami percaya bahwa berbagi wawasan adalah bagian penting dari
              pengembangan teknologi yang berkelanjutan. Melalui blog ini, kami
              membagikan berbagai artikel. studi kasus, dan tips seputar
              pengembangan aplikasi, desain sistem, serta teknologi terkini.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <div
                key={blog.id}
                className="rounded-2xl border border-gray-400 bg-white overflow-hidden shadow-custom flex flex-col min-h-[420px] animate-fadeIn"
                style={{
                  animationDelay: `${idx * 0.08 + 0.1}s`,
                  animationDuration: "0.7s",
                  animationFillMode: "both",
                  animationName: "fadeInUp",
                }}
              >
                {/* Image */}
                <img
                  src={blog.image_url }
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-[#E86A1C] mb-1">
                    <span className="inline-flex items-center gap-1">
                      <svg
                        width="14"
                        height="14"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#E86A1C"
                          d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5Z"
                        />
                      </svg>
                      {blog.author}
                    </span>
                    <span className="inline-flex items-center gap-1 ml-3 text-justify">
                      <svg
                        width="14"
                        height="14"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#E86A1C"
                          d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 16H5V10h14v10Zm0-12H5V6h14v2Z"
                        />
                      </svg>
                      {blog.date}
                    </span>
                  </div>

                  <div className="inline-block px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded mb-2 mt-2 w-fit">
                    {blog.type}
                  </div>

                  <div className="font-bold text-black text-base mb-2 leading-snug text-justify">
                    {blog.title}
                  </div>

                  <div className="text-gray-700 text-sm mb-4 flex-1 text-justify prose-content"
                       dangerouslySetInnerHTML={{ __html: blog.content }}
                  >
                  </div>

                  <Link
                    to={`/detail_blogs/${blog.slug}`}
                    className="font-semibold flex items-center gap-1 mt-2 group w-fit"
                    style={{ color: "#E86A1C" }}
                  >
                    Lihat Selengkapnya
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
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

export default BlogsApp;
