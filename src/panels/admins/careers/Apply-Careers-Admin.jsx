import React, { useEffect, useState, useCallback } from "react";
import api from "../../../api/axios";
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

const ApplyCareers = () => {
  const [applications, setApplications] = useState([]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const limit = 10;
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || ""); 
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const breadcrumb = useBreadcrumb("Careers", "Applications");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    setDateRange({
      from: format(range[0].startDate, "yyyy-MM-dd"),
      to: format(range[0].endDate, "yyyy-MM-dd"),
    });
  }, [range]);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        search,
        from: dateRange.from,
        to: dateRange.to,
        page,
        limit,
      };
      const res = await api.get("/admins/careers/applications", { params });
      setApplications(res.data?.data || []);
      setTotal(res.data?.pagination?.totalData || 0);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  }, [search, dateRange, page, limit]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page !== 1) params.set("page", page);
    setSearchParams(params, { replace: true });
    fetchApplications();
  }, [search, page, dateRange, fetchApplications, setSearchParams]);

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
          <h1 className="text-xl font-bold mb-6 text-left">Lamaran Masuk</h1>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-4 w-full">
            <input
              type="text"
              placeholder="Cari nama pelamar..."
              className="w-full max-w-sm border border-gray-300 rounded-md px-4 py-2 text-sm"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
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

            {/* Tombol filter */}
            <div
              className="w-10 h-9 bg-orange-500 rounded-md shadow-[0_4px_0_0_#b45309] flex items-center justify-center cursor-pointer"
              onClick={() => {
                setSearch(searchInput);
                setPage(1);
              }}
            >
              <FiFilter className="text-white" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border rounded-lg">
            <table className="table w-full text-sm text-center">
              <thead className="bg-gray-100 text-gray-700">
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Pelamar</th>
                  <th className="py-3 px-4 text-left">Posisi</th>
                  <th className="py-3 px-4t">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, idx) => {
                  const careerId = app.careerId || (app.career && app.career.id);
                  const applicationId = app.id;
                  return (
                    <tr key={applicationId || idx} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4 text-left">{app.applicantName}</td>
                      <td className="py-2 text-justify">{app.position || "-"}</td>
                      <td className="py-2">
                        <button
                          onClick={() =>
                            navigate(
                              `/panels/admins/careers/${careerId}/applications/${applicationId}`
                            )
                          }
                          className="flex group text-sm text-orange-500 font-semibold hover:text-[#F77F4D] items-center gap-1"
                        >
                          Lihat Detail
                          <span className="ml-1 group-hover:translate-x-1 transition-transform">
                            &rarr;
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {applications.length === 0 && (
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

export default ApplyCareers;
