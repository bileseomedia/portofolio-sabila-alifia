import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const SkillsSection = ({ skills }) => {
  const { isDark } = useTheme();

  return (
    <section
      id="skills"
      className={`py-20 sm:py-28 border-b transition-colors duration-500 ${
        isDark ? 'bg-[#17243A] border-[#293A52]' : 'bg-[#FAF0D8]/60 border-[#F5E9BE]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-14">
          <span className={`text-xs uppercase tracking-[0.25em] font-semibold block mb-3 ${isDark ? 'text-[#C5A56A]' : 'text-[#5B7C99]'}`}>
            06 / Capabilities & Strengths
          </span>
          <h2 className={`font-editorial text-4xl sm:text-5xl font-semibold ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
            What I Can Do
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Hard Skills Column */}
          <div
            className={`lg:col-span-7 rounded-3xl p-7 sm:p-9 border ${
              isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-[#FFFCF8] border-[#CFE3F2]'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`font-editorial text-2xl sm:text-3xl font-semibold ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
                Hard Skills
              </h3>
              <span className={`text-xs uppercase tracking-widest ${isDark ? 'text-[#C5A56A]' : 'text-[#5B7C99]'}`}>
                Practical & Creative
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {(skills?.hard || []).map((skill, idx) => (
                <div
                  key={skill}
                  className={`group p-4 rounded-2xl border flex items-center gap-3.5 transition-all duration-300 hover:-translate-y-0.5 ${
                    isDark
                      ? 'bg-[#17243A] border-[#293A52] hover:border-[#C5A56A]/60'
                      : idx % 3 === 0
                        ? 'bg-[#DCEAF4]/55 border-[#CFE3F2]'
                        : idx % 3 === 1
                          ? 'bg-[#F3DDE3]/55 border-[#EBCFD8]'
                          : 'bg-[#FFF9F0] border-[#F5E9BE]'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-editorial italic text-sm font-semibold shrink-0 ${
                      isDark ? 'bg-[#293A52] text-[#C5A56A]' : 'bg-[#FFFCF8] text-[#2C2520]'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className={`text-sm font-medium ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills Column */}
          <div
            className={`lg:col-span-5 rounded-3xl p-7 sm:p-9 border flex flex-col justify-between ${
              isDark ? 'bg-[#293A52] border-[#C5A56A]/35' : 'bg-[#F3DDE3]/75 border-[#EBCFD8]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`font-editorial text-2xl sm:text-3xl font-semibold ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
                  Soft Skills
                </h3>
                <span className={`text-xs uppercase tracking-widest ${isDark ? 'text-[#D8C49A]' : 'text-[#5A514B]'}`}>
                  Interpersonal
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {(skills?.soft || []).map((soft) => (
                  <span
                    key={soft}
                    className={`px-5 py-3 rounded-2xl text-sm font-medium border transition-transform duration-300 hover:scale-105 ${
                      isDark
                        ? 'bg-[#17243A] border-[#C5A56A]/40 text-[#E1E5EB]'
                        : 'bg-[#FFFCF8] border-[#EBCFD8] text-[#2C2520] shadow-sm'
                    }`}
                  >
                    {soft}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-current/10">
              <p className={`font-editorial italic text-lg leading-relaxed ${isDark ? 'text-[#D8C49A]' : 'text-[#3B332E]'}`}>
                “Menggabungkan pemahaman manajemen bisnis dengan kepekaan komunikasi kreatif dan kerja sama tim yang adaptif.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
