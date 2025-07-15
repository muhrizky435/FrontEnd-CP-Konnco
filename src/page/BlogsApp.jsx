import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
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
// contoh
import blog1 from "../assets/img/blog1.png";
import blog2 from "../assets/img/tes1.png";

const dummyBlogs = [
  {
    id: 1,
    title: "Apa Itu React Router?",
    author: "Siti Rahmawati",
    date: "2025-06-30",
    category: "TECH",
    image_url: blog1,
    desc: `
      React Router adalah pustaka routing untuk aplikasi React. 
      Ini memungkinkan navigasi antar halaman dalam SPA (Single Page Application) tanpa reload halaman penuh.
    `,
  },
  {
    id: 2,
    title: "Belajar CSS Grid dengan Mudah",
    author: "Ade Rohimat",
    date: "2025-07-01",
    category: "Tech",
    image_url: blog2,
    desc: `
      CSS Grid memungkinkan pengaturan layout dua dimensi dengan efisien.
      Dengan Grid, kamu bisa mengatur kolom dan baris secara lebih fleksibel.
    `,
  },
  {
    id: 3,
    title: "Belajar CSS Grid dengan Mudah",
    author: "Ade Rohimat",
    date: "2025-07-01",
    category: "DESIGN",
    image_url: "https://source.unsplash.com/800x400/?web,design",
    desc: `
      CSS Grid memungkinkan pengaturan layout dua dimensi dengan efisien.
      Dengan Grid, kamu bisa mengatur kolom dan baris secara lebih fleksibel.
    `,
  },
];

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
    setTimeout(() => {
      setBlogs(dummyBlogs);
      setLoading(false);
    }, 1000);
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
          <div className="text-center mb-8">
            <div className="text-[#E86A1C] font-bold text-2xl mb-8">
              Our Blogs
            </div>
          </div>

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
                <div
                  className="w-full h-48 bg-center bg-cover"
                  style={{
                    backgroundImage: blog.image_url
                      ? `url(${blog.image_url})`
                      : `url("data:image/svg+xml;utf8,<svg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'><rect width='100%25' height='100%25' fill='%23f3f3f3'/><rect x='0' y='0' width='100%25' height='100%25' fill='none' stroke='%23d1d5db' stroke-width='2' stroke-dasharray='8 4'/></svg>")`,
                  }}
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

                  <div className="block w-14 px-1 py-1 bg-orange-500 text-white text-xs font-semibold rounded mb-2 mt-2">
                    {blog.category}
                  </div>

                  <div className="font-bold text-black text-base mb-2 leading-snug text-justify">
                    {blog.title}
                  </div>

                  <div className="text-gray-700 text-sm mb-4 flex-1 text-justify">
                    {blog.desc}
                  </div>

                  <Link
                    to={`/detail_blogs/${blog.id}`}
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
