import React from "react";
import { Link } from "react-router-dom";
import KonncoNavbar from "../../../components/AdminNavbar";
import KonncoFooter from "../../../components/KonncoFooter";
import {
  logoWhite,
  logoEmail,
  logoFB,
  logoIG,
  logoTiktok,
  logoLink,
} from "../../../assets/img";

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white mt-32">
      <KonncoNavbar />

      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-xl w-full p-8 border border-gray-300 rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold mb-4">Lupa Akun Admin?</h2>
          <p className="text-gray-700 mb-6 text-center">
            Untuk saat ini, reset akun admin dilakukan secara manual.
            <br />
            Silakan hubungi developer atau admin utama untuk bantuan.
          </p>

          <Link
            to="/panels/admins/auth/login"
            className="inline-block mt-4 text-orange-500 hover:underline"
          >
            Kembali ke Login
          </Link>
        </div>
      </main>

      <KonncoFooter
        logoWhite={logoWhite}
        logoEmail={logoEmail}
        logoFB={logoFB}
        logoIG={logoIG}
        logoLink={logoLink}
        logoTiktok={logoTiktok}
      />
    </div>
  );
};

export default ForgotPasswordPage;
