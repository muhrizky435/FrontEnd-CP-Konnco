import React from "react";
import { motion } from "framer-motion";

void motion;
const KonncoFooter = ({
  fadeUp,
  fadeLeft,
  fadeRight,
  footerRef,
  footerInView,
  logoWhite,
  logoEmail,
  logoFB,
  logoIG,
  logoLink,
  logoTiktok,
}) => (
  <motion.footer
    ref={footerRef}
    variants={fadeUp}
    initial="hidden"
    animate={footerInView ? "visible" : "hidden"}
    className="w-full bg-[#18253A] text-white pt-12 pb-8 mt-10"
  >
    <div className="max-w-full mx-auto px-6">
      <div className="flex flex-col md:flex-row md:justify-between gap-12">
        {/* Left: Logo & Address */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          animate={footerInView ? "visible" : "hidden"}
          className="flex-1 min-w-[500px]"
        >
          <img
            src={logoWhite}
            alt="Konnco Studio Logo"
            className="w-18 h-16 mb-6"
          />
          <div className="text-2xl font-bold mb-2 text-left">Konnco Studio</div>
          <div className="text-base mb-4 leading-relaxed text-[#E5E7EB] text-left">
            Ruko, Pd. Permai Taman Tirta 2 No.18, Ngentak,<br />
            Bangunjiwo, Kec. Kasihan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55184
          </div>
          <div className="flex items-center gap-3 mb-8 text-left">
            <img src={logoEmail} alt="Email" className="w-6 h-6" />
            <span className="text-base text-[#E5E7EB]">support@konnco.com</span>
          </div>
          <div className="text-[#E5E7EB] mt-10 text-base text-left">
            Konnco Studio Copyright © {new Date().getFullYear()}. All Rights Reserved.
          </div>
        </motion.div>
        {/* Middle: Menu */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={footerInView ? "visible" : "hidden"}
          className="flex-1 min-w-[180px]"
        >
          <div className="text-2xl font-bold mb-6 text-left">Menu</div>
          <ul className="space-y-4 text-lg text-left">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/blogs" className="hover:underline">Blogs</a></li>
            <li><a href="/products" className="hover:underline">Products</a></li>
            <li><a href="/careers" className="hover:underline">Careers</a></li>
            <li><a href="/contacts" className="hover:underline">Contacts</a></li>
          </ul>
        </motion.div>
        {/* Right: Social Media */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate={footerInView ? "visible" : "hidden"}
          className="flex-1 min-w-[220px]"
        >
          <div className="text-2xl font-bold mb-6 text-left">Social Media</div>
          <ul className="space-y-5 text-lg">
            <li className="flex items-center gap-4">
              <img src={logoFB} alt="Facebook" className="w-8 h-8" />
              <span>Konnco Studio</span>
            </li>
            <li className="flex items-center gap-4">
              <img src={logoIG} alt="Instagram" className="w-8 h-8" />
              <span>Konnco Studio</span>
            </li>
            <li className="flex items-center gap-4">
              <img src={logoLink} alt="LinkedIn" className="w-8 h-8" />
              <span>Konnco Studio</span>
            </li>
            <li className="flex items-center gap-4">
              <img src={logoTiktok} alt="TikTok" className="w-8 h-8" />
              <span>Konnco Studio</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  </motion.footer>
);

export default KonncoFooter;