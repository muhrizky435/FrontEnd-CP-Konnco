import React, { useState } from "react";
import { motion } from "framer-motion";
import { EDUCATION_LEVELS, LENGTH_OF_SERVICE } from "./constants";

void motion;
const skillList = [
  "React",
  "Vue",
  "NodeJS",
  "JavaScript",
  "TypeScript",
  "PHP",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Laravel",
  "Figma",
];

const Step2 = ({ formData, setFormData, onNext, onBack }) => {
  const [selectedSkills, setSelectedSkills] = useState(formData.skills || []);

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleNext = () => {
    onNext({ ...formData, skills: selectedSkills });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-center font-bold text-lg md:text-xl mb-4">
        Pendidikan, Pengalaman & Skill{" "}
      </h2>

      {/* Pendidikan Terakhir */}
      <div className="bg-white rounded-2xl px-6 py-8">
        <h3 className="text-lg font-semibold text-left mb-4">
          Pendidikan Terakhir
        </h3>
        <div className="space-y-4 text-left">
          <label className="block text-sm mb-1 font-medium text-left">
            Jenjang
          </label>
          <select
            name="educationLevel"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={formData.educationLevel || ""}
            onChange={(e) =>
              setFormData({ ...formData, educationLevel: e.target.value })
            }
            required
          >
            <option value="">-- Pilih Jenjang --</option>
            {EDUCATION_LEVELS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <label className="block text-sm mt-4 mb-1 font-medium text-left">
            Nama Institusi
          </label>
          <input
            name="instituteName"
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={formData.instituteName || ""}
            onChange={(e) =>
              setFormData({ ...formData, instituteName: e.target.value })
            }
            required
          />
        </div>

        {/* Pengalaman Kerja */}
        <h3 className="text-lg font-semibold text-left mb-4 mt-6">
          Pengalaman Kerja
        </h3>
        <div className="space-y-4 text-left ">
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium mt-2">
              Nama Perusahaan
            </label>
            <div className="text-gray-400 text-sm">(opsional)</div>
          </div>
          <input
            name="companyName"
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
            value={formData.companyName || ""}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
          />

          <div className="flex items-center gap-2">
            <label htmlFor="jabatan" className="text-black">
              Jabatan
            </label>
            <div className="text-gray-400 text-sm">(opsional)</div>
          </div>
          <input
            name="position"
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
            value={formData.position || ""}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
          />

          <div className="flex items-center gap-2">
            <label htmlFor="lamaBekerja" className="text-black">
              Lama Bekerja
            </label>
            <select
              name="lengthOfService"
              className="w-full border border-gray-300 px-3 py-2 rounded"
              value={formData.lengthOfService || ""}
              onChange={(e) =>
                setFormData({ ...formData, lengthOfService: e.target.value })
              }
            >
              <option value="">-- Pilih Lama Bekerja --</option>
              {LENGTH_OF_SERVICE.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Skill */}
        <h3 className="text-lg font-semibold text-left mb-2 mt-6">Skill</h3>
        <div className="space-y-4 text-left mt-2">
          <div className="flex items-center gap-2">
            <label htmlFor="skill" className="text-black">
              Skill
            </label>
            <div className="text-gray-400 text-sm">(pilih 1 atau lebih)</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillList.map((skills) => (
              <button
                type="button"
                key={skills}
                className={`text-sm px-3 py-1 rounded transition-colors duration-200 ${
                  selectedSkills.includes(skills)
                    ? "bg-[#E86A1C] text-black shadow-[0_4px_0_0_#b45309]"
                    : "bg-white text-black hover:bg-orange-400 hover:text-black border border-black shadow-[0_4px_0_0_gray]"
                }`}
                onClick={() => toggleSkill(skills)}
              >
                {skills}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="font-semibold flex item-center gap-1 mt-2 group w-fit text-[#17253A] hover:text-[#1E3A5F] transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            &larr;
          </span>
          Sebelumnya
        </button>
        <button
          type="button"
          onClick={() => {
            // Validasi input manual
            const { educationLevel, instituteName } = formData;
            if (!educationLevel || !instituteName) {
              alert("Pendidikan terakhir wajub diisi");
              return;
            }
            handleNext();
          }}
          className="font-semibold flex items-center gap-1 mt-2 group w-fit text-[#E86A1C] hover:text-[#F77F4D] transition-colors"
        >
          Selanjutnya
          <span className="ml-1 group-hover:translate-x-1 transition-transform">
            &rarr;
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default Step2;
