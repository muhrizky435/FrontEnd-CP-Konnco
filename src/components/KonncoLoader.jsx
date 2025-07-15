import React from "react";
import { motion } from "framer-motion";
import logoKonnco from "../assets/img/logo-konnco.png";

const KonncoLoader = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#18253A]">
    <motion.img
      src={logoKonnco}
      alt="Konnco Studio Logo"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: [0.7, 1.1, 1], opacity: [0, 1, 1] }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="w-32 h-32"
    />
  </div>
);

void motion;

export default KonncoLoader;