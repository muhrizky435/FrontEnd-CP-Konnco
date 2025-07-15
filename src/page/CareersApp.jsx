import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import KonncoNavbar from "../components/KonncoNavbar";
import KonncoFooter from "../components/KonncoFooter";
import KonncoLoader from "../components/KonncoLoader";
import logoKonnco from "../assets/img/logo-konnco.png";
import logoWhite from "../assets/img/icon-white 1.png";
import logoEmail from "../assets/img/Email.png";
import logoFB from "../assets/img/Facebook.png";
import logoIG from "../assets/img/Instagram.png";
import logoTiktok from "../assets/img/TikTok.png";
import logoLink from "../assets/img/Linkedin.png";

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

const Careers = () => {
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const { ref: footerRef, inView: footerInView } = useInView({ threshold: 0 });

  // Simulasi loader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Dummy data untuk karir (nanti bisa diganti dengan fetch API)
  const careers = [
    {
      id: 1,
      title: "Full-Stack Developer (JavaScript, React)",
      summary:
        "Kami sedang mencari Full-Stack Developer yang berpengalaman untuk bergabung dengan tim teknologi kami...",
      tags: ["Active", "Fulltime", "Coding", "Website"],
      image: "/img/Code.png"
    },
    {
      id: 2,
      title: "Mobile Developer (React Native)",
      summary:
        "Kami mencari seorang Mobile Developer – React Native yang berdedikasi dan berpengalaman untuk membangun serta mengembangkan aplik...",
      tags: ["Active", "Fulltime", "Coding", "Mobile"],
      image: "/img/Mobile.png"
    },
  ];

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen bg-white font-sans">
      <KonncoNavbar
        fadeUp={fadeUp}
        fadeLeft={fadeLeft}
        fadeRight={fadeRight}
        logoKonnco={logoKonnco}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        drawerRef={drawerRef}
      />
      <main className="px-4 md:px-10 lg:px-24 pt-4 pb-20">
        <div className="text-center mb-12">
          <p className="text-[#E86A1C] font-semibold text-2xl">Our Products</p>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 mt-4">
            Konnco Careers
          </h1>
          <p className="text-gray-900 max-w-2xl mx-auto text-sm md:text-base text-justify">
            Bergabunglah bersama tim yang berfokus pada inovasi, kualitas, dan
            dampak nyata. Kami merancang produk yang mudah digunakan, andal, dan
            bernilai tinggi bagi pengguna. Di sini, setiap peran memiliki arti
            dan ruang untuk tumbuh bersama.
          </p>
        </div>

        <div className="space-y-8">
          {careers.map((career) => (
            <div
              key={career.id}
              className="bg-white border rounded-2xl overflow-hidden md:flex text-justify border-black shadow-[0_4px_0_0_gray]"
            >
              <div className="bg-orange-500 w-full md:w-1/4 h-32 md:h-auto flex items-center justify-center">
                <img src={career.image} alt="" className="w-21 h-21" />
              </div>
              <div className="p-6 w-full">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                  {career.title}
                </h2>
                <p className="text-gray-600 text-sm md:text-base mb-3">
                  {career.summary}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {career.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-md shadow-[0_4px_0_0_#b45309]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => (window.location.href = "/careers_apply")}
                    className="bg-[#E86A1C] font-bold flex items-center gap-1 mt-2 group w-fit text-white rounded-lg px-6 py-2 hover:bg-[#F77F4D] shadow-[0_4px_0_0_#b45309] transition-colors"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => (window.location.href = "detail_careers")}
                    className="bg-white font-bold flex items-center gap-1 mt-2 group w-fit text-black rounded-lg px-6 py-2 hover:bg-gray-300 border border-black shadow-[0_4px_0_0_gray] transition-colors"
                  >
                    Lihat Detail
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
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
};

export default Careers;
