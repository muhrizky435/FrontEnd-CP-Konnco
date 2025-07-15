import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import KonncoNavbar from "../components/KonncoNavbar";
import KonncoFooter from "../components/KonncoFooter";
import KonncoLoader from "../components/KonncoLoader";
import { useInView } from "react-intersection-observer";
import logoKonnco from "../assets/img/logo-konnco.png";
import logoWhite from "../assets/img/icon-white 1.png";
import logoEmail from "../assets/img/Email.png";
import logoFB from "../assets/img/Facebook.png";
import logoIG from "../assets/img/Instagram.png";
import logoTiktok from "../assets/img/TikTok.png";
import logoLink from "../assets/img/Linkedin.png";
import medis2 from "../assets/img/medis-2 1.png";
import cc1 from "../assets/img/cc-1 1.png";
import sekolah1 from "../assets/img/sekolah-1 1.png";
import permudah1 from "../assets/img/permudah-1 1.png";
import tour1 from "../assets/img/tour 1.png";
import visitor1 from "../assets/img/visitor 1.png";
import marketplace2 from "../assets/img/marketplace-2 1.png";
import marketplace3 from "../assets/img/marketplace-3 1.png";
import travel1 from "../assets/img/travel 1.png";
import keuangan1 from "../assets/img/keuangan-1 1.png";
import keuangan2 from "../assets/img/keuangan-2 1.png";
import pointOfSale1 from "../assets/img/pointOfSale 1.png";

void motion;
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const PRODUCTS = [
  // nanti bisa diisi dengan API
  {
    id: 1,
    title: "Aplikasi Administrasi Klinik/Praktek Medis",
    desc: (
      <>
        Aplikasi yang memudahkan manajemen administrasi klinik dan praktek
        medis. Aplikasi ini dirancang khusus untuk membantu dokter, staf medis,
        dan administrasi dalam mengelola berbagai aspek operasional dan
        administratif sebuah klinik atau praktek medis.
        <br />
        <br />
        Aplikasi ini memungkinkan pengelolaan yang lebih efisien dari berbagai
        tugas dan proses yang terkait dengan penyediaan layanan kesehatan.
      </>
    ),
    images: [medis2],
  },
  {
    id: 2,
    title: "Platform Kreatif untuk Konten Kreator",
    desc: (
      <>
        Solusi lengkap bagi konten kreator untuk meningkatkan engagement dan
        pendapatan. Fitur seperti gift, sistem subscription, dan penjualan
        merchandise memudahkan kreator berinteraksi langsung dengan penggemar.
        <br />
        <br />
        <ul className="list-disc ml-5">
          <li>Gift</li>
          <li>Subscribe</li>
          <li>Merchandise</li>
        </ul>
      </>
    ),
    images: [cc1],
  },
  {
    id: 3,
    title: "Platform Administrasi & Informasi Sekolah",
    desc: (
      <>
        Aplikasi ini sebagai platform terintegrasi untuk menciptakan lingkungan
        sekolah yang lebih terhubung, transparan, dan efisien, yang memungkinkan
        guru, murid, dan orang tua untuk mengakses informasi sekolah dengan
        lebih mudah dan efektif.
        <br />
        <br />
        <ul className="list-disc ml-5">
          <li>Jadwal Pelajaran</li>
          <li>Kegiatan Sekolah</li>
          <li>Mata Pelajaran</li>
          <li>Absensi</li>
        </ul>
      </>
    ),
    images: [sekolah1],
  },
  {
    id: 4,
    title: "Platform untuk Mempermudah Pengguna Internet",
    desc: (
      <>
        Aplikasi yang menyederhanakan pengalaman internet dengan memberikan
        akses cepat ke berbagai layanan online seperti browsing aman, manajemen
        akun, dan perlindungan privasi pengguna.
      </>
    ),
    images: [permudah1],
  },
  {
    id: 5,
    title: "Aplikasi Reservasi Tour",
    desc: (
      <>
        Sistem reservasi wisata yang praktis, memungkinkan pengguna untuk
        memesan perjalanan, memilih paket wisata, dan menmanage jadwal
        perjalanan dengan mudah melalui satu aplikasi.
      </>
    ),
    images: [tour1],
  },
  {
    id: 6,
    title: "Aplikasi Manajemen Pengunjung",
    desc: (
      <>
        Solusi manajemen pengunjung untuk berbagai institusi, membantu mencatat
        kedatangan dan keberangkatan tamu, serta menyediakan fitur notifikasi
        dan laporan secara real-time.
      </>
    ),
    images: [visitor1],
  },
  {
    id: 7,
    title: "Online Marketplace",
    desc: (
      <>
        Platform e-commerce lengkap yang menghubungkan penjual dan pembeli,
        menyediakan fitur toko online, pembayaran aman, dan sistem pengiriman
        terintegrasi untuk memudahkan transaksi.
      </>
    ),
    images: [marketplace2, marketplace3],
  },
  {
    id: 8,
    title: "Aplikasi Bus/Travel",
    desc: (
      <>
        Aplikasi untuk pemesanan tiket bus dan travel secara online, lengkap
        dengan fitur pelacakan rute, jadwal perjalanan, dan opsi pembayaran
        digital untuk pengalaman pengguna yang lebih nyaman.
      </>
    ),
    images: [travel1],
  },
  {
    id: 9,
    title: "Aplikasi Keuangan",
    desc: (
      <>
        Solusi keuangan digital yang membantu pengguna mengelola pengeluaran,
        pemasukan, budgeting, dan investasi. Dilengkapi dengan fitur pelaporan
        keuangan dan pengingat pembayaran.
      </>
    ),
    images: [keuangan1, keuangan2],
  },
  {
    id: 10,
    title: "Aplikasi Point of Sale",
    desc: (
      <>
        Sistem POS modern untuk mengelola transaksi penjualan, inventaris, dan
        laporan keuangan secara real-time, cocok untuk bisnis retail, restoran,
        dan usaha kecil lainnya.
      </>
    ),
    images: [pointOfSale1],
  },
];

