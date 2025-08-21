import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import KonncoLoader from "../../../components/KonncoLoader";
import useBreadcrumb from "../../../components/Breadcrumb";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";

const DetailInquiries = () => {
  const navigate = useNavigate();
  const { inquiryId } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const breadcrumb = useBreadcrumb("Inquiries", "Detail Inquiries");

  useEffect(() => {
      const fetchDetailInquiry = async () => {
        try {
          setLoading(true);
          const res = await api.get(
            `/admins/inquiries/${inquiryId}`
          );
          setInquiry(res.data?.data || null);
        } catch (err) {
          console.error(err);
          setInquiry(null);
        } finally {
          setLoading(false);
        }
      };
      fetchDetailInquiry();
    }, [inquiryId]);


  if (loading) return <KonncoLoader />;
  if (!inquiry)
    return (
      <div className="p-6 text-center text-red-500">
        Pesan Masuk tidak ditemukan atau minta akses untuk melihat pesan masuk.
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16 px-2 sm:px-6 md:px-6 py-4">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col md:ml-48">
        <AdminNavbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="px-4 sm:px-6 md:px-16 py-8">
          <div className="text-sm text-gray-400 mb-4 text-left">
            {breadcrumb}
          </div>

          <h1 className="text-xl font-bold mb-4 text-left">
            Detail Inquiries
          </h1>

          <button
            className="group text-orange-500 font-bold text-md flex items-center gap-1 mb-6"
            onClick={() => navigate(-1)}
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              &larr;
            </span>
            Kembali
          </button>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Dari</h3>
              <p>{inquiry.senderName}</p>
            </div>

            <div>
              <h3 className="font-semibold">Email</h3>
              <p>{inquiry.email}</p>
            </div>

            <div>
              <h3 className="font-semibold">Subjek</h3>
              <p>{inquiry.subject}</p>
            </div>

            <div>
              <h3 className="font-semibold">Pesan</h3>
              <p className="whitespace-pre-line">{inquiry.message}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailInquiries;
