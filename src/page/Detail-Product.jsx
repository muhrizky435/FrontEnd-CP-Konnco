import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
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
import tes1 from "../assets/img/tes1.png";
import tes2 from "../assets/img/tes1.png";

void motion
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const ProductDetailPage = () => {
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const { ref: footerRef, inView: footerInView } = useInView({ threshold: 0 });

  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const dummyData = {
      id: 1,
      title: "Aplikasi Administrasi Klinik/Praktek Medis",
      desc:
        "Aplikasi yang memudahkan manajemen administrasi klinik dan praktek medis. Aplikasi ini dirancang khusus untuk membantu dokter, staf medis, dan administrasi dalam mengelola berbagai aspek operasional dan administratif sebuah klinik atau praktek medis. Aplikasi ini memungkinkan pengelolaan yang lebih efisien dari berbagai tugas dan proses yang terkait dengan penyediaan layanan kesehatan.",
      features: [
        "Pendaftaran & Janji Temu: Pendaftaran online/offline, jadwal dokter, dan pengingat otomatis.",
        "Rekam Medis Elektronik (RME): Riwayat kesehatan digital, catatan pemeriksaan, dan integrasi lab/radiologi.",
        "Keuangan & Billing: Tagihan pasien, berbagai metode pembayaran, laporan keuangan.",
        "Manajemen Obat & Stok: Inventarisasi, peringatan stok, pemesanan otomatis.",
        "Administrasi & SDM: Data pegawai, jadwal kerja, evaluasi kinerja.",
        "Laporan & Analitik: Laporan kinerja, analisis pasien, dashboard interaktif.",
        "Keamanan & Kepatuhan: Enkripsi data dan kontrol akses.",
      ],
      benefits: [
        "Mudah Digunakan: Antarmuka ramah pengguna.",
        "Efisien: Mengurangi kerja manual, mempercepat proses.",
        "Skalabel: Cocok untuk klinik kecil hingga rumah sakit.",
        "Aksesibilitas: Bisa diakses dari berbagai perangkat.",
        "Integrasi: Mendukung asuransi, laboratorium, dan telemedicine.",
      ],
      image: tes1,
      images: [tes2, tes2],
    };

    setTimeout(() => setProductData(dummyData), 800);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading || !productData) return <KonncoLoader />;

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
        {productData.image ? (
          <motion.img
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            src={productData.image}
            alt={productData.title}
            className="w-full h-64 md:h-[450px] object-cover rounded-xl mb-6"
          />
        ) : (
          <div className="bg-gray-200 w-full h-64 md:h-[450px] rounded-xl mb-6"></div>
        )}

        {/* Gambar kecil */}
        {productData.images && productData.images.length > 0 && (
          <motion.div
            className="grid grid-cols-2 gap-4 mb-10"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            {productData.images.map((img, idx) => (
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
          {productData.desc}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h2 className="text-lg font-semibold mb-2">Fitur Utama:</h2>
            <ul className="list-decimal list-inside text-gray-700 space-y-1">
              {productData.features.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h2 className="text-lg font-semibold mb-2">Keunggulan:</h2>
            <ul className="list-decimal list-inside text-gray-700 space-y-1">
              {productData.benefits.map((item, idx) => (
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

export default ProductDetailPage;
