import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Step1 from "../components/forms/StepForm1";
import Step2 from "../components/forms/StepForm2";
import Step3 from "../components/forms/StepForm3";
import KonncoNavbar from "../components/KonncoNavbar";
import KonncoFooter from "../components/KonncoFooter";
import KonncoLoader from "../components/KonncoLoader";
import StepIndicator from "../components/forms/StepIndicator";
import toast, { Toaster } from "react-hot-toast";
import { submitCareerForm } from "../utils/api";
import { useParams } from "react-router-dom";
import {
  logoKonnco,
  logoWhite,
  logoEmail,
  logoFB,
  logoIG,
  logoTiktok,
  logoLink,
} from "../assets/img";

void motion;

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

const CareerApply = () => {
  const [step, setStep] = useState(1);
  const [setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const { careerId } = useParams();
  const { ref: footerRef, inView: footerInView } = useInView({ threshold: 0 });

  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await submitCareerForm({ ...formData, ...data });
      toast.success("Form berhasil dikirim!");
      setFormData({});
      setStep(1);
    } catch {
      toast.error("Terjadi kesalahan, coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <KonncoNavbar
        fadeUp={fadeUp}
        fadeLeft={fadeLeft}
        fadeRight={fadeRight}
        logoKonnco={logoKonnco}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        drawerRef={drawerRef}
      />
      <main className="px-4 md:px-24 py-10">
        <div className="max-w-3xl mx-auto">
          <StepIndicator currentStep={step} />
          <AnimatePresence mode="wait">
            {step === 1 && (
              <Step1
                key="step-1"
                onNext={handleNext}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {step === 2 && (
              <Step2
                key="step-2"
                onNext={handleNext}
                onBack={handleBack}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {step === 3 && (
              <Step3
                key="step-3"
                onSubmit={handleSubmit}
                onBack={handleBack}
                formData={formData}
                setFormData={setFormData}
                careerId={careerId}
              />
            )}
          </AnimatePresence>
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
      <Toaster position="top-center" />
    </div>
  );
};

export default CareerApply;
