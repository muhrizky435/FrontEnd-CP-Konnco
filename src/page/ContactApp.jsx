import React, { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import KonncoLoader from "../components/KonncoLoader";
import KonncoNavbar from "../components/KonncoNavbar";
import KonncoFooter from "../components/KonncoFooter";
import logoKonnco from "../assets/img/logo-konnco.png";
import logoWhite from "../assets/img/icon-white 1.png";
import logoFB from "../assets/img/Facebook.png";
import logoIG from "../assets/img/Instagram.png";
import logoTiktok from "../assets/img/TikTok.png";
import logoLink from "../assets/img/Linkedin.png";
import { BsFillTelephonePlusFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

function ContactApp() {
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ nama: "", email: "", pesan: "" });
      alert("Pesan berhasil dikirim!");
    }, 1200);
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
          <div className="text-center mb-8">
            <div className="text-[#E86A1C] font-semibold text-xl mb-1">
              Our Contacts
            </div>
            <div className="text-3xl font-bold text-[#18253A] mb-2">
              Konnco Contacts
            </div>
            <div className="text-gray-700 text-base md:text-lg leading-relaxed text-justify">
              Bergabunglah bersama tim yang berfokus pada inovasi, kualitas, dan dampak nyata. Kami merancang produk yang mudah digunakan, andal, dan bernilai tinggi bagi pengguna. Di sini, setiap peran memiliki arti dan ruang untuk tumbuh bersama.
            </div>
          </div>

          {/* Kontak Box */}
          <div className="bg-white border border-[#E86A1C] rounded-2xl mb-10 overflow-hidden shadow-sm text-justify">
            <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
                <BsFillTelephonePlusFill className="text-orange-500" />
              <span className="text-gray-800 text-base font-medium select-all">
                +62 822 1234 5678
              </span>
            </div>
            <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200">
                <FaLocationDot className="text-orange-500" />
              <span className="text-gray-800 text-base font-medium">
                Ruko, Pd. Permai Taman Tirta 2 No.18, Ngentak, Bangunjiwo, Kec. Kasihan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55184
              </span>
            </div>
            <div className="flex items-center gap-4 px-6 py-4">
                <IoIosMail className="text-orange-500" />
              <span className="text-gray-800 text-base font-medium select-all">
                support@konnco.com
              </span>
            </div>
          </div>

          {/* Form Kontak */}
          <div className="bg-white rounded-2xl border border-[#E86A1C] shadow-md px-6 py-8">
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
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4.293 12.293a1 1 0 011.414 0L12 18.586l6.293-6.293a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z"
                    ></path>
                  </svg>
                ) : (
                  "Kirim Pesan"
                )}
              </button>
            </form>
          </div>
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