import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EditorialFrame } from '../common/EditorialFrame';
import { useTheme } from '../../context/ThemeContext';

export const ProjectsSection = ({ projects, onProjectSelect }) => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const projectCategories = [
    'All',
    'E-Commerce Management',
    'Digital Marketing',
    'Social Media Management',
    'Content Creation',
    'Live Commerce',
    'Organization & Event Management',
    'Creative Editing & AI Animation'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? (projects || [])
    : (projects || []).filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      className={`py-20 sm:py-28 border-b transition-colors duration-500 ${
        isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-[#FFF9F0] border-[#CFE3F2]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <span className={`text-xs uppercase tracking-[0.25em] font-semibold block mb-3 ${isDark ? 'text-[#C5A56A]' : 'text-[#5B7C99]'}`}>
              05 / Curated Portfolio
            </span>
            <h2 className={`font-editorial text-4xl sm:text-5xl font-semibold ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
              Selected Works
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((cat) => {
              const isCatActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
                    isCatActive
                      ? isDark
                        ? 'bg-[#C5A56A] border-[#C5A56A] text-[#17243A] font-semibold'
                        : 'bg-[#2C2520] border-[#2C2520] text-[#FFF9F0]'
                      : isDark
                        ? 'bg-[#17243A] border-[#293A52] text-[#C7CED8] hover:border-[#C5A56A]/50'
                        : 'bg-[#FFFCF8] border-[#CFE3F2] text-[#5A514B] hover:bg-[#DCEAF4]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Editorial Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-7">
          {filteredProjects.map((project, idx) => {
            const isFeatureWide = idx % 3 === 0;
            const colSpanClass = isFeatureWide ? 'md:col-span-7' : 'md:col-span-5';
            const aspectClass = isFeatureWide ? 'aspect-[16/10]' : 'aspect-[4/3]';

            const cardLightBg = [
              'bg-[#FFFCF8] border-[#CFE3F2]',
              'bg-[#F3DDE3]/60 border-[#EBCFD8]',
              'bg-[#FAF0D8] border-[#F5E9BE]'
            ];

            return (
              <article
                key={project.id || idx}
                onClick={() => onProjectSelect(project)}
                className={`${colSpanClass} group cursor-pointer rounded-3xl p-5 sm:p-6 border flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl ${
                  isDark
                    ? 'bg-[#17243A] border-[#293A52] hover:border-[#C5A56A]/60'
                    : `${cardLightBg[idx % cardLightBg.length]} hover:border-[#2C2520]/25`
                }`}
              >
                <div>
                  <div className="rounded-2xl overflow-hidden mb-5 border border-current/10">
                    <EditorialFrame
                      src={project.coverImage}
                      alt={project.title}
                      label={project.category}
                      sublabel="Klik untuk melihat detail project & dokumentasi"
                      isDark={isDark}
                      aspectClass={aspectClass}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full ${
                        isDark
                          ? 'bg-[#202F46] text-[#C5A56A]'
                          : 'bg-[#DCEAF4] text-[#2C2520]'
                      }`}
                    >
                      {project.category}
                    </span>
                    <span className={`text-xs font-editorial italic ${isDark ? 'text-[#C7CED8]' : 'text-[#6E655F]'}`}>
                      {project.role}
                    </span>
                  </div>

                  <h3 className={`font-editorial text-2xl sm:text-3xl font-semibold mb-2 group-hover:underline decoration-1 underline-offset-4 ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
                    {project.title}
                  </h3>

                  <p className={`text-sm leading-relaxed line-clamp-2 ${isDark ? 'text-[#C7CED8]' : 'text-[#4A423C]'}`}>
                    {project.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-current/10 flex items-center justify-between">
                  <span className={`text-xs font-semibold flex items-center gap-1.5 ${isDark ? 'text-[#D8C49A]' : 'text-[#2C2520]'}`}>
                    Lihat Detail & Proses
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  {project.gallery && project.gallery.length > 0 && (
                    <span className={`text-xs ${isDark ? 'text-[#C7CED8]' : 'text-[#6E655F]'}`}>
                      +{project.gallery.length} Dokumentasi
                    </span>
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
