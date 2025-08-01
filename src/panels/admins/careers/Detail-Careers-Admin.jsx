import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiMoneyWithdraw } from "react-icons/bi";
import AdminNavbar from "../../../components/AdminNavbar";
import AdminSidebar from "../../../components/AdminSidebar";
import KonncoLoader from "../../../components/KonncoLoader";
import api from "../../../api/axios";
import useBreadcrumb from "../../../components/Breadcrumb";

const Detail_Careers_Admin = () => {
  const { careerId } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const res = await api.get(`/admins/careers/${careerId}`);
        const data = res.data.data;
        console.log("Data career:", data);

        setCareer({
          ...data,
          requirements: data.requirements
            ? data.requirements.split("\n").filter((r) => r.trim() !== "")
            : [],
          links: [
            data.linkedInInfo || null,
            data.jobStreetInfo || null,
            data.glintsInfo || null,
          ].filter(Boolean),
          tags: data.tags ? data.tags.split(",").map(t => t.trim()) : []
        });
      } catch (error) {
        console.error("Gagal mengambil data karier:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [careerId]);

  const breadcrumb = useBreadcrumb("Detail Career", career?.title || "");

  if (loading) return <KonncoLoader />;


  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16 px-2 sm:px-6 md:px-6 py-4">
      <AdminSidebar />

      <div className="md:ml-60 flex-1 flex flex-col">
        <AdminNavbar />

        <main className="px-4 sm:px-6 md:px-4 py-6">
          <div className="text-sm text-gray-400 mb-4 text-left">{breadcrumb}</div>
          
           <h1 className="text-xl font-bold mb-6 text-left">Detail Career</h1>
          <button
            className="text-orange-500 font-semibold text-sm mb-4 hover:underline flex items-center gap-1"
            onClick={() => window.history.back()}
          >
            <span className="text-lg">&larr;</span>
            Kembali
          </button>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Kiri - Konten Utama */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{career.title}</h1>

              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <BiMoneyWithdraw className="text-orange-500 text-xl" />
                <span>{career.salary}</span>
                <span>/ Bulan</span>
              </div>

              <p className="text-sm text-justify leading-relaxed mb-6">
                {career.description}
              </p>

              {career.requirements.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Tanggung Jawab:</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm leading-relaxed">
                    {career.requirements.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Kanan - Sidebar */}
            <div className="w-full md:w-72 flex flex-col gap-6">
              {career.tags && career.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm mb-2">Persyaratan</h3>
                  <div className="flex flex-wrap gap-2">
                    {career.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm shadow-[0_4px_0_0_#b45309]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {career.links.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm mb-2">Info Lainnya</h3>
                  <div className="flex flex-wrap gap-2">
                    {career.links.map((link, idx) => (
                      <span
                        key={idx}
                        className="border border-orange-500 text-gray-700 px-3 py-1 rounded-lg text-sm"
                      >
                        {link}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Detail_Careers_Admin;
