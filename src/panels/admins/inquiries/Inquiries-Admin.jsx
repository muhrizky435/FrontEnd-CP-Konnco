import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { FiFilter } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import AdminSidebar from "../../../components/AdminSidebar";
import AdminNavbar from "../../../components/AdminNavbar";
import KonncoLoader from "../../../components/KonncoLoader";
import useBreadcrumb from "../../../components/Breadcrumb";

const Inquiries = () => {
  const [Inquiries, setInquiries] = useState([]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const limit = 10;
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const breadcrumb = useBreadcrumb("Inquiries");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page !== 1) params.set("page", page);
    setSearchParams(params, { replace: true });
  }, [search, page, setSearchParams]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setLoading(true);
        const params = {
          search,
          from: dateRange.from,
          to: dateRange.to,
          page,
          limit,
        };
        const res = await axios.get("/admins/inquiries", { params });
        setInquiries(res.data?.data || []);
        setTotal(res.data?.total || 0);
      } catch (err) {
        console.error("Error fetching Inquiries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [search, page, dateRange]);

  useEffect(() => {
    setDateRange({
      from: format(range[0].startDate, "yyyy-MM-dd"),
      to: format(range[0].endDate, "yyyy-MM-dd"),
    });
  }, [range]);

  const totalPages = Math.ceil(total / limit);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (loading) return <KonncoLoader />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-16 px-2 sm:px-6 md:px-6 py-4">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="md:ml-60 flex-1 flex flex-col">
        <AdminNavbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="px-4 sm:px-6 md:px-4 py-6">
          <div className="text-sm text-gray-400 mb-4 text-left">{breadcrumb}</div>
          <h1 className="text-xl font-bold mb-6 text-left">Pertanyaan</h1>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-4 w-full">
            <input
              type="text"
              placeholder="Cari Pertanyaan..."
              className="w-full max-w-sm border border-gray-300 rounded-md px-4 py-2 text-sm"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

            <div className="relative">
              <input
                type="text"
                readOnly
                onClick={() => setShowDatePicker(!showDatePicker)}
                value={`${format(range[0].startDate, "dd/MM/yyyy")} - ${format(
                  range[0].endDate,
                  "dd/MM/yyyy"
                )}`}
                className="w-full max-w-sm border border-gray-300 rounded-md px-4 py-2 text-sm cursor-pointer text-center text-gray-600"
              />
              {showDatePicker && (
                <div className="absolute z-50">
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                  />
                </div>
              )}
            </div>

            <div
              className="w-10 h-10 bg-orange-500 rounded-md shadow-[0_4px_0_0_#b45309] flex items-center justify-center cursor-pointer"
            >
              <FiFilter className="text-white" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border rounded-lg">
            <table className="table w-full text-sm text-center">
              <thead className="bg-gray-100 text-gray-700">
                <tr className="border-b">
                  <th className="py-3">Pelamar</th>
                  <th className="py-3">Posisi</th>
                  <th className="py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {Inquiries.map((app) => (
                  <tr key={app.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{app.applicantName}</td>
                    <td className="py-2">{app.position}</td>
                    <td className="py-2">
                      <button
                        className="text-orange-500 hover:underline"
                        onClick={() =>
                          navigate(
                            `/admin/careers/${app.careerId}/Inquiries/${app.id}`
                          )
                        }
                      >
                        Lihat Detail &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
                {Inquiries.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center text-gray-400 py-4">
                      Tidak ada data pelamar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center p-4 text-sm text-gray-500">
              <div>
                {limit * (page - 1) + 1}-{Math.min(limit * page, total)} dari {total}
              </div>
              <div className="join">
                {pageNumbers.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`join-item btn btn-sm rounded-full w-8 h-8 p-0 text-xs ${
                      p === page ? "bg-orange-500 text-white" : ""
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Inquiries;
