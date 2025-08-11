import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
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

const Careers = () => {
  const [loading, setLoading] = useState(true);
  const [careers, setCareers] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const { ref: footerRef, inView: footerInView } = useInView({ threshold: 0 });

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/careers");
        const result = await res.json();
        if (res.ok && result.data) {
          setCareers(result.data);
        } else {
          console.error("Gagal ambil data karir:", result.message);
        }
      } catch (err) {
        console.error("Error saat fetch careers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen bg-white font-sans">
      <KonncoNavbar
        fadeUp={fadeUp}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        drawerRef={drawerRef}
        logoKonnco={logoKonnco}
      />
      <main className="px-4 md:px-10 lg:px-24 pt-4 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-12"
        >
          <p className="text-[#E86A1C] font-semibold text-2xl">Our Products</p>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 mt-4">
            Konnco Careers
          </h1>
          <p className="text-gray-900 max-w-2xl mx-auto text-sm md:text-base text-center">
            Bergabunglah bersama tim yang berfokus pada inovasi, kualitas, dan
            dampak nyata. Kami merancang produk yang mudah digunakan, andal, dan
            bernilai tinggi bagi pengguna. Di sini, setiap peran memiliki arti
            dan ruang untuk tumbuh bersama.
          </p>
        </motion.div>

        <div className="space-y-8">
          {careers.map((career) => (
            <motion.div
              key={career.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="bg-white border rounded-2xl overflow-hidden md:flex text-justify border-gray-400 shadow-[0_4px_0_0_gray]"
            >
              <div className="bg-orange-500 w-full md:w-1/4 aspect-square md:aspect-auto md:h-auto flex items-center justify-center p-4">
                <img
                  src="/img/Code.png"
                  alt="gambar"
                  className="w-16 h-16 md:w-24 md:h-24 object-contain"
                />
              </div>
              <div className="p-6 w-full">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                  {career.title}
                </h2>
                <p className="text-gray-600 text-sm md:text-base mb-3">
                  {career.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {career.tags &&
                    career.tags.split(",").map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-md shadow-[0_4px_0_0_#b45309]"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      (window.location.href = `/careers_apply/${career.id}`)
                    }
                    className="bg-[#E86A1C] font-bold flex items-center gap-1 mt-2 group w-fit text-white rounded-lg px-6 py-2 hover:bg-[#F77F4D] shadow-[0_4px_0_0_#b45309] transition-colors"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() =>
                      (window.location.href = `/detail_careers/${career.id}`)
                    }
                    className="bg-white font-bold flex items-center gap-1 mt-2 group w-fit text-black rounded-lg px-6 py-2 hover:bg-gray-300 border border-gray-400 shadow-[0_4px_0_0_gray] transition-colors"
                  >
                    Lihat Detail
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
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

export default Careers;
