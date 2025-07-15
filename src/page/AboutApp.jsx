import React, { useState, useRef, useEffect } from "react";
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

function AboutApp() {
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  const { ref: footerRef, inView: footerInView } = useInView({
    threshold: 0,
  });

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

      {/* Main */}
      <main className="flex-1 w-full pt-4 pb-10">
        <div className="text-center mb-8">
          <div className="text-orange-600 font-semibold text-2xl mb-2">
            Introduce to You
          </div>
          <img
            src={logoKonnco}
            alt="Konnco Studio"
            className="mx-auto w-20 h-20 mb-4"
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Konnco Studio</h1>
          <div className="text-gray-600 text-lg mx-auto leading-relaxed text-justify" style={{maxWidth: 700}}>
            Kami memulai usaha sebagai tim pengembangan software sejak tahun
            2013, dan secara resmi perusahaan Konnco Studio didirikan pada tahun
            2019 di Yogyakarta, Indonesia. Konnco Studio dibangun dari sebuah
            ide untuk membangun sebuah perusahaan yang membantu klien atau
            konsumen memecahkan masalahnya.
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-12 mt-20 px-4 md:px-16">
          <div className="flex-2">
            <h2 className="text-2xl md:text-2xl font-bold mb-4 text-justify">
              Why Choose Us?
            </h2>
            <div className="text-gray-600 text-lg leading-relaxed text-justify">
              Banyak klien bekerja sama dengan kami karena kami menawarkan
              solusi terbaik berdasarkan timeline, budget, dan kebutuhan mereka.
              Startup bekerja sama dengan kami karena kami memadukan Pengalaman,
              Kreativitas, dan Kemampuan Teknis yang telah kami kumpulkan selama
              8 tahun ini sehingga dapat membuat mereka scale up dengan lebih
              cepat!
            </div>
          </div>
          <div className="flex-2">
            <h2 className="text-2xl md:text-2xl font-bold mb-4 text-justify">
              Let’s Build Something Amazing Together
            </h2>
            <div className="text-gray-600 text-lg leading-relaxed text-justify">
              Konnco Studio, bersinergi untuk membantu bisnis mencapai tujuan
              mereka melalui solusi perangkat lunak yang disesuaikan. kami dapat
              membantu dalam pembuatan situs web baru, mobile aplikasi, atau
              solusi enterprise software, tim kami siap mendukung setiap langkah
              perjalanan digital Anda.
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
}

export default AboutApp;
