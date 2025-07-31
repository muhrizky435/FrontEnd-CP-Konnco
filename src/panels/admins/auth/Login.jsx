import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import KonncoFooter from "../../../components/KonncoFooter";
import {
  logoWhite,
  logoEmail,
  logoFB,
  logoIG,
  logoTiktok,
  logoLink,
} from "../../../assets/img";

const AdminLogin = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { ref: footerRef, inView: footerInView } = useInView();

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timeout);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/admins/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();
      console.log("Login result:", result);

      if (!response.ok) {
        setError(result.message || "Login gagal");
        return;
      }

      localStorage.setItem(
        "adminToken",
        JSON.stringify({
          id: result.data.id,
          token: result.data.token,
          name: result.data.name, 
        })
      );
      console.log("ADMIN TOKEN SET:", JSON.parse(localStorage.getItem("adminToken")));


      navigate("/panels/admins/dashboard");
    } catch {
      setError("Terjadi kesalahan saat login.");
    }
  };

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

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white mt-28">
      <AdminNavbar />
      <main className="flex-1 flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-xl bg-white p-8">
          <h2 className="text-center text-2xl font-bold mb-6">
            Welcome back, Admin
          </h2>

          {error && (
            <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
          )}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-left"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-500 rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 text-left"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-gray-500 rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div
            onClick={() => alert("Silakan hubungi developer untuk reset akun.")}
            className="text-sm text-orange-500 mb-4 text-right cursor-pointer hover:underline"
          >
            Lupa Akun?
          </div>

          {/* <Link
            to="/admins/forgot-password"
            className="text-sm text-orange-500 mb-4 text-right block hover:underline"
          >
            Lupa Akun?
          </Link> */}

          <button
            type="submit"
            className="w-full bg-[#E86A1C] text-white font-semibold py-2 rounded hover:bg-[#cf5b10] shadow-[0_4px_0_0_#b45309] transition"
          >
            Login
          </button>
        </form>
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
};

export default AdminLogin;