function ProductApp() {
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const { ref: footerRef, inView: footerInView } = useInView({ threshold: 0 });

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen w-full flex flex-col bg-white font-sans">
      <KonncoNavbar
        fadeUp={fadeUp}
        logoKonnco={logoKonnco}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        drawerRef={drawerRef}
      />

      <main className="flex-1 w-full pt-4 pb-10 px-2 md:px-0">
        <section className="w-full mx-auto px-4 md:px-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center mb-6"
          >
            <div className="text-[#E86A1C] font-semibold text-2xl mb-2">
              Our Products
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Konnco Products
            </h1>
            <div className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto text-justify">
              Setiap produk dirancang dengan fokus pada kemudahan penggunaan,
              keandalan, dan nilai fungsional yang tinggi.
            </div>
          </motion.div>

          <div className="flex flex-col gap-8">
            {PRODUCTS.map((prod, idx) => (
              <motion.div
                key={prod.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className={`flex flex-col md:flex-row items-stretch rounded-2xl shadow-[5px_5px_15px_rgba(0,0,0,0.4)] overflow-hidden bg-white text-justify
                  ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="w-full md:w-1/2 h-64 md:h-auto">
                  <img
                    src={prod.images[0]}
                    alt={prod.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-between p-6 md:p-8">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-2 text-black">
                      {prod.title}
                    </h2>
                    <div className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                      {prod.desc}
                    </div>
                  </div>
                  <a
                    href={`detail_product/${prod.id}`}
                    className="group flex gap-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-[5px_5px_20px_rgba(0,0,0,0.4)] w-fit transition"
                  >
                    Lihat Detail
                    <span className="group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
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
}

export default ProductApp;
