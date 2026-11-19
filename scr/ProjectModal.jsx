import React, { useState } from 'react';
import { X } from 'lucide-react';
import { EditorialFrame } from '../common/EditorialFrame';
import { useTheme } from '../../context/ThemeContext';

export const ProjectModal = ({ project, onClose }) => {
  const { isDark } = useTheme();
  const [activeCarouselIdx, setActiveCarouselIdx] = useState(0);

  if (!project) return null;

  const allSlides = [
    ...(project.coverImage ? [{ url: project.coverImage, type: 'image', caption: 'Cover Project' }] : []),
    ...(project.gallery || [])
  ];
  const currentSlide = allSlides[activeCarouselIdx];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-reveal-up"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-9 border shadow-2xl ${
          isDark
            ? 'bg-[#17243A] border-[#C5A56A]/50 text-[#E1E5EB]'
            : 'bg-[#FFFCF8] border-[#CFE3F2] text-[#2C2520]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Tutup Detail Project"
          className={`absolute top-5 right-5 p-2.5 rounded-full border ${
            isDark ? 'bg-[#202F46] border-[#293A52] text-[#E1E5EB]' : 'bg-[#F3DDE3] border-[#EBCFD8] text-[#2C2520]'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <span
          className={`inline-block text-xs uppercase tracking-widest font-semibold px-3.5 py-1 rounded-full mb-3 ${
            isDark ? 'bg-[#202F46] text-[#C5A56A]' : 'bg-[#DCEAF4] text-[#2C2520]'
          }`}
        >
          {project.category}
        </span>

        <h3 className="font-editorial text-3xl sm:text-4xl font-semibold mb-2 pr-10">
          {project.title}
        </h3>

        <p className={`font-editorial italic text-lg mb-6 ${isDark ? 'text-[#D8C49A]' : 'text-[#5B7C99]'}`}>
          Peran: {project.role}
        </p>

        {/* Carousel / Cover Media Showcase */}
        <div className="mb-7">
          <div className="rounded-2xl overflow-hidden border border-current/15 relative">
            <EditorialFrame
              src={currentSlide?.url}
              mediaType={currentSlide?.type || 'image'}
              alt={project.title}
              label={project.title}
              sublabel="Unggah cover & dokumentasi project melalui Studio Admin"
              isDark={isDark}
              aspectClass="aspect-[16/9]"
            />

            {allSlides.length > 1 && (
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  onClick={() => setActiveCarouselIdx((prev) => (prev - 1 + allSlides.length) % allSlides.length)}
                  className="px-3 py-1.5 rounded-full bg-black/70 text-white text-xs hover:bg-black/90 transition-colors"
                >
                  Prev
                </button>
                <span className="px-2.5 py-1 rounded-full bg-black/70 text-white text-xs">
                  {activeCarouselIdx + 1} / {allSlides.length}
                </span>
                <button
                  onClick={() => setActiveCarouselIdx((prev) => (prev + 1) % allSlides.length)}
                  className="px-3 py-1.5 rounded-full bg-black/70 text-white text-xs hover:bg-black/90 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-[#FFF9F0] border-[#F5E9BE]'}`}>
            <h4 className={`font-editorial text-xl font-semibold mb-2 ${isDark ? 'text-[#D8C49A]' : 'text-[#2C2520]'}`}>
              Deskripsi Project
            </h4>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-[#C7CED8]' : 'text-[#4A423C]'}`}>
              {project.description}
            </p>
          </div>

          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-[#F3DDE3]/50 border-[#EBCFD8]'}`}>
            <h4 className={`font-editorial text-xl font-semibold mb-2 ${isDark ? 'text-[#D8C49A]' : 'text-[#2C2520]'}`}>
              Proses Pengerjaan
            </h4>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-[#C7CED8]' : 'text-[#4A423C]'}`}>
              {project.process}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
