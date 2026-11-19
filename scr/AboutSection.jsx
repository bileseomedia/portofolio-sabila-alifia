import React from 'react';
import { EditorialFrame } from '../common/EditorialFrame';
import { useTheme } from '../../context/ThemeContext';

export const AboutSection = ({ about, fallbackImage }) => {
  const { isDark } = useTheme();

  return (
    <section
      id="about"
      className={`py-20 sm:py-28 border-b transition-colors duration-500 ${
        isDark ? 'bg-[#202F46] border-[#293A52]' : 'bg-[#FFFCF8] border-[#CFE3F2]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Story Frame */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div
                className={`p-3 rounded-3xl border shadow-lg ${
                  isDark ? 'bg-[#17243A] border-[#C5A56A]/35' : 'bg-[#DCEAF4] border-[#CFE3F2]'
                }`}
              >
                <EditorialFrame
                  src={about?.aboutImage || fallbackImage}
                  alt="Tentang Sabila Alifia Sundawa"
                  label="Personal Portrait"
                  sublabel="Area foto personal yang dapat diganti melalui dashboard admin"
                  isDark={isDark}
                  aspectClass="aspect-[4/4]"
                  className="rounded-2xl"
                />
              </div>

              {/* Education Stamp Card */}
              <div
                className={`mt-5 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-6 p-5 rounded-2xl shadow-lg border max-w-xs ${
                  isDark
                    ? 'bg-[#293A52] border-[#C5A56A] text-[#E1E5EB]'
                    : 'bg-[#FAF0D8] border-[#F5E9BE] text-[#2C2520]'
                }`}
              >
                <span className={`text-[11px] uppercase tracking-[0.2em] font-semibold block mb-1 ${isDark ? 'text-[#C5A56A]' : 'text-[#5B7C99]'}`}>
                  Current Education
                </span>
                <h3 className="font-editorial text-xl font-bold">
                  {about?.education?.university}
                </h3>
                <p className={`text-sm font-medium mt-0.5 ${isDark ? 'text-[#E1E5EB]' : 'text-[#3B332E]'}`}>
                  {about?.education?.major}
                </p>
                <p className={`text-xs mt-1 font-editorial italic ${isDark ? 'text-[#C7CED8]' : 'text-[#6E655F]'}`}>
                  {about?.education?.period}
                </p>
              </div>
            </div>
          </div>

          {/* Right Personal Narrative */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 lg:pl-6">
            <div className="flex items-center gap-3">
              <span className={`text-xs uppercase tracking-[0.25em] font-semibold ${isDark ? 'text-[#C5A56A]' : 'text-[#5B7C99]'}`}>
                01 / Personal Story
              </span>
              <span className={`h-[1px] w-12 ${isDark ? 'bg-[#C5A56A]/50' : 'bg-[#2C2520]/20'}`} />
            </div>

            <h2 className={`font-editorial text-4xl sm:text-5xl font-semibold leading-tight ${isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'}`}>
              {about?.title}
            </h2>

            <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-[#C7CED8]' : 'text-[#4A423C]'}`}>
              {about?.description}
            </p>

            {/* Editorial Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {[
                { title: 'Curious Learner', desc: 'Antusias mengeksplorasi dunia bisnis digital, tren pemasaran, dan kreativitas baru.' },
                { title: 'Collaborative Spirit', desc: 'Terbiasa bekerja selaras dalam tim organisasi maupun operasional brand.' },
                { title: 'Creative Communicator', desc: 'Menyampaikan pesan produk secara hangat melalui konten dan live commerce.' }
              ].map((pillar, idx) => (
                <div
                  key={pillar.title}
                  className={`p-5 rounded-2xl border transition-transform duration-300 hover:-translate-y-1 ${
                    isDark
                      ? 'bg-[#17243A] border-[#293A52]'
                      : idx === 0
                        ? 'bg-[#FFF9F0] border-[#F5E9BE]'
                        : idx === 1
                          ? 'bg-[#F3DDE3]/55 border-[#EBCFD8]'
                          : 'bg-[#DCEAF4]/55 border-[#CFE3F2]'
                  }`}
                >
                  <h4 className={`font-editorial text-lg font-semibold mb-1.5 ${isDark ? 'text-[#D8C49A]' : 'text-[#2C2520]'}`}>
                    {pillar.title}
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-[#C7CED8]' : 'text-[#5A514B]'}`}>
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
