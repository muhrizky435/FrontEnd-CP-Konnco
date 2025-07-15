import React, { useState } from "react";
import { motion } from "framer-motion";

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
          <label className="block text-sm mb-1 text-left">Jenjang</label>
          <input
            name="jenjang"
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={formData.jenjang || ""}
            onChange={(e) =>
              setFormData({ ...formData, jenjang: e.target.value })
            }
            required
          />
          <label className="block text-sm mt-4 mb-1 text-left">
            Nama Institusi
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={formData.educationInstitution || ""}
            onChange={(e) =>
              setFormData({ ...formData, educationInstitution: e.target.value })
            }
            required
          />
        </div>

        {/* Pengalaman Kerja */}
        <h3 className="text-lg font-semibold text-left mb-2 mt-6">
          Pengalaman Kerja
        </h3>
        <div className="space-y-4 text-left ">
          <label className="block text-sm font-medium mb-2 mt-3">
            Nama Perusahaan
          </label>
          <input
            name="namaPerusahaan"
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
            value={formData.namaPerusahaan || ""}
            onChange={(e) =>
              setFormData({ ...formData, namaPerusahaan: e.target.value })
            }
          />

          <div className="flex items-center gap-2">
            <label htmlFor="jabatan" className="text-black">
              Jabatan
            </label>
            <div className="text-gray-400 text-sm">(opsional)</div>
          </div>
          <input
            name="jabatan"
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
            value={formData.jabatan || ""}
            onChange={(e) =>
              setFormData({ ...formData, workPosition: e.target.value })
            }
          />

          <div className="flex items-center gap-2">
            <label htmlFor="lamaBekerja" className="text-black">
              Lama Bekerja
            </label>
            <div className="text-gray-400 text-sm">(opsional)</div>
          </div>
          <input
            name="lamaBekerja"
            type="text"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={formData.lamaBekerja || ""}
            onChange={(e) =>
              setFormData({ ...formData, lamaBekerja: e.target.value })
            }
          />
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
            {skillList.map((skill) => (
              <button
                type="button"
                key={skill}
                className={`text-sm px-3 py-1 rounded transition-colors duration-200 ${
                  selectedSkills.includes(skill)
                    ? "bg-[#E86A1C] text-black shadow-[0_4px_0_0_#b45309]"
                    : "bg-white text-black hover:bg-orange-400 hover:text-black border border-black shadow-[0_4px_0_0_gray]"
                }`}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
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
          onClick={handleNext}
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
