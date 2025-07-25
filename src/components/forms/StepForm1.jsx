import React from "react";
import { motion } from "framer-motion";
import { POSITION_APPLY } from "./constants"; 

void motion;
const Step1 = ({ formData, setFormData, onNext }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    onNext({ ...formData });
  };

  return (
    <motion.form
      onSubmit={(e) => {
        e.preventDefault();
        handleNext();
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-center font-bold text-lg md:text-xl mb-4">
        Biodata & Posisi
      </h2>

      <div className="bg-white rounded-2xl px-6 py-4">
        <h3 className="text-lg font-semibold text-left mb-2">Biodata</h3>

        <div className="space-y-4 text-left">
          <label className="block text-sm">Nama</label>
          <input
            name="applicantName"
            type="text"
            className="w-full border border-gray-300 px-2 py-2 rounded"
            value={formData.applicantName || ""}
            onChange={handleChange}
            required
          />

          <label className="block text-sm mt-3">Email</label>
          <input
            name="email"
            type="email"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={formData.email || ""}
            onChange={handleChange}
            required
          />

          <label className="block text-sm mt-3">Nomor HP</label>
          <input
            name="phoneNumber"
            type="tel"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={formData.phoneNumber || ""}
            onChange={handleChange}
            required
          />
        </div>

        <h3 className="text-lg font-semibold text-left mb-2 mt-4">Posisi</h3>
        <label className="block mb-1 text-sm text-left">Posisi yang dilamar</label>
        <select
          name="positionApply"
          className="w-full border border-gray-300 px-3 py-2 rounded"
          value={formData.positionApply || ""}
          onChange={handleChange}
          required
        >
          <option value="">-- Pilih Posisi --</option>
          {POSITION_APPLY.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={() => window.history.back()}
          type="button"
          className="font-semibold flex items-center gap-1 mt-2 group w-fit text-[#17253A] hover:text-[#1E3A5F] transition-colors"
        >
          <span className="ml-1 group-hover:-translate-x-1 transition-transform">
            &larr;
          </span>
          Kembali
        </button>
        <button
          type="submit"
          className="font-semibold flex items-center gap-1 mt-2 group w-fit text-[#E86A1C] hover:text-[#F77F4D] transition-colors"
        >
          Selanjutnya
          <span className="ml-1 group-hover:translate-x-1 transition-transform">
            &rarr;
          </span>
        </button>
      </div>
    </motion.form>
  );
};

export default Step1;
