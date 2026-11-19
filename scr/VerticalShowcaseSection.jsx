import React, { useState } from 'react';
import { EditorialFrame } from '../common/EditorialFrame';
import { useTheme } from '../../context/ThemeContext';

export const VerticalShowcaseSection = ({ verticalShowcase, onManageCategory, onMediaClick }) => {
  const { isDark } = useTheme();
  const verticalCategories = ['ABOUT ME', 'EXPERIENCE', 'ORGANIZATION', 'SELECTED WORKS', 'CREATIVE SPACE'];

  const [activeVerticalTab, setActiveVerticalTab] = useState('ABOUT ME');
  const [verticalAnimKey, setVerticalAnimKey] = useState(0);

  const currentVerticalContent = (verticalShowcase && verticalShowcase[activeVerticalTab]) || {
    caption: '',
    items: []
  };

  const handleTabChange = (cat) => {
    setActiveVerticalTab(cat);
    setVerticalAnimKey((prev) => prev + 1);
  };

  return (
    <section
      id="showcase"
      className={`py-20 sm:py-28 border-b transition-colors duration-500 ${
        isDark ? 'bg-[#17243A] border-[#293A52]' : 'bg-[#F3DDE3]/45 border-[#EBCFD8]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className={`text-xs uppercase tracking-[0.25em] font-semibold block mb-3 ${isDark ? 'text-[#C5A56A]' : 'text-[#5B7C99]'}`}>
              04 / Interactive Visual Index
            </span>
            <h2 className={`font-editorial text-4xl sm:text-5xl font-semibold ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
              Editorial Visual Archive
            </h2>
          </div>
          <p className={`text-sm max-w-md ${isDark ? 'text-[#C7CED8]' : 'text-[#5A514B]'}`}>
            Klik setiap pilar tipografi vertikal untuk menyingkap kurasi visual, dokumentasi kegiatan, dan ruang kreatif.
          </p>
        </div>

        {/* Interactive Vertical Typography Board */}
        <div
          className={`rounded-3xl border p-5 sm:p-8 lg:p-10 transition-colors duration-500 ${
            isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-[#FFFCF8] border-[#EBCFD8]'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Vertical Typography Selector Strips */}
            <div className="lg:col-span-5 flex flex-row items-stretch justify-between gap-2 sm:gap-3 overflow-x-auto pb-2 lg:pb-0">
              {verticalCategories.map((cat, idx) => {
                const isSelected = activeVerticalTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleTabChange(cat)}
                    className={`group relative flex-1 min-w-[62px] sm:min-w-[74px] h-[280px] sm:h-[380px] lg:h-[430px] rounded-2xl border flex flex-col items-center justify-between py-5 px-2 transition-all duration-500 ${
                      isSelected
                        ? isDark
                          ? 'bg-[#293A52] border-[#C5A56A] shadow-lg scale-[1.02]'
                          : idx % 2 === 0
                            ? 'bg-[#DCEAF4] border-[#5B7C99] shadow-md scale-[1.02]'
                            : 'bg-[#F5E9BE] border-[#2C2520]/30 shadow-md scale-[1.02]'
                        : isDark
                          ? 'bg-[#17243A] border-[#293A52] hover:border-[#C5A56A]/50'
                          : 'bg-[#FFF9F0] border-[#CFE3F2] hover:bg-[#FAF0D8]'
                    }`}
                  >
                    {/* Top Index Number */}
                    <span
                      className={`font-editorial italic text-sm font-semibold ${
                        isSelected
                          ? isDark ? 'text-[#C5A56A]' : 'text-[#2C2520]'
                          : isDark ? 'text-[#C7CED8]/60' : 'text-[#7A7069]'
                      }`}
                    >
                      0{idx + 1}
                    </span>

                    {/* Vertical Rotated Editorial Text */}
                    <span
                      className={`vertical-writing rotate-180 font-display-accent text-xs sm:text-sm tracking-[0.22em] font-semibold uppercase transition-colors ${
                        isSelected
                          ? isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'
                          : isDark ? 'text-[#C7CED8]/75 group-hover:text-[#E1E5EB]' : 'text-[#6E655F] group-hover:text-[#2C2520]'
                      }`}
                    >
                      {cat}
                    </span>

                    {/* Active Dot Indicator */}
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        isSelected
                          ? isDark ? 'bg-[#C5A56A] scale-125' : 'bg-[#2C2520] scale-125'
                          : 'bg-transparent border border-current/25'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Image Reveal Stage */}
            <div
              key={verticalAnimKey}
              className="lg:col-span-7 flex flex-col justify-between animate-mask-reveal"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span
                    className={`text-xs uppercase tracking-[0.22em] font-semibold px-3.5 py-1 rounded-full ${
                      isDark ? 'bg-[#17243A] text-[#C5A56A]' : 'bg-[#F3DDE3] text-[#2C2520]'
                    }`}
                  >
                    Active Archive: {activeVerticalTab}
                  </span>
                  <button
                    onClick={() => onManageCategory(activeVerticalTab)}
                    className={`text-xs underline underline-offset-4 ${
                      isDark ? 'text-[#D8C49A]' : 'text-[#5B7C99]'
                    }`}
                  >
                    + Tambah / Ganti Foto Kategori Ini
                  </button>
                </div>

                <p className={`font-editorial italic text-xl sm:text-2xl mb-6 ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
                  {currentVerticalContent.caption}
                </p>

                {/* Dynamic Images Grid for Selected Vertical Category */}
                {currentVerticalContent.items && currentVerticalContent.items.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentVerticalContent.items.map((media, mIdx) => (
                      <div
                        key={media.id || mIdx}
                        onClick={() => onMediaClick(media)}
                        className={`group cursor-pointer rounded-2xl overflow-hidden border p-2 transition-all hover:shadow-lg ${
                          isDark ? 'bg-[#17243A] border-[#293A52]' : 'bg-[#FFF9F0] border-[#CFE3F2]'
                        }`}
                      >
                        <EditorialFrame
                          src={media.url}
                          mediaType={media.type || 'image'}
                          alt={media.title || activeVerticalTab}
                          isDark={isDark}
                          aspectClass="aspect-[4/3]"
                          className="rounded-xl"
                        />
                        {media.title && (
                          <p className={`text-xs font-medium mt-2 px-1 ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
                            {media.title}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <EditorialFrame
                      label={`${activeVerticalTab} — Visual 01`}
                      sublabel="Unggah dokumentasi untuk kategori ini melalui Studio Admin"
                      isDark={isDark}
                      aspectClass="aspect-[4/3]"
                      className="rounded-2xl"
                    />
                    <EditorialFrame
                      label={`${activeVerticalTab} — Visual 02`}
                      sublabel="Mendukung JPG, PNG, WEBP & Video klip pendek"
                      isDark={isDark}
                      aspectClass="aspect-[4/3]"
                      className="rounded-2xl"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
