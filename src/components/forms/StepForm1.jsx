import React from "react";
import { motion } from "framer-motion";

void motion;
const Step1 = ({ formData, setFormData, onNext }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    onNext({ ...formData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-center font-bold text-lg md:text-xl mb-4">
        Biodata & Posisi{" "}
      </h2>
      <div className="bg-white rounded-2xl px-6 py-4">
        <h3 className="text-lg font-semibold text-left mb-2">Biodata</h3>
        <div className="space-y-4 text-left">
          <label className="block text-sm">Nama</label>
          <input
            name="name"
            type="text"
            className="w-full border border-gray-300 px-2 py-2 rounded"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-4 text-left">
          <label className="block mt-3 text-sm">Email</label>
          <input
            name="email"
            type="email"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={formData.email || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-4 text-left">
          <label className="block mt-3 text-sm">Nomor HP</label>
          <input
            name="phone"
            type="tel"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={formData.phone || ""}
            onChange={handleChange}
          />
        </div>

        <h3 className="text-lg font-semibold text-left mb-2 mt-3" >Posisi</h3>
        <div className="space-y-4 text-left">
          <label className="block mb-1 text-sm">Posisi yang dilamar</label>
          <input
            name="position"
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={formData.position || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={() => window.history.back()}
          className="font-semibold flex items-center gap-1 mt-2 group w-fit text-[#17253A] hover:text-[#1E3A5F] transition-colors"
        >
          <span className="ml-1 group-hover:-translate-x-1 transition-transform">
            &larr;
          </span>
          Kembali
        </button>
        <button
          onClick={handleNext}
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
