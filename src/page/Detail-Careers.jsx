import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import KonncoNavbar from "../components/KonncoNavbar";
import KonncoFooter from "../components/KonncoFooter";
import KonncoLoader from "../components/KonncoLoader";
import { BiMoneyWithdraw } from "react-icons/bi";
import {
  logoKonnco,
  logoWhite,
  logoEmail,
  logoFB,
  logoIG,
  logoTiktok,
  logoLink
} from "../assets/img";

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

//  dummy nanti bisa diganti dengan fetch API
const dummyCareer = {
  id: 1,
  title: "Full-Stack Developer (JavaScript, React)",
  salary: "Rp3.800.000 - Rp4.000.000 / Bulan",
  description:
    "Kami sedang mencari Full-Stack Developer yang berpengalaman untuk bergabung dengan tim teknologi kami...",
  responsibilities: [
    "Merancang, mengembangkan, dan memelihara fitur front-end dan back-end aplikasi web.",
    "Mengintegrasikan API dan memastikan komunikasi antar sistem berjalan optimal.",
    "Berkoordinasi dengan tim UI/UX, produk, dan QA untuk menghasilkan pengalaman pengguna yang baik.",
    "Menyusun dokumentasi teknis dan melakukan review kode.",
    "Menerapkan praktik terbaik dalam pengembangan perangkat lunak.",
    "Mengidentifikasi serta menyelesaikan bug atau permasalahan teknis secara proaktif.",
  ],
  qualifications: [
    "Mengidentifikasi serta menyelesaikan bug atau permasalahan teknis secara proaktif.",
    "Pengalaman minimal 1 tahun sebagai Full-Stack Developer.",
    "Menguasai JavaScript/TypeScript dan framework seperti React.",
    "Memiliki pemahaman database relasional dan non-relasional.",
    "Menguasai pengembangan back-end menggunakan Node.js.",
    "Memahami prinsip RESTful API dan arsitektur microservices.",
    "Terbiasa menggunakan Git dan tools kolaborasi.",
  ],
  tags: [
    "Fulltime/On-Site",
    "Minimal Diploma (D1–D4)",
    "Pengalaman minimal 1 tahun",
  ],
  links: ["LinkedIn", "JobStreet", "Glints"],
};

const CareerDetailPage = () => {
  const [loading, setLoading] = useState(true);
  const [career, setCareer] = useState(null);
  const { id } = useParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  const { ref: footerRef, inView: footerInView } = useInView({ threshold: 0 });

  useEffect(() => {
    // Simulasi fetch API
    setTimeout(() => {
      setCareer(dummyCareer);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading || !career) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <KonncoNavbar
        fadeUp={fadeUp}
        fadeLeft={fadeLeft}
        fadeRight={fadeRight}
        logoKonnco={logoKonnco}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        drawerRef={drawerRef}
      />
      <main className="flex flex-col md:flex-row px-4 md:px-20 py-10 gap-10 text-justify">
        {/* Left Content */}
        <div className="flex-1">
          <button
            className="group text-orange-500 font-bold text-lg mb-6 flex items-center gap-1"
            onClick={() => window.history.back()}
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              &larr;
            </span>
            Kembali
          </button>

          <div className="text-2xl md:text-3xl font-bold mb-2">
            {career.title}
          </div>
          <div className="flex items-center gap-4 py-2 text-left">
            <div className="w-10 h-10 flex items-center justify-center">
              <BiMoneyWithdraw className="text-orange-500 text-xl" />
            </div>
            <p className="text-gray-600 m-0">{career.salary}</p>
          </div>
          <button
            onClick={() => (window.location.href = `/careers_apply/${career.id}`)}
            className="font-semibold flex items-center gap-1 mt-2 group w-fit text-white mb-6 rounded-md px-4 py-2 bg-orange-500 hover:bg-orange-500 shadow-[0_4px_0_0_#b45309] transition-colors"
          >
            Apply
          </button>
          <p className="mb-6 leading-relaxed text-justify">
            {career.description}
          </p>

          <div className="font-[Plus Jakarta Sans] mb-6">
            <h2 className="font-semibold mb-2">Tanggung Jawab:</h2>
            <ul className="list-disc pl-6 text-sm leading-relaxed">
              {career.responsibilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Kualifikasi:</h2>
            <ul className="list-disc pl-6 text-sm leading-relaxed">
              {career.qualifications.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-80">
          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-2">Persyaratan</h3>
            <div className="flex flex-wrap gap-2">
              {career.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm shadow-[0_4px_0_0_#b45309]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-2">Info Lainnya</h3>
            <div className="flex flex-wrap gap-2">
              {career.links.map((link, idx) => (
                <span
                  key={idx}
                  className="border border-orange-500 px-3 py-1 rounded text-sm"
                >
                  {link}
                </span>
              ))}
            </div>
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
};

export default CareerDetailPage;
