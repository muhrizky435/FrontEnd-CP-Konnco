import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useInView } from "react-intersection-observer";
import KonncoLoader from "../components/KonncoLoader";
import KonncoNavbar from "../components/KonncoNavbar";
import KonncoFooter from "../components/KonncoFooter";
import { motion } from "framer-motion";
import { BsFillTelephonePlusFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import {
  logoKonnco,
  logoWhite,
  logoFB,
  logoIG,
  logoTiktok,
  logoLink,
} from "../assets/img";

void motion;
function ContactApp() {
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  const navigate = useNavigate();

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: i * 0.15 },
    }),
  };
  const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: (i = 0) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: i * 0.15 },
    }),
  };
  const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: i * 0.15 },
    }),
  };

  const [footerRef, footerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Form state
  const [form, setForm] = useState({ nama: "", email: "", pesan: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await api.post("/inquiries", {
        senderName: form.nama,
        email: form.email,
        subject: "Contact Form", 
        message: form.pesan,
      });

      console.log("Respon API:", response.data);
      alert("Pesan berhasil dikirim!");
      setForm({ nama: "", email: "", pesan: "" });
      navigate(`/thanks?type=contact&inquiryId=${response.data.data.id}`);
    } catch (err) {
      console.error("Gagal kirim pesan:", err);
      alert("Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen w-full bg-white font-sans flex flex-col">
      <KonncoNavbar
        fadeUp={fadeUp}
        fadeLeft={fadeLeft}
        fadeRight={fadeRight}
        logoKonnco={logoKonnco}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        drawerRef={drawerRef}
      />

      <main className="flex-1 w-full pt-10 pb-20 px-2 md:px-0 bg-white">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center mb-8"
          >
            <div className="text-[#E86A1C] font-semibold text-xl mb-1">
              Our Contacts
            </div>
            <div className="text-3xl font-bold text-[#18253A] mb-2">
              Konnco Contacts
            </div>
            <div className="text-gray-700 text-base md:text-lg leading-relaxed text-center">
              Bergabunglah bersama tim yang berfokus pada inovasi, kualitas, dan
              dampak nyata. Kami merancang produk yang mudah digunakan, andal,
              dan bernilai tinggi bagi pengguna. Di sini, setiap peran memiliki
              arti dan ruang untuk tumbuh bersama.
            </div>
          </motion.div>

          {/* Kontak Box */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="bg-white border border-[#E86A1C] rounded-2xl mb-10 overflow-hidden shadow-sm text-justify"
          >
            <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
              <BsFillTelephonePlusFill className="text-orange-500" />
              <span className="text-gray-800 text-base font-medium select-all">
                +62 822 1234 5678
              </span>
            </div>
            <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
              <FaLocationDot className="text-orange-500" />
              <span className="text-gray-800 text-base font-medium">
                Ruko, Pd. Permai Taman Tirta 2 No.18, Ngentak, Bangunjiwo, Kec.
                Kasihan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55184
              </span>
            </div>
            <div className="flex items-center gap-4 px-6 py-4">
              <IoIosMail className="text-orange-500" />
              <span className="text-gray-800 text-base font-medium select-all">
                support@konnco.com
              </span>
            </div>
          </motion.div>

          {/* Form Kontak */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="bg-white rounded-2xl border border-[#E86A1C] shadow-md px-6 py-8"
          >
            <div className="text-center text-2xl font-bold text-[#18253A] mb-6">
              Kontak Kami
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 text-justify">
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="nama"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="nama"
                    id="nama"
                    value={form.nama}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-[#18253A] focus:outline-none"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>
                <div className="flex-1 mt-4 md:mt-0">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-[#18253A] focus:outline-none"
                    placeholder="Masukkan alamat email Anda"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="pesan"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Pesan
                </label>
                <textarea
                  name="pesan"
                  id="pesan"
                  value={form.pesan}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-[#18253A] focus:outline-none resize-none"
                  rows="4"
                  placeholder="Tulis pesan Anda di sini"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full px-4 py-3 text-white bg-[#E86A1C] rounded-md hover:bg-[#F77F4D] transition-all duration-300 ease-in-out flex items-center justify-center gap-2 shadow-[0_4px_0_0_#b45309]"
              >
                {sending ? (
                  <img
                    src={logoKonnco}
                    alt="Loading..."
                    className="h-6 w-6 animate-spin"
                  />
                ) : (
                  "Kirim Pesan"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </main>

      <KonncoFooter
        fadeUp={fadeUp}
        logoWhite={logoWhite}
        logoFB={logoFB}
        logoIG={logoIG}
        logoTiktok={logoTiktok}
        logoLink={logoLink}
        footerRef={footerRef}
        footerInView={footerInView}
      />
    </div>
  );
}

export default ContactApp;
