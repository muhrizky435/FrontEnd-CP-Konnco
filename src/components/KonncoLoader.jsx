import React from "react";
import { motion } from "framer-motion";
import logoKonnco from "../assets/img/logo-konnco.png";

const KonncoLoader = () => {
  const particles = Array.from({ length: 12 });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] overflow-hidden">

      {/* Efek latar belakang dinamis */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)]"
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glow belakang logo (lapisan luar) */}
      <motion.div
        className="absolute w-56 h-56 rounded-full bg-orange-500 blur-[100px] opacity-20"
        animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glow belakang logo (lapisan dalam) */}
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-orange-400 blur-3xl opacity-30"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Partikel berkilau */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-orange-500 rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]"
          initial={{
            x: Math.cos((i / particles.length) * 2 * Math.PI) * 80,
            y: Math.sin((i / particles.length) * 2 * Math.PI) * 80,
            opacity: 0
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Logo dengan animasi futuristik */}
      <motion.img
        src={logoKonnco}
        alt="Konnco Studio Logo"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1.05, 1],
          opacity: [0, 1, 1],
          rotate: [0, 360]
        }}
        transition={{
          scale: { duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
          opacity: { duration: 1, ease: "easeOut" },
          rotate: { duration: 6, repeat: Infinity, ease: "linear" }
        }}
        className="w-32 h-32 relative z-10 drop-shadow-[0_0_25px_rgba(232,106,28,0.8)]"
      />
    </div>
  );
};


void motion;
export default KonncoLoader;
