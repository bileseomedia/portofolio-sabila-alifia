import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { EditorialFrame } from '../common/EditorialFrame';
import { useTheme } from '../../context/ThemeContext';

export const HeroSection = ({ hero, onExploreClick, onConnectClick }) => {
  const { isDark } = useTheme();

  const nameParts = (hero?.name || 'Sabila Alifia Sundawa').split(' ');
  const firstName = nameParts.slice(0, 2).join(' ');
  const lastName = nameParts.slice(2).join(' ');

  return (
    <section
      id="home"
      className={`relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-28 border-b transition-colors duration-500 ${
        isDark ? 'bg-[#17243A] border-[#293A52]' : 'bg-[#FFF9F0] border-[#EBCFD8]/50'
      }`}
    >
      {/* Subtle Floating Editorial Geometric Accents */}
      <div
        className={`pointer-events-none absolute top-14 left-[6%] w-28 h-28 rounded-full animate-float-slow opacity-70 ${
          isDark ? 'bg-[#202F46] border border-[#C5A56A]/25' : 'bg-[#F5E9BE]'
        }`}
      />
      <div
        className={`pointer-events-none absolute bottom-16 left-[42%] w-20 h-20 rounded-full animate-float-reverse opacity-70 ${
          isDark ? 'bg-[#293A52] border border-[#C7CED8]/20' : 'bg-[#F3DDE3]'
        }`}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Editorial Top Issue Line */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-current/10 animate-reveal-up">
          <div className="flex items-center gap-3">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${isDark ? 'bg-[#C5A56A]' : 'bg-[#5B7C99]'}`} />
            <span className={`text-xs uppercase tracking-[0.25em] font-medium ${isDark ? 'text-[#C7CED8]' : 'text-[#6E655F]'}`}>
              Personal Branding & Editorial Portfolio
            </span>
          </div>
          <span className={`font-editorial italic text-base ${isDark ? 'text-[#D8C49A]' : 'text-[#2C2520]'}`}>
            S1 Manajemen — Pradita University
          </span>
        </div>

        {/* Asymmetric Grid: 7 Cols Typography + 5 Cols Editorial Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Oversized Artistic Typography */}
          <div className="lg:col-span-7 space-y-7 animate-reveal-up">
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-wider uppercase font-medium ${
                isDark
                  ? 'bg-[#202F46] text-[#D8C49A] border border-[#C5A56A]/35'
                  : 'bg-[#DCEAF4] text-[#2C2520]'
              }`}
            >
              <span>Hello, I am</span>
            </div>

            {/* Oversized Name & Headline */}
            <div className="space-y-4">
              <h1
                className={`font-editorial text-5xl sm:text-6xl xl:text-7xl font-semibold leading-[1.04] tracking-tight ${
                  isDark ? 'text-[#E1E5EB]' : 'text-[#2C2520]'
                }`}
              >
                {firstName}{' '}
                <span className={`italic font-normal block sm:inline ${isDark ? 'text-[#C5A56A]' : 'text-[#5B7C99]'}`}>
                  {lastName}
                </span>
              </h1>

              <p
                className={`font-editorial italic text-2xl sm:text-3xl lg:text-[34px] leading-snug pt-1 ${
                  isDark ? 'text-[#D8C49A]' : 'text-[#3B332E]'
                }`}
              >
                “{hero?.headline}”
              </p>
            </div>

            <p
              className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
                isDark ? 'text-[#C7CED8]' : 'text-[#5A514B]'
              }`}
            >
              {hero?.description}
            </p>

            {/* Editorial Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onExploreClick}
                className={`group flex items-center gap-3 px-7 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 shadow-md ${
                  isDark
                    ? 'bg-[#C5A56A] text-[#17243A] hover:bg-[#D8C49A]'
                    : 'bg-[#DCEAF4] text-[#2C2520] hover:bg-[#CFE3F2]'
                }`}
              >
                <span>Explore My Work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={onConnectClick}
                className={`flex items-center gap-2.5 px-7 py-4 rounded-full text-sm font-semibold tracking-wide border transition-all duration-300 hover:-translate-y-0.5 ${
                  isDark
                    ? 'border-[#C5A56A]/60 text-[#E1E5EB] hover:bg-[#202F46]'
                    : 'bg-[#FFFCF8] border-[#2C2520]/20 text-[#2C2520] hover:bg-[#F3DDE3]'
                }`}
              >
                <span>Let&apos;s Connect</span>
              </button>
            </div>
          </div>

          {/* Right Column: Asymmetric Arch Portrait Composition */}
          <div className="lg:col-span-5 relative animate-mask-reveal group/portrait">
            {/* Animated Offset Arch Card Behind Frame */}
            <div
              className={`absolute -top-4 -right-3 sm:-right-5 w-full h-full rounded-t-[180px] rounded-b-3xl transition-all duration-700 animate-pulse-aura group-hover/portrait:translate-x-1.5 group-hover/portrait:-translate-y-1.5 ${
                isDark ? 'bg-[#202F46] border border-[#C5A56A]/35' : 'bg-[#F3DDE3]'
              }`}
            />

            {/* Secondary Soft Offset Arch Accent */}
            <div
              className={`absolute -bottom-3 -left-3 w-4/5 h-4/5 rounded-t-[160px] rounded-b-3xl transition-all duration-700 animate-float-reverse pointer-events-none ${
                isDark ? 'bg-[#293A52]/70 border border-[#C7CED8]/20' : 'bg-[#DCEAF4]/75'
              }`}
            />

            {/* Rotating Editorial Seal Stamp Badge */}
            <div
              className={`absolute -top-7 -left-4 sm:-left-7 z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-lg border transition-transform duration-500 group-hover/portrait:scale-110 ${
                isDark
                  ? 'bg-[#17243A] border-[#C5A56A]/60 text-[#D8C49A]'
                  : 'bg-[#FFFCF8] border-[#CFE3F2] text-[#2C2520]'
              }`}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full p-1.5 animate-spin-slow">
                <defs>
                  <path id="editorialSealPath" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
                </defs>
                <text fill="currentColor" fontSize="8.4" fontWeight="600" letterSpacing="2.2">
                  <textPath href="#editorialSealPath" startOffset="0%">
                    CREATIVE • MANAGEMENT • PORTFOLIO •
                  </textPath>
                </text>
              </svg>
              <Sparkles className={`w-4 h-4 absolute ${isDark ? 'text-[#C5A56A]' : 'text-[#5B7C99]'}`} />
            </div>

            {/* Floating Soft Accent Pill on Right Edge */}
            <div
              className={`hidden sm:flex items-center gap-2 absolute top-1/2 -right-6 z-20 px-3.5 py-2 rounded-full border shadow-md animate-float-reverse ${
                isDark
                  ? 'bg-[#293A52] border-[#C5A56A]/50 text-[#E1E5EB]'
                  : 'bg-[#DCEAF4] border-[#CFE3F2] text-[#2C2520]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full animate-ping ${isDark ? 'bg-[#C5A56A]' : 'bg-[#5B7C99]'}`} />
              <span className="text-[11px] font-semibold tracking-wider uppercase">Open to Collaborate</span>
            </div>

            {/* Main Portrait Container */}
            <div
              className={`relative z-10 rounded-t-[180px] rounded-b-3xl overflow-hidden p-3 shadow-xl border transition-all duration-700 group-hover/portrait:-translate-y-1.5 ${
                isDark ? 'bg-[#293A52] border-[#C5A56A]/45' : 'bg-[#FFFCF8] border-[#CFE3F2]'
              }`}
            >
              <EditorialFrame
                src={hero?.profileImage}
                alt={hero?.name}
                label={hero?.name || "Sabila Alifia Sundawa"}
                sublabel="Foto profil utama dapat diunggah melalui Studio Admin"
                isDark={isDark}
                aspectClass="aspect-[4/5]"
                className="rounded-t-[168px] rounded-b-2xl"
              />
            </div>

            {/* Floating Editorial Caption Badge */}
            <div
              className={`relative sm:absolute z-20 mt-4 sm:mt-0 sm:-bottom-5 sm:-left-6 px-5 py-3.5 rounded-2xl shadow-lg border max-w-[270px] animate-float-slow ${
                isDark
                  ? 'bg-[#202F46] border-[#C5A56A]/50 text-[#E1E5EB]'
                  : 'bg-[#F5E9BE] border-[#2C2520]/10 text-[#2C2520]'
              }`}
            >
              <p className="font-editorial italic text-sm font-semibold">
                {hero?.profileCaption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
