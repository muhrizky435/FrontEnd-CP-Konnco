import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";

const LANGUAGES = [
  { code: "ID" },
  { code: "EN" },
  { code: "JP" },
  { code: "KR" },
  { code: "CN" },
];

void motion;

const NAVS = [
  { key: "home", label: "Home", path: "/" },
  { key: "about", label: "About Us", path: "/about" },
  { key: "blogs", label: "Blogs", path: "/blogs" },
  { key: "product", label: "Product", path: "/product" },
  { key: "contact", label: "Contact", path: "/contact" },
  { key: "careers", label: "Careers", path: "/careers" },
];

const KonncoNavbar = ({
  fadeUp,
  fadeLeft,
  logoKonnco,
  drawerOpen,
  setDrawerOpen,
  drawerRef,
}) => {
  const [showLang, setShowLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const langRef = useRef(null);
  const location = useLocation();

  const pathMatchers = [
    { regex: /^\/detail_blogs(\/.*)?$/, mapped: "/blogs" },
    { regex: /^\/blogs(\/.*)?$/, mapped: "/blogs" },

    { regex: /^\/detail_product(\/.*)?$/, mapped: "/product" },
    { regex: /^\/product(\/.*)?$/, mapped: "/product" },

    { regex: /^\/detail_careers(\/.*)?$/, mapped: "/careers" },
    { regex: /^\/careers_apply(\/.*)?$/, mapped: "/careers" },
    { regex: /^\/careers(\/.*)?$/, mapped: "/careers" },

    { regex: /^\/about$/, mapped: "/about" },
    { regex: /^\/contact$/, mapped: "/contact" },
    { regex: /^\/$/, mapped: "/" },
  ];

  const matchedPath =
    pathMatchers.find((entry) => entry.regex.test(location.pathname))?.mapped ||
    "/";

  const activeNav = NAVS.find((nav) => nav.path === matchedPath)?.key || "home";

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setShowLang(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigation links
  const renderNavLinks = () =>
    NAVS.map((nav) => (
      <Link
        key={nav.key}
        to={nav.path}
        className={`block py-2 px-2 font-semibold transition border-b-2 ${
          activeNav === nav.key
            ? "text-orange-600 border-orange-600"
            : "text-black border-transparent hover:text-orange-600 hover:border-orange-600"
        }`}
        onClick={() => setDrawerOpen(false)}
      >
        {nav.label}
      </Link>
    ));

  return (
    <motion.header
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.5 }}
      className="flex justify-between items-center w-full px-4 md:px-10 pt-2 pb-5 bg-white sticky top-0 z-30 border-b border-orange-200"
    >
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-3 group">
        <motion.img
          src={logoKonnco}
          alt="Konnco Studio Logo"
          className="h-12 mr-2 transition-transform group-hover:scale-105"
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
        />
        <div className="flex flex-col">
          <motion.div
            className="font-bold text-2xl text-gray-900 tracking-wide leading-tight text-left"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.9 }}
          >
            Konnco Studio
          </motion.div>
          <motion.div
            className="text-xs text-orange-600 tracking-widest font-medium mt-1 text-left"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            Execute Better
          </motion.div>
        </div>
      </Link>

      {/* Hamburger for Mobile */}
      <button
        className="md:hidden p-3 rounded-xl bg-white shadow hover:shadow-lg transition ml-auto"
        aria-label="Open navigation"
        onClick={() => setDrawerOpen(true)}
      >
        <HiMenu className="text-3xl text-gray-800" />
      </button>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {renderNavLinks()}
        {/* Language dropdown */}
        <div className="relative inline-block text-center" ref={langRef}>
          {/* Selected Language Trigger */}
          <button
            onClick={() => setShowLang((v) => !v)}
            className="flex items-center justify-center gap-1 text-black font-medium focus:outline-none"
          >
            <span className="text-sm">{selectedLang.code}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                showLang ? "rotate-180 text-orange-500" : "text-orange-500"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown */}
          {showLang && (
            <ul className="absolute right-0 mt-2 bg-white rounded-lg border border-black px-4 py-2 z-50 w-20 text-sm shadow-md">
              {LANGUAGES.map((lang) => (
                <li
                  key={lang.code}
                  onClick={() => {
                    setSelectedLang(lang);
                    setShowLang(false);
                  }}
                  className={`cursor-pointer text-center py-1 border-b border-gray-300 last:border-b-0 hover:font-bold ${
                    lang.code === selectedLang.code ? "font-bold" : ""
                  }`}
                >
                  {lang.code}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
      {/* Mobile Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full z-50 bg-orange-50 transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        } w-[80vw] max-w-xs md:hidden rounded-l-3xl shadow-2xl flex flex-col overflow-y-auto`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <div className="flex items-center gap-3">
            <img src={logoKonnco} alt="Konnco Studio" className="h-10" />
            <span className="font-bold text-xl text-orange-600">
              Konnco Studio
            </span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-orange-600 text-2xl font-bold"
            aria-label="Close drawer"
          >
            ×
          </button>
        </div>

        {/* Drawer Search */}
        <div className="px-6 pb-4">
          <input
            type="text"
            placeholder="Search Here ..."
            className="w-full rounded-lg border border-gray-200 px-4 py-2 focus:outline-none"
          />
        </div>

        {/* Drawer Navigation */}
        <nav className="flex flex-col gap-2 px-6">{renderNavLinks()}</nav>

        {/* Contact Info */}
        <div className="mt-auto px-6 pb-6">
          <div className="text-orange-600 font-semibold mb-1">
            support@konnco.com
          </div>
          <div className="text-orange-600 mb-3 text-sm">+62 822 1234 5678</div>
          <div className="flex gap-4 text-orange-600 text-2xl">
            <i className="fab fa-instagram"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-linkedin"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
      </div>
      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-transparent z-40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </motion.header>
  );
};

export default KonncoNavbar;
