import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import useBreadcrumb from "../../../components/Breadcrumb";
import KonncoLoader from "../../../components/KonncoLoader";
import api from "../../../api/axios";

const Edit_Admin = () => {
  const navigate = useNavigate();
  const { adminId } = useParams();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // state form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const breadcrumb = useBreadcrumb("Edit Admins");

  // Fetch data lama berdasarkan adminId
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/super-admins/admins/${adminId}`);
        const data = res.data.data;
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
        setPhoneNumber(data.phoneNumber);
      } catch (err) {
        console.error("Gagal mengambil data admin:", err);
        setErrorMessage("Gagal mengambil data admin");
        setShowErrorModal(true);
      } finally {
        setLoading(false);
      }
    };

    if (adminId) fetchAdmin();
  }, [adminId]);

  // Submit update admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validasi Nama
    if (!name.trim()) {
      setErrorMessage("Nama tidak boleh kosong");
      setShowErrorModal(true);
      setLoading(false);
      return;
    }

    // Validasi Email khusus
    if (!email.endsWith("@konnco.com")) {
      setErrorMessage("Email harus menggunakan domain @konnco.com");
      setShowErrorModal(true);
      setLoading(false);
      return;
    }

    try {
      await api.put(`/super-admins/admins/${adminId}`, {
        name,
        email,
        role,
        phoneNumber,
      });
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Gagal mengedit admin:", err);
      setErrorMessage(
        typeof err.response?.data?.message === "string"
          ? err.response.data.message
          : "Terjadi kesalahan, silakan coba lagi"
      );
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16 px-2 sm:px-8 md:px-8 py-2">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col md:ml-64">
        <AdminNavbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="px-4 sm:px-2 md:px-2 py-10 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm">{breadcrumb}</div>
          </div>

          <h1 className="text-xl font-bold mb-4 text-left">Edit Admin</h1>
          <button
            className="group text-orange-500 font-bold text-md flex items-center gap-1"
            onClick={() => window.history.go(-1)}
          >
            <span className="group-hover:-translate-x-1 transition-transform mb-1">
              &larr;
            </span>
            Kembali
          </button>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-lg shadow"
          >
            {/* Form Nama */}
            <div>
              <input
                name="nama"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Masukan Nama anda disini..."
                required
              />
            </div>

            {/* Form Email */}
            <div>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Masukan email anda disini..."
                required
              />
            </div>

            {/* form role dan No Telepon */}
            <div className="flex gap-4">
              {/* Role Dropdown */}
              <div className="w-1/2">
                <select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                  required
                >
                  <option value="" disabled>
                    Pilih Role
                  </option>
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>

              {/* No Telepon */}
              <div className="w-1/2">
                <input
                  name="phoneNumber"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                  placeholder="Masukan No telepon.."
                  required
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 shadow-[0_4px_0_0_#b45309] transition"
              >
                Edit Admin
              </button>
            </div>
          </form>

          {/* Modal Error */}
          {showErrorModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-sm p-6 text-center">
                <h2 className="text-lg font-semibold mb-4 text-red-600">
                  Gagal Mengedit
                </h2>
                <p className="text-sm text-gray-700 mb-6">{errorMessage}</p>
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="px-4 py-2 text-sm bg-red-700 text-white font-semibold rounded-md hover:bg-red-600"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}

          {/* Modal Sukses */}
          {showSuccessModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-sm p-6 text-center">
                <h2 className="text-lg font-semibold mb-4 text-orange-600">
                  Berhasil Mengedit
                </h2>
                <p className="text-sm text-gray-700 mb-6">
                  Admin telah berhasil di Edit.
                </p>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate("/panels/admins/manage/list_admins");
                  }}
                  className="px-4 py-2 text-sm bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-700"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Edit_Admin;
