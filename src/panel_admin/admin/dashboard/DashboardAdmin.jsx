import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";

const DashboardAdmin = () => {
  const [loading, setLoading] = useState(true);

  const dummyBlog = [
    {
      id: 1,
      title: "Teknologi AI Kini Semakin Dekat dengan Kehidupan...",
      author: "Siti Rahmawati",
      category: "TECH",
    },
    {
      id: 2,
      title: "Teknologi AI Kini Semakin Dekat dengan Kehidupan...",
      author: "Siti Rahmawati",
      category: "TECH",
    },
    {
      id: 3,
      title: "Teknologi AI Kini Semakin Dekat dengan Kehidupan...",
      author: "Siti Rahmawati",
      category: "TECH",
    },
  ];

  const dummyApply = [
    {
      id: 1,
      name: "Ahmad Syaerodji",
      position: "Full-Stack Developer (JavaScript, React)",
      document: "Curriculum Vitae Ahmad Syaerodji.pdf",
    },
    {
      id: 2,
      name: "Oesman Hasbi",
      position: "Mobile Developer (React Native)",
      document: "Curriculum Vitae Oesman Hasbi.pdf",
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex mt-16 px-2 sm:px-6 md:px-6 py-4">
      <AdminSidebar />
      <div className="ml-52 flex-1 flex flex-col">
        <AdminNavbar />
        {/* nanti ganti pake state dari API */}
        <main className="px-4 sm:px-6 md:px-4 py-6">
          <h1 className="text-xl font-bold mb-6">Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-300 rounded-lg p-4">
              <p className="text-sm text-gray-500">Total Blog</p>
              <p className="text-2xl font-bold">
                20<span className="text-sm font-medium">/Minggu</span>
              </p>
            </div>
            <div className="bg-gray-300 rounded-lg p-4">
              <p className="text-sm text-gray-500">Total Apply Karir</p>
              <p className="text-2xl font-bold"> 
                20<span className="text-sm font-medium">/Bulan</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[5fr_1fr] gap-3">
            {/* Blog Table */}
            <div className="bg-white border border-gray-400 rounded-lg p-4">
              <h2 className="font-bold text-lg mb-2 text-left">
                Aktivitas Terkini
              </h2>
              <h3 className="text-sm font-medium mb-4 text-left">Blog</h3>
              <hr />
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-center">
                    <th className="py-4">Nama</th>
                    <th className="px-2">Penulis</th>
                    <th className="px-2">Kategori</th>
                    <th className="px-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyBlog.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="py-2 px-4 text-justify">{item.title}</td>
                      <td>{item.author}</td>
                      <td>
                        <span className="bg-gray-300 text-xs px-2 py-1 rounded-md">
                          {item.category}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2 justify-center pb-3 pt-3">
                          <button className="bg-[#E86A1C] text-white text-xs hover:bg-[#d45d13] px-2 py-1 rounded-md">
                            Edit
                          </button>
                          <button className="bg-red-500 text-white text-xs border hover:bg-red-600 px-2 py-1 rounded-md">
                            Delete
                          </button>
                          <button className="bg-[#304e7c] text-white text-xs border hover:bg-[#3E9FF5] px-2 py-1 rounded-md whitespace-nowrap">
                            Lihat Detail
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center mt-6">
                <button
                  onClick={() =>
                    (window.location.href = "/Panel_Admin/admin/blogs")
                  }
                  className="font-semibold flex gap-1 mt-2 group w-fit text-[#E86A1C] hover:text-[#F77F4D] transition-colors text-left"
                >
                  Lihat Selanjutnya
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </button>
              </div>
            </div>

            {/* Tim */}
            <div className=" bg-white border border-gray-400 rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3 text-left">Tim</h3>
              <ul className="text-sm space-y-1 text-justify">
                <li>Hendra Gunawan</li>
                <li>Rina Oktaviani</li>
              </ul>
            </div>
          </div>

          {/* Apply Karir */}
          <div className="bg-white border border-gray-400 rounded-lg p-4 mt-6">
            <h3 className="text-lg font-bold mb-4 text-left">Apply Karir</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-center">
                  <th className="py-2">Pelamar</th>
                  <th className="px-2">Posisi</th>
                  <th className="px-2">Dokumen</th>
                  <th className="px-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dummyApply.map((item) => (
                  <tr key={item.id} className="border-t text-justify">
                    <td className="py-2">{item.name}</td>
                    <td>{item.position}</td>
                    <td>{item.document}</td>
                    <td>
                      <button 
                        onClick={() =>
                          (window.location.href = "")
                        }
                        className="bg-[#304e7c] text-white text-xs border hover:bg-[#3E9FF5] px-2 py-1 rounded-md ml-2">
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
