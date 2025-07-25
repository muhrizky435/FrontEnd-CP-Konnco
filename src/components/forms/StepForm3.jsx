import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Step3 = ({ formData, setFormData, onBack, careerId }) => {
  console.log("CareerId yang dipakai:", careerId);
  const [cvFile, setCvFile] = useState(formData.cv || null);
  const [message, setMessage] = useState(formData.message || "");
  const [agreement, setAgreement] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCvFile(file);
    setFormData({ ...formData, cv: file, message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreement || !cvFile) {
      alert("Pastikan Anda setuju dan sudah upload CV.");
      return;
    }

    try {
      const payload = new FormData();

      // Data utama
      payload.append("applicantName", formData.applicantName);
      payload.append("email", formData.email);
      payload.append("phoneNumber", formData.phoneNumber);
      payload.append("educationLevel", formData.educationLevel);
      payload.append("instituteName", formData.instituteName);
      payload.append("message", message);

      // Industry (nested)
      if (formData.companyName?.trim()) {
        payload.append("industry[companyName]", formData.companyName.trim());
      }

      if (formData.position?.trim()) {
        payload.append("industry[position]", formData.position.trim());
      } else if (formData.positionApply?.trim()) {
        payload.append("industry[position]", formData.positionApply.trim());
      }

      if (formData.lengthOfService?.trim()) {
        payload.append("industry[lengthOfService]", formData.lengthOfService);
      }

      // Skills (array)
      if (formData.skills && Array.isArray(formData.skills)) {
        formData.skills.forEach((skill) => {
          if (skill?.trim()) {
            payload.append("skills", skill.trim());
          }
        });
      }

      // CV (PDF file)
      payload.append("cv", cvFile);

      const response = await fetch(
        `http://localhost:3000/api/v1/careers/${careerId}/applications`,
        {
          method: "POST",
          body: payload,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error(result);
        alert("Gagal mengirim lamaran: " + result.message);
        return;
      }

      if (careerId && result?.data?.id) {
        navigate(
          `/thanks?type=career&careerId=${careerId}&applicationId=${result.data.id}`
        );
      } else {
        console.error("Career ID atau Application ID tidak tersedia!");
      }
    } catch (err) {
      console.error("Error saat submit:", err);
      alert("Terjadi kesalahan saat mengirim lamaran.");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-center font-bold text-xl md:text-2xl">
        Curriculum Vitae
      </h2>

      <div className="mt-6 text-left">
        <label htmlFor="message" className="block font-semibold mb-2">
          Pesan
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Tulis pesan Anda di sini..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setFormData({ ...formData, message: e.target.value });
          }}
        />
      </div>

      <div className="text-left">
        <label className="block font-semibold mb-2">Upload CV</label>
        <label
          htmlFor="cv-upload"
          className="flex justify-center items-center w-full h-52 border-2 border-dashed border-gray rounded-lg bg-gray-100 cursor-pointer"
        >
          <div className="text-center text-6xl text-gray-500 font-bold">+</div>
          <input
            id="cv-upload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
            name="cv"
          />
        </label>

        {cvFile && (
          <div className="mt-4 border border-[#E86A1C] rounded-md px-4 py-2 bg-gray-100 flex items-center">
            <div className="text-sm text-black-900">CV - {cvFile.name}</div>
          </div>
        )}
      </div>

      <p className="text-sm text-red-500 text-left italic" >* Format File Harus PDF</p>
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          checked={agreement}
          onChange={(e) => setAgreement(e.target.checked)}
          className="mt-1"
        />
        <label className="text-sm">Saya menyatakan bahwa data ini benar</label>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="font-semibold flex item-center gap-1 mt-2 group w-fit text-[#17253A] hover:text-[#1E3A5F] transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            &larr;
          </span>
          Sebelumnya
        </button>
        <button
          type="submit"
          disabled={!cvFile || !agreement}
          className={`px-6 py-2 rounded-md text-black font-semibold shadow ${
            cvFile && agreement
              ? "bg-[#E86A1C] hover:bg-[#F77F4D] text-white shadow-[0_4px_0_0_#b45309]"
              : "bg-[#17253A] cursor-not-allowed text-white"
          }`}
        >
          Kirim
        </button>
      </div>
    </motion.form>
  );
};

void motion;

export default Step3;
