import React, { useState, useRef, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import KonncoLoader from "../components/KonncoLoader";
import KonncoNavbar from "../components/KonncoNavbar";
import KonncoFooter from "../components/KonncoFooter";
import "../index.css";
import {
  logoKonnco,
  maps,
  logoAdobeI,
  logoAdobeP,
  logoFigma,
  logoGolang,
  logoJava,
  logoLaravel,
  logoMarvel,
  logoNode,
  logoPhp,
  logoReact,
  logoZeplin,
  logoWhite,
  logoEmail,
  logoFB,
  logoIG,
  logoTiktok,
  logoLink,
} from "../assets/img";

function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const drawerRef = useRef(null);
  const scrollQuoteRef = useRef(null);

  const handleScrollToQuote = () => {
    scrollQuoteRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  void motion;
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

  // Intersection observer hooks for each section
  const [clientsRef, clientsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [footerRef, footerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // typeWriter
  const [typeKey, setTypeKey] = useState(0);
  const [headingRef, inView] = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      setTypeKey((prev) => prev + 1);
    }
  }, [inView]);

  return (
    <>
      {loading ? (
        <KonncoLoader />
      ) : (
        <div className="min-h-screen w-full bg-white font-sans flex flex-col animate-fadein">
          <AnimatePresence>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeUp}
              className="w-full"
            >
              {/* Header/Navbar */}
              <KonncoNavbar
                fadeUp={fadeUp}
                fadeLeft={fadeLeft}
                logoKonnco={logoKonnco}
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                drawerRef={drawerRef}
              />

              {/* Main Content */}
              <main className="flex-1 flex flex-col justify-center items-center text-center mt-8 px-4 w-full animate-fadein">
                <motion.img
                  src={logoKonnco}
                  alt="Konnco Studio Main Logo"
                  className="w-24 h-24 mx-auto mb-6"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.6 }}
                />
                <motion.h1
                  ref={headingRef}
                  className="text-4xl md:text-5xl font-bold text-orange-600 mb-2 whitespace-nowrap"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.7 }}
                >
                  <Typewriter
                    key={typeKey}
                    words={["Konnco Studio"]}
                    loop={1}
                    cursor
                    cursorStyle="|"
                    typeSpeed={120}
                    deleteSpeed={50}
                    delaySpeed={800}
                  />
                </motion.h1>
                <motion.div
                  className="text-lg md:text-xl font-medium text-gray-900 mb-8"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.8 }}
                >
                  Your Trusted Software Development Partner
                </motion.div>
                <motion.a
                  onClick={handleScrollToQuote}
                  className="bg-[#E86A1c] hover:bg-[#d45d13] text-white font-semibold rounded-xl px-10 py-4 text-lg shadow-[0_6px_0_0_#b45309] transition w-auto flex items-center gap-4 cursor-pointer"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.9 }}
                >
                  Ayo Mulai
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 32 32"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 16h16M20 12l4 4-4 4"
                    />
                  </svg>
                </motion.a>
              </main>

              {/* Section: Quote */}
              <div ref={scrollQuoteRef}></div>
              <motion.section
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.0 }}
                className="bg-orange-600 text-white mt-16 rounded-t-[48px] px-4 py-12 text-center w-full"
              >
                <div className="max-w-3xl mx-auto">
                  <div className="text-lg md:text-xl font-light leading-relaxed relative">
                    <span className="text-4xl align-top absolute -left-4 top-0">
                      “
                    </span>
                    <p className="px-6">
                      Konnco Studio{" "}
                      <span className="font-semibold">berkomitmen</span> sebagai
                      software developer partner yang dapat memberikan solusi
                      digital inovatif dengan menggunakan teknologi yang andal.
                    </p>
                    <span className="text-4xl align-bottom absolute -right-4 bottom-0">
                      ”
                    </span>
                  </div>
                  <p className="mt-6 text-lg md:text-xl font-semibold">
                    Execute Better with Konnco Studio
                  </p>
                </div>
                <hr className="mt-6 border-t border-orange-300 w-3/4 mx-auto" />
              </motion.section>

              {/* Section: Where We Work & Our Mission */}
              <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.2 }}
                className="w-full bg-orange-600 flex justify-center py-10 px-16"
              >
                <div className="flex flex-col lg:flex-row gap-5 w-full max-w-10xl">
                  {/* Where We Work */}
                  <motion.div
                    variants={fadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-[20px] p-8 flex-1 flex flex-col shadow-[0_4px_0_0_gray]"
                  >
                    <img
                      onClick={() =>
                        window.open(
                          "https://maps.app.goo.gl/35fDCsGobJkRoudL8",
                          "_blank"
                        )
                      }
                      src={maps}
                      alt="Yogyakarta Map"
                      className="rounded-2xl w-full h-56 object-cover mb-6 cursor-pointer"
                      style={{ background: "#e5e7eb" }}
                    />

                    <div className="text-lg font-semibold text-[#E86A1C] mb-1 text-left">
                      Where We Work?
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-black mb-2 text-left">
                      Daerah Istimewa Yogyakarta
                    </div>
                    <div className="text-gray-700 mb-6 text-justify">
                      Saat ini kantor utama Konnco Studio berada di kota
                      Yogyakarta. Di mana Yogyakarta merupakan kota yang nyaman
                      dengan penduduknya yang ramah serta talenta teknologi yang
                      mumpuni.
                    </div>

                    {/* button */}
                    <div className="flex justify-end mt-auto">
                      <a
                        href="https://maps.app.goo.gl/35fDCsGobJkRoudL8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#e86a1c] text-white hover:bg-[#d45d13] font-semibold rounded-xl px-8 py-3 text-lg shadow-[0_6px_0_0_#b45309] transition flex gap-2"
                      >
                        Lihat Map
                      </a>
                    </div>
                  </motion.div>
                  {/* Our Mission */}
                  <motion.div
                    variants={fadeRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-[32px] p-8 flex-1 flex flex-col shadow-[0_4px_0_0_gray] text-left max-h-[800px] md:overflow-auto overflow-visible"
                  >
                    <div className="text-lg font-semibold text-[#E86A1C]">
                      Our Mission
                    </div>
                    <div className="text-2xl md:text-xl font-bold text-black text-left">
                      Hanya Membuat yang berkualitas
                    </div>
                    <div className="text-gray-700 mb-6 text-justify">
                      Secara konsisten kami mempelajari teknologi terbaik agar
                      dapat terus berinovasi dan memberikan solusi terbaik untuk
                      partner bisnis kami. Kami juga membantu komunitas
                      teknologi di sekitar kami bertumbuh dengan berbagi ilmu
                      dan pengalaman kami.
                    </div>
                    <hr className="my-4 border-black-200" />
                    <div className="text-2xl md:text-xl font-bold text-black mt-5 text-left">
                      Mengapa Anda Harus Bekerja Sama Dengan Kami?
                    </div>
                    <div className="text-gray-700 text-justify">
                      Banyak klien bekerja sama dengan kami karena kami
                      menawarkan{" "}
                      <span className="font-bold">SOLUSI TERBAIK</span>{" "}
                      berdasarkan Timeline, Budget, dan kebutuhan mereka.
                      Startup bekerja sama dengan kami karena kami memadukan
                      Pengalaman, Kreativitas, dan Kemampuan Teknis yang telah
                      kami kumpulkan selama 8 tahun ini sehingga dapat membuat
                      mereka scale up dengan lebih cepat!
                    </div>
                  </motion.div>
                </div>
              </motion.section>

              {/* Section: Our Services */}
              <motion.section
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 2 }}
                className="w-full py-20 px-20 bg-white"
              >
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-[#E86A1C] mb-2">
                      Our Services
                    </div>
                    <h2 className="text-3xl md:text-3xl font-bold text-black mb-3 leading-tight">
                      Solusi Inovatif untuk Mengembangkan Bisnismu
                    </h2>
                    <div className="text-gray-900 text-lg max-w-2xl mx-auto">
                      Kami menawarkan layanan pengembangan perangkat lunak
                      dengan kualitas tinggi. Dengan pengalaman dan pengetahuan
                      dalam model bisnis yang umum hingga yang spesifik. Standar
                      layanan kami meliputi Great Design, Best UX sampai
                      Excellent Maintenance.
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {[
                      "Great Design",
                      "Best UX",
                      "Clean Code",
                      "Fast Deployment",
                      "Smooth Deployment",
                      "Excellent Maintenance",
                    ].map((title, idx) => (
                      <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.6,
                          delay: idx * 0.1,
                          ease: "easeOut",
                        }}
                        className="rounded-2xl border border-gray-400 bg-white p-8 min-h-[150px] relative shadow-lg shadow-gray-700/70 overflow-hidden"
                      >
                        <span className="text-2xl md:text-2xl font-extrabold text-black absolute top-6 left-8">
                          {title}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* Section: Our Stack */}
              <motion.section
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.3 }}
                className="w-full py-20 bg-[#18253A] text-white"
              >
                <div className="max-w-8xl mx-auto px-4">
                  <div className="text-center mb-8">
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      className="text-2xl font-semibold"
                    >
                      Our Stack
                    </motion.div>
                  </div>
                  {/* Development */}
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="mb-14"
                  >
                    <div className="text-2xl font-bold text-[#E86A1C] mb-2 text-center">
                      Development
                    </div>
                    <div className="text-base md:text-lg text-gray-200 mb-6 text-center max-w-3xl mx-auto">
                      Tidak ada tantangan yang tidak dapat dilewati oleh
                      engineer kami. Kami berfokus pada bahasa pemrograman dan
                      framework yang mumpuni seperti React, Laravel, NodeJS, Go.
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-8 mb-4">
                      {[
                        logoReact,
                        logoLaravel,
                        logoNode,
                        logoGolang,
                        logoJava,
                        logoPhp,
                      ].map((logo, i) => (
                        <motion.img
                          key={i}
                          src={logo}
                          alt="Stack"
                          className="h-14"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                  {/* Design */}
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="text-2xl font-bold text-[#E86A1C] mb-2 text-center">
                      Design
                    </div>
                    <div className="text-base md:text-lg text-gray-200 mb-6 text-center max-w-3xl mx-auto">
                      Bekerja dengan desainer terbaik. Kami memberikan desain
                      yang unik, minimalis dan memiliki fungsional yang baik,
                      dengan pengguna sebagai titik awal pembuatan desain.
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-8">
                      {[
                        logoAdobeP,
                        logoAdobeI,
                        logoFigma,
                        logoZeplin,
                        logoMarvel,
                      ].map((logo, i) => (
                        <motion.img
                          key={i}
                          src={logo}
                          alt="Stack"
                          className="h-14"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.section>

              {/* Section: Agile Workflow */}
              <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 1.4 }}
                className="w-full py-20 bg-white"
              >
                <div className="max-w-5xl mx-auto px-4">
                  <div className="text-center mb-6">
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      className="text-xl font-bold text-[#E86A1C] mb-2"
                    >
                      How Do We Work?
                    </motion.div>
                    <motion.h2
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      className="text-3xl md:text-4xl font-extrabold text-black mb-3 leading-tight"
                    >
                      Agile Workflow
                    </motion.h2>
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      className="text-gray-700 text-lg max-w-2xl mx-auto"
                    >
                      Konnco Studio menggunakan metode Agile development dalam
                      mengatur taskingnya dengan Sprint dan Reporting yang
                      dilakukan setiap hari.
                    </motion.div>
                  </div>
                  {/* Responsive Workflow */}
                  <div className="relative flex flex-col items-center mt-16 min-h-[340px]">
                    {/* Desktop Layout */}
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      className="hidden md:flex flex-row justify-between w-full max-w-4xl mx-auto"
                    >
                      {/* Discuss */}
                      <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#E86A1C] rounded-2xl shadow-[0_5px_0_0_#b45309] px-10 py-8 min-w-[290px] text-left mb-8"
                      >
                        <div className="text-white text-3xl font-bold mb-2">
                          01
                        </div>
                        <div className="text-black text-2xl font-bold mb-1">
                          Discuss
                        </div>
                      </motion.div>
                      {/* Spacer */}
                      <div className="flex-1" />
                      {/* Execute */}
                      <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.4 }}
                        className="bg-[#E86A1C] rounded-2xl shadow-[0_5px_0_0_#b45309] px-10 py-8 min-w-[290px] text-left mb-8"
                      >
                        <div className="text-white text-3xl font-bold mb-2">
                          03
                        </div>
                        <div className="text-black text-2xl font-bold mb-1">
                          Execute
                        </div>
                      </motion.div>
                    </motion.div>
                    {/* Middle: Planning (Desktop) */}
                    <motion.div
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      className="hidden md:block absolute left-[35%] top-[65%] -translate-x-1/2 z-10"
                    >
                      <div className="bg-[#E86A1C] rounded-2xl px-10 py-8 min-w-[290px] text-left shadow-[0_5px_0_0_#b45309]">
                        <div className="text-white text-3xl font-bold mb-2">
                          02
                        </div>
                        <div className="text-black text-2xl font-bold mb-1">
                          Planning
                        </div>
                      </div>
                    </motion.div>

                    {/* Mobile Layout */}
                    <div className="flex flex-col gap-6 w-full md:hidden">
                      {/* Discuss */}
                      <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#E86A1C] rounded-2xl shadow-[0_5px_0_0_#b45309] px-8 py-6 text-left"
                      >
                        <div className="text-white text-2xl font-bold mb-1">
                          01
                        </div>
                        <div className="text-black text-xl font-bold mb-1">
                          Discuss
                        </div>
                      </motion.div>
                      
                      
                      {/* Planning */}
                      <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.3 }}
                        className="bg-[#E86A1C] rounded-2xl shadow-[0_5px_0_0_#b45309] px-8 py-6 text-left"
                      >
                        <div className="text-white text-2xl font-bold mb-1">
                          02
                        </div>
                        <div className="text-black text-xl font-bold mb-1">
                          Planning
                        </div>
                      </motion.div>
                      {/* Execute */}
                      <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.4 }}
                        className="bg-[#E86A1C] rounded-2xl shadow-[0_5px_0_0_#b45309] px-8 py-6 text-left"
                      >
                        <div className="text-white text-2xl font-bold mb-1">
                          03
                        </div>
                        <div className="text-black text-xl font-bold mb-1">
                          Execute
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.section>
              {/* Clients Section */}
              <section className="w-full pt-14 pb-0 bg-[#E86A1C]">
                <motion.div
                  ref={clientsRef}
                  variants={fadeUp}
                  initial="hidden"
                  animate={clientsInView ? "visible" : "hidden"}
                  className="max-w-5xl mx-auto px-4"
                >
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={clientsInView ? "visible" : "hidden"}
                    className="text-center mb-8"
                  >
                    <div className="text-2xl md:text-xl font-semibold text-white mb-2">
                      Meets Our Clients
                    </div>
                    <div className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                      Klien Konnco Studio
                    </div>
                    <div className="text-white text-lg max-w-3xl mx-auto leading-relaxed">
                      Selama bertahun-tahun, Konnco Studio telah memiliki hak
                      istimewa untuk bekerja dengan beragam klien di berbagai
                      industri, termasuk e-commerce, payment, healthcare,
                      pendidikan, dan banyak lagi. Kami telah mengerjakan
                      berbagai macam proyek dari Indonesia, Asia Tenggara dan
                      juga Eropa mulai dari perusahaan kelas menengah dan juga
                      Start Up.
                    </div>
                  </motion.div>
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={clientsInView ? "visible" : "hidden"}
                    transition={{ delay: 0.2 }}
                    className="overflow-hidden w-full py-8 bg-white rounded-lg"
                  >
                    <div className="flex items-center gap-10 animate-scroll-infinite">
                      {[
                        "/img/our-costumer 1.png",
                        "/img/our-costumer 2.png",
                        "/img/our-costumer 3.png",
                        "/img/our-costumer 4.png",
                        "/img/our-costumer 5.png",
                        "/img/our-costumer 6.png",
                        "/img/our-costumer 7.png",
                        "/img/our-costumer 8.png",
                        "/img/our-costumer 9.png",
                        "/img/our-costumer 10.png",
                        "/img/our-costumer 11.png",
                        "/img/our-costumer 12.png",
                        "/img/our-costumer 13.png",
                        "/img/our-costumer 14.png",
                        "/img/our-costumer 15.png",
                        "/img/our-costumer 16.png",
                        "/img/our-costumer 17.png",
                        "/img/our-costumer 18.png",
                      ]
                        .concat([
                          "/img/our-costumer 1.png",
                          "/img/our-costumer 2.png",
                          "/img/our-costumer 3.png",
                          "/img/our-costumer 4.png",
                          "/img/our-costumer 5.png",
                          "/img/our-costumer 6.png",
                          "/img/our-costumer 7.png",
                          "/img/our-costumer 8.png",
                          "/img/our-costumer 9.png",
                          "/img/our-costumer 10.png",
                          "/img/our-costumer 11.png",
                          "/img/our-costumer 12.png",
                          "/img/our-costumer 13.png",
                          "/img/our-costumer 14.png",
                          "/img/our-costumer 15.png",
                          "/img/our-costumer 16.png",
                          "/img/our-costumer 17.png",
                          "/img/our-costumer 18.png",
                        ])
                        .map((src, i) => (
                          <img
                            key={i}
                            src={src}
                            alt={`Client ${i}`}
                            className="h-16 w-auto rounded-xl bg-white shadow-md shadow-orange-500/70 p-2 object-contain hover:scale-105 transition-transform duration-300 ease-in-out"
                          />
                        ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Footer */}
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
              </section>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default Home;
