import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import KonncoLoader from "../components/KonncoLoader";
import KonncoNavbar from "../components/KonncoNavbar";
import KonncoFooter from "../components/KonncoFooter";
import {
  logoKonnco,
  logoWhite,
  logoEmail,
  logoFB,
  logoIG,
  logoTiktok,
  logoLink,
} from "../assets/img";

function ThanksApp() {
  const [applicantName, setApplicantName] = useState("");
  const [, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const { ref: footerRef, inView: footerInView } = useInView();

  const query = new URLSearchParams(location.search);
  const type = query.get("type");

  const careerId = query.get("careerId");
  const applicationId = query.get("applicationId");
  const inquiryId = query.get("inquiryId");

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };
  const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };
  const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const getMessageContent = () => {
    if (type === "career") {
      return {
        title: "Terima Kasih!",
        message: (
          <div>
            {applicantName && (
              <div className="mb-2 font-semibold">Halo {applicantName},</div>
            )}
            <div>
              Lamaran Anda telah berhasil kami terima. Tim Konnco Studio akan
              meninjau informasi dan dokumen yang Anda kirimkan. Kami akan
              menghubungi Anda melalui email atau nomor yang tercantum apabila
              Anda lolos ke tahap selanjutnya.
              <br />
              <br />
              Semoga sukses, dan sampai jumpa di tahap berikutnya!
            </div>
          </div>
        ),
      };
    }

    return {
      title: "Pesan Terkirim!",
      message: (
        <div>
          {applicantName && (
            <div className="mb-2 font-semibold">Halo {applicantName},</div>
          )}
          <div>
            Pesan Anda telah berhasil dikirim ke Konnco Studio. Kami sangat
            menghargai waktu dan perhatian Anda. Tim kami akan segera menanggapi
            pesan Anda melalui email atau nomor kontak yang Anda cantumkan.
            <br />
            <br />
            Untuk pertanyaan mendesak, Anda juga dapat menghubungi kami melalui
            Sosial Media Konnco Studio.
          </div>
        </div>
      ),
    };
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchName = async () => {
      try {
        if (type === "career" && careerId && applicationId) {
          const res = await fetch(
            `http://localhost:3000/api/v1/careers/${careerId}/applications/${applicationId}/thank-you`
          );
          const data = await res.json();
          if (res.ok) {
            setApplicantName(data.data?.applicantName || "");
          }
        } else if (type === "contact" && inquiryId) {
          const res = await fetch(
            `http://localhost:3000/api/v1/inquiries/${inquiryId}/thank-you`
          );
          const data = await res.json();
          if (res.ok) {
            setApplicantName(data.data?.senderName || "");
          }
        }
      } catch (err) {
        console.error("Gagal memuat data nama:", err);
        setError("Gagal memuat nama.");
      }
    };

    fetchName();
  }, [type, careerId, applicationId, inquiryId]);

  const { title, message } = getMessageContent();

  if (loading) return <KonncoLoader />;

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

      <main className="flex-1 w-full pt-8 pb-16 px-4">
        <div className="max-w-xl mx-auto bg-white border border-orange-200 shadow-lg rounded-2xl p-8 text-center">
          <img
            src={logoKonnco}
            alt="Konnco Logo"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h1 className="text-orange-600 font-semibold text-2xl mb-4">
            {title}
          </h1>
          <div className="text-gray-700 text-base md:text-lg leading-relaxed text-center">
            {message}
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-8 px-6 py-3 bg-[#E86A1C] hover:bg-[#F77F4D] text-white font-semibold rounded-lg shadow-md transition"
          >
            Kembali ke Halaman Utama
          </button>
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

export default ThanksApp;
