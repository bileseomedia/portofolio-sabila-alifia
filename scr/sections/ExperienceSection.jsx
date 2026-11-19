import React from 'react';
import { Eye } from 'lucide-react';
import { EditorialFrame } from '../common/EditorialFrame';
import { useTheme } from '../../context/ThemeContext';

export const ExperienceSection = ({ experiences, onMediaClick }) => {
  const { isDark } = useTheme();

  return (
    <section
      id="experience"
      className={`py-20 sm:py-28 border-b transition-colors duration-500 ${
        isDark ? 'bg-[#17243A] border-[#293A52]' : 'bg-[#DCEAF4]/35 border-[#CFE3F2]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className={`text-xs uppercase tracking-[0.25em] font-semibold block mb-3 ${isDark ? 'text-[#C5A56A]' : 'text-[#5B7C99]'}`}>
              02 / Professional & Practical Journey
            </span>
            <h2 className={`font-editorial text-4xl sm:text-5xl font-semibold ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
              My Experience
            </h2>
          </div>
          <p className={`text-sm max-w-md leading-relaxed ${isDark ? 'text-[#C7CED8]' : 'text-[#5A514B]'}`}>
            Pengalaman praktis di bidang operasional e-commerce, live streaming, penulisan artikel, serta strategi konten media sosial.
          </p>
        </div>

        {/* Interactive Editorial Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(experiences || []).map((exp, index) => {
            const lightBgStyles = [
              'bg-[#FFFCF8] border-[#CFE3F2]',
              'bg-[#FAF0D8] border-[#F5E9BE]',
              'bg-[#F3DDE3]/70 border-[#EBCFD8]'
            ];

            return (
              <article
                key={exp.id || index}
                className={`group rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                  isDark
                    ? 'bg-[#202F46] border-[#293A52] hover:border-[#C5A56A]/60'
                    : `${lightBgStyles[index % lightBgStyles.length]} hover:border-[#2C2520]/25`
                }`}
              >
                <div>
                  {/* Index Number & Period */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span
                      className={`font-editorial italic text-2xl font-semibold ${
                        isDark ? 'text-[#C5A56A]' : 'text-[#5B7C99]'
                      }`}
                    >
                      0{index + 1}.
                    </span>
                    <span
                      className={`text-[11px] px-3 py-1 rounded-full font-medium ${
                        isDark
                          ? 'bg-[#17243A] text-[#C7CED8] border border-[#293A52]'
                          : 'bg-[#FFF9F0] text-[#5A514B] border border-[#2C2520]/10'
                      }`}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Optional Experience Documentation Image */}
                  {exp.mediaUrl && (
                    <div
                      onClick={() => onMediaClick({ url: exp.mediaUrl, type: exp.mediaType || 'image', title: exp.role, caption: exp.company })}
                      className="mb-5 rounded-2xl overflow-hidden cursor-pointer border border-current/10"
                    >
                      <EditorialFrame
                        src={exp.mediaUrl}
                        mediaType={exp.mediaType}
                        alt={exp.role}
                        isDark={isDark}
                        aspectClass="aspect-[16/10]"
                      />
                    </div>
                  )}

                  {/* Role & Company */}
                  <h3 className={`font-editorial text-2xl font-semibold mb-1.5 ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
                    {exp.role}
                  </h3>
                  <p className={`text-xs font-medium mb-4 ${isDark ? 'text-[#D8C49A]' : 'text-[#5B7C99]'}`}>
                    {exp.company}
                  </p>

                  <p className={`text-sm leading-relaxed ${isDark ? 'text-[#C7CED8]' : 'text-[#4A423C]'}`}>
                    {exp.description}
                  </p>
                </div>

                {/* Subtle Bottom Accent Bar */}
                <div className="pt-6 mt-6 border-t border-current/10 flex items-center justify-between">
                  <span className={`text-[11px] uppercase tracking-widest ${isDark ? 'text-[#C7CED8]/70' : 'text-[#7A7069]'}`}>
                    {exp.mediaUrl ? 'Dokumentasi Tersedia' : 'Editable via Admin'}
                  </span>
                  {exp.mediaUrl && (
                    <button
                      onClick={() => onMediaClick({ url: exp.mediaUrl, type: exp.mediaType || 'image', title: exp.role, caption: exp.company })}
                      className={`text-xs font-medium flex items-center gap-1 ${isDark ? 'text-[#C5A56A]' : 'text-[#2C2520]'}`}
                    >
                      <Eye className="w-3.5 h-3.5" /> Lihat Foto
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
